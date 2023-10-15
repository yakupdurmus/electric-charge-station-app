import {CONFIG} from 'config';
import {getItem} from './Storage';
import customMapStyle from 'assets/mapStyle.json';
import CryptoMD5 from 'crypto-js/md5';
import {Alert, Dimensions, Platform, Linking} from 'react-native';
import {MapType} from 'interface/ISettings';

import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import GeoLocationCommunity, {
  GeolocationConfiguration,
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {MONTH_FORMAT, IS_DARK_SCHEME, USER_KEY} from 'constant/constants';
import moment from 'moment';

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

export const checkLocationPermission = (
  callback: (permissionResult: boolean) => void,
) => {
  const permissionRequest =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

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
  checkLocationPermission(value => {
    if (value === false) {
      console.log('Konum bilgisi alınamadı');
      GeoLocationCommunity.requestAuthorization(() =>
        getCurrentPosition(success),
      );
    }
  });

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
    undefined,
  );
};

export const openMap = async (
  latitude?: number,
  longitude?: number,
  openWith?: MapType,
): Promise<boolean> => {
  const googleMaps = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&mode=d`;
  const appleMaps = `maps://app?daddr=${latitude},${longitude}&dirflg=d&t=m`;

  const url: any = Platform.select({
    ios: openWith === 'googleMaps' ? googleMaps : appleMaps,
    android: googleMaps,
  });

  if (!url) {
    return false;
  }

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url).then(() => {
        return true;
      });
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeTagsFromString = (htmlString: string) => {
  if (!htmlString) return '';
  const regex = /(<([^>]+)>)/gi;

  return htmlString.replace(regex, '');
};

export const getMapStyle = () => (IS_DARK_SCHEME ? customMapStyle : []);

export const getHeaderHash = () => {
  const day = moment().format(MONTH_FORMAT);
  const cryptoHash = CryptoMD5(day + USER_KEY);
  return cryptoHash.toString();
};
