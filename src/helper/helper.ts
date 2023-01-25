import {CONFIG} from 'config';
import {getItem} from './Storage';

import {Dimensions} from 'react-native';

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
