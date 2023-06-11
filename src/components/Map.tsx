import React, {StyleSheet} from 'react-native';
import {
  SCREEN_HEIGHT,
  getDiameter,
  getMapStyle,
  getStationsByLocation,
} from 'helper/helper';
import images from 'assets/images';
import MapView, {Marker, Region} from 'react-native-maps';
import {useCallback, useEffect, useState} from 'react';
import {IStation} from 'interface/ISettings';
import {TWO_POINT_MAX_KM_DISTANCE} from 'constant/constants';

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
        setMarkerList([]);
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
        newRegion.longitudeDelta > region.longitudeDelta ||
        markerList.length === 0
      ) {
        setRegion(newRegion);
        const markers = getStationsByLocation(newRegion);
        setMarkerList(markers);
      }
    },
    [onRegionChange, region, markerList],
  );

  useEffect(() => {
    onRegionChangeComplete(currenctLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MapView
        ref={mapViewRef}
        initialRegion={currenctLocation}
        showsIndoorLevelPicker={false}
        showsBuildings={false}
        showsUserLocation
        showsMyLocationButton={false}
        userInterfaceStyle="dark"
        customMapStyle={getMapStyle()}
        showsTraffic={false}
        mapPadding={mapPadding}
        onRegionChangeComplete={onRegionChangeComplete}
        style={styles.map}>
        {markerList.map((item, index) => {
          return (
            <Marker
              key={item.name + index}
              onPress={() => onPressMarker(item)}
              coordinate={item}
              icon={images.markerXSmall}
              tracksViewChanges={false}
            />
          );
        })}
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapPadding = {
  bottom: SCREEN_HEIGHT * 0.2,
  top: 0,
  right: 0,
  left: 0,
};
