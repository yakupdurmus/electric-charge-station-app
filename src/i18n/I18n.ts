import {getCountry} from 'react-native-localize';
import en from 'i18n/locales/en';
import ar from 'i18n/locales/ar';
import tr from 'i18n/locales/tr';
import {CONFIG} from 'config';

const translate: any = {
  en,
  ar,
  tr,
};

export default translate[getCountry()] || translate[CONFIG.defaultLanguage];
