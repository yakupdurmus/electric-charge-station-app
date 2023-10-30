import React, {StyleSheet, Image, View} from 'react-native';
import {SCREEN_HEIGHT, getMapStyle} from 'helper/helper';
import images from 'assets/images';
import MapView, {Marker, Region} from 'react-native-maps';
import {IStation} from 'interface/ISettings';
import {stationIcons} from 'constant/constants';

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
  markerList?: IStation[];
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
        {markerList &&
          markerList.map((item, index) => {
            return (
              <Marker
                key={item.name + index}
                onPress={() => onPressMarker(item)}
                coordinate={item}
                tracksViewChanges={false}>
                <View removeClippedSubviews>
                  <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={images.markerSmall}
                  />
                  <Image
                    style={styles.stationIcon}
                    resizeMode="contain"
                    source={stationIcons[item.stationType]}
                  />
                </View>
              </Marker>
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
  image: {
    width: 32,
    height: 46,
  },
  stationIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 5,
    borderRadius: 20,
    alignSelf: 'center',
    zIndex: 2,
    backgroundColor: 'white',
  },
});

const mapPadding = {
  bottom: SCREEN_HEIGHT * 0.2,
  top: 0,
  right: 0,
  left: 0,
};
