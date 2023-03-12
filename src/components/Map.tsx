import React, {StyleSheet, Image, View} from 'react-native';
import {SCREEN_HEIGHT, getDiameter, getStationsByLocation} from 'helper/helper';
import images from 'assets/images';
import {Marker, Region} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {useCallback, useEffect, useState} from 'react';
import {IStation} from 'interface/ISettings';
import {COLOR, TWO_POINT_MAX_KM_DISTANCE} from 'constant/constants';

const Map = ({
  mapViewRef,
  currenctLocation,
  onPressMarker,
  onRegionChange,
}: {
  mapViewRef: any;
  currenctLocation: Region;
  onPressMarker: (station: IStation) => void;
  onRegionChange?: (region: Region) => void;
}): JSX.Element => {
  const [markerList, setMarkerList] = useState<IStation[]>([]);
  const [region, setRegion] = useState<Region>();

  const onRegionChangeComplete = useCallback(
    (newRegion: Region) => {
      if (onRegionChange) {
        onRegionChange(newRegion);
      }

      const diameter = getDiameter(newRegion);
      if (diameter > TWO_POINT_MAX_KM_DISTANCE) {
        return;
      }

      if (!region) {
        setRegion(newRegion);
        const markers = getStationsByLocation(newRegion);
        setMarkerList(markers);
        return;
      }

      if (
        newRegion.latitude > region.latitude + region.latitudeDelta ||
        newRegion.latitude < region.latitude - region.latitudeDelta ||
        newRegion.longitude > region.longitude + region.longitudeDelta ||
        newRegion.longitude < region.longitude - region.longitudeDelta ||
        newRegion.latitudeDelta > region.latitudeDelta ||
        newRegion.longitudeDelta > region.longitudeDelta
      ) {
        setRegion(newRegion);
        const markers = getStationsByLocation(newRegion);
        setMarkerList(markers);
      }
    },
    [onRegionChange, region],
  );

  useEffect(() => {
    onRegionChangeComplete(currenctLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapView
      ref={mapViewRef}
      initialRegion={currenctLocation}
      showsIndoorLevelPicker={false}
      showsBuildings={false}
      showsUserLocation
      showsMyLocationButton={false}
      showsTraffic={false}
      mapPadding={mapPadding}
      clusterColor={COLOR.secondary.main}
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

const mapPadding = {
  bottom: SCREEN_HEIGHT * 0.2,
  top: 0,
  right: 0,
  left: 0,
};
