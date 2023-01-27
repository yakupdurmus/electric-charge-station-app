import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {MapMarkerProps, Marker, MarkerPressEvent} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

import {SCREEN_HEIGHT, getMarkerListOfLocation} from 'helper/helper';
import {IStation} from 'interface/ISettings';

const StationMap = () => {
  const mapView = useRef<MapView>();
  const [markerList, setMarkerList] = useState<IStation[]>([]);

  const initialRegion = {
    latitude: 41.0858606,
    longitude: 29.0928714,
    latitudeDelta: 0.215,
    longitudeDelta: 0.2121,
  };

  const onRegionChangeComplete = async (region: Region) => {
    console.log(1);
    const markers = getMarkerListOfLocation(region);
    setMarkerList(markers);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          ref={(ref: MapView) => (mapView.current = ref)}
          initialRegion={initialRegion}
          showsIndoorLevelPicker={false}
          provider={PROVIDER_GOOGLE}
          showsBuildings={false}
          showsTraffic={false}
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.map}>
          {markerList.map((item, index) => (
            <Marker
              onPress={(event: MarkerPressEvent) => {
                console.log('test', item.name);
              }}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};
export default StationMap;

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
