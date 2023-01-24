import I18n from 'react-native-i18n';
import en from 'i18n/locales/en';
import ar from 'i18n/locales/ar';
import tr from 'i18n/locales/tr';
import {CONFIG} from 'config';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ar,
  tr,
};

I18n.defaultLocale = CONFIG.defaultLanguage;

export default I18n;
