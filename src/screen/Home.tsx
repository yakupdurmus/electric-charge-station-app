import {Button} from 'common/Button';
import {IRootState} from 'interface/IBase';
import React from 'react';
import {View, StyleSheet, I18nManager} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RNRestart from 'react-native-restart'; // Import package from node modules

import I18n from 'i18n/I18n';
import {LANGUAGE} from 'interface/ISettings';
import {setLanguage} from 'actions';
import {setItem} from 'helper/Storage';
import {Label} from 'common/Label';
const HomeScreen = () => {
  const dispatch = useDispatch();
  let collection = useSelector((state: IRootState) => state.collection);
  console.log('collection.language', collection.language, I18nManager.isRTL);

  const selectLang = (language: LANGUAGE) => {
    if (language === LANGUAGE.AR) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    dispatch(setLanguage(language));
    I18n.locale = language;

    setItem('language', language).then(() => {
      RNRestart.Restart();
    });
  };

  return (
    <View style={style.container}>
      <View>
        <View style={{backgroundColor: 'red'}}>
          <Label>{I18n.t('hello')}</Label>
          <View
            style={{width: 100, height: 100, backgroundColor: 'blue'}}></View>
        </View>
        <Button
          onPress={() => {
            selectLang(LANGUAGE.TR);
          }}>
          Türkçe
        </Button>
        <Button
          onPress={() => {
            selectLang(LANGUAGE.AR);
          }}>
          Arapça
        </Button>
        <Button
          onPress={() => {
            selectLang(LANGUAGE.EN);
          }}>
          İngilizce
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {flex: 1},
});

export default HomeScreen;
