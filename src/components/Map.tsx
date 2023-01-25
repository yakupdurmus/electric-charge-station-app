import React, {View, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT} from 'helper/helper';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = ({children}: {children: JSX.Element}): JSX.Element => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 41.658825,
        longitude: 27.4324,
        latitudeDelta: 0.215,
        longitudeDelta: 0.2121,
      }}>
      {children}
    </MapView>
  </View>
);

export default Map;
