import {CONFIG} from 'config';
import {getItem} from './Storage';

import {Alert, Dimensions, Platform} from 'react-native';
import {Region} from 'react-native-maps';
import {IStation} from 'interface/ISettings';
import stations from 'assets/stations/stations';

import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import GeoLocationCommunity, {
  GeolocationConfiguration,
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';

export const getLanguage = async () => {
  const language = await getItem('language');
  if (language) {
    return language;
  }
  return CONFIG.defaultLanguage;
};

const screenSize = Dimensions.get('screen');
export const SCREEN_WIDTH = screenSize.width;
export const SCREEN_HEIGHT = screenSize.height;

function getDistanceBetweenCoordinates(coord1: Region, coord2: IStation) {
  const earthRadius = 6371;
  const lat1 = coord1.latitude * (Math.PI / 180);
  const lat2 = coord2.latitude * (Math.PI / 180);
  const lon1 = coord1.longitude * (Math.PI / 180);
  const lon2 = coord2.longitude * (Math.PI / 180);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

export const getStationsByLocation = (location: Region): IStation[] => {
  const maxDistanceKM = 2;

  return stations.allStations.filter(station => {
    const distance = getDistanceBetweenCoordinates(location, station);
    return distance < maxDistanceKM;
  });
};

export const checkLocationPermission = (
  callback: (permissionResult: boolean) => void,
) => {
  const permissionRequest =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_ALWAYS;

  check(permissionRequest)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          callback(false);
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          callback(false);
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          callback(false);
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          callback(true);
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          callback(false);
          break;
      }
    })
    .catch(error => {
      console.log(error);
      callback(false);
    });
};

export const getCurrentPosition = (
  success: (position: GeolocationResponse) => void,
) => {
  const config: GeolocationConfiguration = {
    skipPermissionRequests: true,
    authorizationLevel: 'whenInUse',
    locationProvider: 'playServices',
  };
  GeoLocationCommunity.setRNConfiguration(config);
  GeoLocationCommunity.getCurrentPosition(
    position => {
      success(position);
    },
    (error: GeolocationError) => {
      if (error.PERMISSION_DENIED) {
        GeoLocationCommunity.requestAuthorization(() => {
          getCurrentPosition(success);
        });
      } else {
        Alert.alert('Konum bilgisi alınamadı tekarar deneyiniz.');
      }
    },
  );
};
