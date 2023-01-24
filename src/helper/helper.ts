import {CONFIG} from 'config';
import {getItem} from './Storage';

export const getLanguage = async () => {
  const language = await getItem('language');
  if (language) {
    return language;
  }
  return CONFIG.defaultLanguage;
};
