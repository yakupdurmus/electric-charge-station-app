import {CONFIG} from 'config';
import {getItem} from './Storage';

import {Dimensions} from 'react-native';
import {Region} from 'react-native-maps';
import {IStation} from 'interface/ISettings';
import stations from 'assets/stations/stations';

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

export const getMarkerListOfLocation = (location: Region): IStation[] => {
  const maxDistanceKM = 4;

  return stations.allStations.filter(station => {
    const distance = getDistanceBetweenCoordinates(location, station);
    return distance < maxDistanceKM;
  });
};
