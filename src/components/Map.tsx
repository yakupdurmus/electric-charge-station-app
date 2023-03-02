import React, {StyleSheet, Image, View} from 'react-native';
import {
  getDistanceBetweenCoordinates,
  getStationsByLocation,
} from 'helper/helper';
import images from 'assets/images';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useState} from 'react';
import {IStation} from 'interface/ISettings';
import {TWO_POINT_DISTANCE_KM} from 'constant/constants';

const Map = ({
  mapViewRef,
  currenctLocation,
  onPressMarker,
}: {
  mapViewRef: any;
  currenctLocation: Region;
  onPressMarker: (station: IStation) => void;
}): JSX.Element => {
  const [markerList, setMarkerList] = useState<IStation[]>([]);
  const [location, setLocation] = useState<Region>();

  const onRegionChangeComplete = (region: Region) => {
    if (location) {
      const distanceToPoint = getDistanceBetweenCoordinates(location, region);
      if (distanceToPoint < TWO_POINT_DISTANCE_KM) {
        return;
      }
    }
    setLocation(region);
    const markers = getStationsByLocation(region);
    setMarkerList(markers);
  };

  console.log('Render map');

  return (
    <MapView
      ref={(ref: MapView) => (mapViewRef.current = ref)}
      initialRegion={currenctLocation}
      showsIndoorLevelPicker={false}
      provider={PROVIDER_GOOGLE}
      showsBuildings={false}
      showsUserLocation
      showsTraffic={false}
      onRegionChangeComplete={onRegionChangeComplete}
      style={styles.map}>
      {markerList.map((item, index) => {
        return (
          <Marker
            key={item.name + index}
            onPress={() => onPressMarker(item)}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}>
            <View>
              <Image
                source={images.marker}
                style={styles.markerImage}
                resizeMode="contain"
              />
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 38,
    height: 50,
  },
});
