import React, {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, getMapStyle} from 'helper/helper';
import images from 'assets/images';
import MapView, {Marker, Region} from 'react-native-maps';
import {IStation} from 'interface/ISettings';

const Map = ({
  mapViewRef,
  currentLocation,
  onPressMarker,
  onRegionChange,
  markerList,
}: {
  mapViewRef: any;
  currentLocation: Region;
  onPressMarker: (station: IStation) => void;
  onRegionChange?: (region: Region) => void;
  markerList: IStation[];
}): JSX.Element => {
  return (
    <>
      <MapView
        ref={mapViewRef}
        initialRegion={currentLocation}
        showsIndoorLevelPicker={false}
        showsBuildings={false}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={getMapStyle()}
        showsTraffic={false}
        mapPadding={mapPadding}
        onRegionChangeComplete={onRegionChange}
        style={styles.map}>
        {markerList.map((item, index) => {
          return (
            <Marker
              key={item.name + index}
              onPress={() => onPressMarker(item)}
              coordinate={item}
              icon={images.markerSmall}
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
