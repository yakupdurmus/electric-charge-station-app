import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ImageSwiper from 'components/ImageSwiper';
import {COLOR} from 'constant/constants';
import {WebView} from 'react-native-webview';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageSwiper />
      <WebView
        source={{
          uri: 'https://yakupdurmus.com/project/electric-station/',
        }}
        containerStyle={styles.webViewContent}
        style={styles.webViewContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  webViewContent: {
    backgroundColor: COLOR.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
