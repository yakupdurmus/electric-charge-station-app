import {View, Image, StyleSheet} from 'react-native';
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
      } else {
        console.log('Permission Allowed');
        setItem('locationPermission', 'true');
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'StationMap'}],
      });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={images.locationPhone} style={styles.imageStyle} />
        <Label style={styles.textStyle}>
          Size daha iyi hizmet verebilmemiz için lokasyon izni gerekli.
        </Label>
        <Button
          onPress={onPress}
          style={styles.button}
          buttonType="green"
          label="Lokasyon'a İzin Ver"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 12,
  },
  container: {
    flex: 1,
  },
  textStyle: {
    marginVertical: 48,
    textAlign: 'center',
    flex: 1,
  },
  imageStyle: {
    width: '100%',
  },
  button: {
    marginBottom: 24,
  },
});
