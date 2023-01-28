import React, {useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

import {SCREEN_HEIGHT, getMarkerListOfLocation} from 'helper/helper';
import {IStation} from 'interface/ISettings';
import stations from 'assets/stations/stations';
import {marker} from 'assets/images';

const StationMap = () => {
  const mapView = useRef<MapView>();
  const [markerList, setMarkerList] = useState<IStation[]>(stations.esarj);
  const [_location, setLocation] = useState<Region>();

  const initialRegion = {
    latitude: 40.9858606,
    longitude: 29.1328714,
    latitudeDelta: 0.035,
    longitudeDelta: 0.032,
  };

  const onRegionChangeComplete = (region: Region) => {
    setLocation(region);
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
          showsMyLocationButton
          showsUserLocation
          showsTraffic={false}
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.map}>
          {markerList.map((item, index) => {
            return (
              <Marker
                key={item.name + index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.name}>
                <Image
                  source={marker}
                  style={styles.markerImage}
                  resizeMode="contain"
                />
              </Marker>
            );
          })}
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
  markerImage: {
    width: 30,
    height: 41,
  },
});
