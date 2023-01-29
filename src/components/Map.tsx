import React, {StyleSheet, Image} from 'react-native';
import {getStationsByLocation} from 'helper/helper';
import {marker} from 'assets/images';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useState} from 'react';
import {IStation} from 'interface/ISettings';

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
  const [_location, setLocation] = useState<Region>();

  const onRegionChangeComplete = (region: Region) => {
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
            <Image
              source={marker}
              style={styles.markerImage}
              resizeMode="contain"
            />
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
