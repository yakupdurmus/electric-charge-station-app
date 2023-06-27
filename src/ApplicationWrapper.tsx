import React, {useCallback, useEffect, useState} from 'react';
import * as Sentry from '@sentry/react-native';
import {SENTRY_KEY} from '../config';
import Router from 'router/router';
import I18n from 'i18n/I18n';
import {getLanguage} from 'helper/helper';
import {Provider} from 'react-redux';
import {setLanguage, setOnBoarding} from 'actions/settingsAction';
import {LANGUAGE} from 'interface/ISettings';
import {store} from 'reducers/store';
import {getItem} from 'helper/Storage';
import {View} from 'react-native';

Sentry.init({
  dsn: SENTRY_KEY,
});

const App = () => {
  const {loading, getApplicationSettings} = useWrapperHook();

  useEffect(() => {
    getApplicationSettings();
  }, [getApplicationSettings]);

  if (loading) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default Sentry.wrap(App);

// Wrapper Hook
const useWrapperHook = () => {
  const [loading, setLoading] = useState(true);

  const selectLanguage = useCallback(async () => {
    const language = await getLanguage();
    I18n.locale = language;
    store.dispatch(setLanguage(language as LANGUAGE));
  }, []);

  const onBoarding = async () => {
    const isComplateOnBoarding = await getItem('onBoarding');
    store.dispatch(setOnBoarding(isComplateOnBoarding === 'true'));
  };

  const getApplicationSettings = useCallback(async () => {
    setLoading(true);
    await selectLanguage();
    await onBoarding();
    setLoading(false);
  }, [selectLanguage]);

  return {
    loading,
    getApplicationSettings,
  };
};
