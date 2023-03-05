import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Label} from 'common/Label';

import Swiper from 'react-native-swiper';

export default function ImageSwiper() {
  return (
    <View>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Label style={styles.text}>Hello Swiper</Label>
        </View>
        <View style={styles.slide2}>
          <Label style={styles.text}>Beautiful</Label>
        </View>
        <View style={styles.slide3}>
          <Label style={styles.text}>And simple</Label>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
