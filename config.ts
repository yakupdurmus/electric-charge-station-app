import {LANGUAGE} from 'interface/ISettings';
import {I18nManager} from 'react-native';

const SENTRY_KEY =
  'https://b299ec7a094146b0b21e7521d30d660f@o879340.ingest.sentry.io/6218010';

const CONFIG = {
  defaultLanguage: I18nManager.isRTL ? LANGUAGE.AR : LANGUAGE.TR,
};
export {SENTRY_KEY, CONFIG};
