import React, {useCallback, useEffect} from 'react';
import * as Sentry from '@sentry/react-native';
import {SENTRY_KEY} from '../config';
import Router from 'router/Container';
import I18n from 'i18n/I18n';
import {getLanguage} from 'helper/helper';
import {Provider} from 'react-redux';
import {setLanguage} from 'actions';
import {LANGUAGE} from 'interface/ISettings';
import {store} from 'reducers/store';

Sentry.init({
  dsn: SENTRY_KEY,
});

const App = () => {
  const selectLanguage = useCallback(async () => {
    const language = await getLanguage();
    I18n.locale = language;
    store.dispatch(setLanguage(language as LANGUAGE));
  }, []);

  useEffect(() => {
    selectLanguage();
  }, [selectLanguage]);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default Sentry.wrap(App);
