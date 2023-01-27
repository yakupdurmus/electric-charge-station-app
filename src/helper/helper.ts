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

export const getMarkerListOfLocation = (region: Region): IStation[] => {
  return stations.allStations;
};
