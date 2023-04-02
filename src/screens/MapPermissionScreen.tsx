import {View, StyleSheet} from 'react-native';
import React from 'react';
import images from 'assets/images';
import {COLOR} from 'constant/constants';
import {Button} from 'common/Button';
import {Label} from 'common/Label';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {PERMISSIONS, Permission, request} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import {setItem} from 'helper/Storage';
import Image from 'common/Image';

export default function MapPermissionScreen() {
  const navigation = useNavigation<any>();

  const onPress = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }) as Permission,
    ).then(result => {
      if (result === 'denied' || result === 'blocked') {
        console.log('Permission Denied');
        setItem('locationPermission', 'false');
        setItem('onBoarding', 'true');
      } else {
        console.log('Permission Allowed');
        setItem('locationPermission', 'true');
        setItem('onBoarding', 'true');
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'TabScreen'}],
      });
    });
  };

  const onPressSkip = () => {
    setItem('onBoarding', 'true');
    navigation.reset({
      index: 0,
      routes: [{name: 'TabScreen'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={images.locationPermission}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <Label style={styles.title}>Konum İzni</Label>
        <Label style={styles.textStyle}>
          {`Size daha iyi hizmet verebilmemiz için \nkonum izni gerekli.`}
        </Label>
        <View style={styles.space} />
        <Button
          onPress={onPress}
          style={styles.button}
          buttonType="blue"
          label="Konuma İzin Ver"
        />
        <Button onPress={onPressSkip} style={styles.button} label="Devam Et" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOR.text,
    marginBottom: 8,
  },
  space: {
    flex: 1,
  },
  textStyle: {
    fontSize: 14,
    color: COLOR.textMuted,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  imageStyle: {
    marginTop: 120,
    width: '100%',
  },
  button: {
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
