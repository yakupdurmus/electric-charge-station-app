import React from 'react';
import {StyleSheet, View} from 'react-native';

import Swiper from 'react-native-swiper';
import images from 'assets/images';
import Image from 'common/Image';
import {Label} from 'common/Label';
import {COLOR} from 'constant/constants';

export default function ImageSwiper() {
  return (
    <View style={styles.container}>
      <Swiper
        paginationStyle={styles.pagination}
        style={styles.wrapper}
        autoplay
        autoplayTimeout={5}>
        {bannerData.map((item, index) => (
          <View style={styles.itemStyle} key={index}>
            <Image
              resizeMode="contain"
              style={styles.imageStyle}
              source={item.image}
            />
            <View style={styles.textContainer}>
              <Label style={styles.textStyle}>{item.text}</Label>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const bannerData = [
  {
    image: images.banner1,
    text: 'Türkiyede 3 bin 728 adet şarj noktası bulunuyor.',
  },
  {
    image: images.banner2,
    text: 'Türkiye’deki şarj hizmeti verilen elektrikli araç şarj noktalarının 646’sını hızlı (DC) şarjdır.',
  },
  {
    image: images.banner3,
    text: 'Türkiye’deki şarj hizmeti verilen elektrikli araç şarj noktalarının 3 bin 82’sini ise yavaş (AC) şarjdır.',
  },
];

const styles = StyleSheet.create({
  container: {
    height: 220,
    paddingBottom: 28,
  },
  pagination: {
    bottom: -22,
  },
  textContainer: {
    backgroundColor: COLOR.background,
    opacity: 0.8,
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    padding: 20,
    top: '40%',
    borderRadius: 8,
  },
  textStyle: {},
  itemStyle: {},
  wrapper: {},
  imageStyle: {},
});
