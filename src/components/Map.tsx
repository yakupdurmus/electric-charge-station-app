import React, {View, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT} from 'helper/helper';

import MapView, {
  PROVIDER_GOOGLE,
  PanDragEvent,
  Region,
} from 'react-native-maps';
import {useRef} from 'react';
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

const Map = ({children}: {children: JSX.Element}): JSX.Element => {
  const mapView = useRef<MapView>();

  const initialRegion = {
    latitude: 41.0858606,
    longitude: 29.0928714,
    latitudeDelta: 0.215,
    longitudeDelta: 0.2121,
  };

  // const getCurrentLocation = (
  //   callBack: ({
  //     latitude,
  //     longitude,
  //     error,
  //   }: {
  //     latitude: number;
  //     longitude: number;
  //     error: Error | null;
  //   }) => void,
  //   fail: () => void,
  // ) => {
  //   check(
  //     Platform.OS === 'ios'
  //       ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //       : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //   )
  //     .then(data => {
  //       if (data === 'granted') {
  //         Geolocation.getCurrentPosition(
  //           position => {
  //             callBack({
  //               latitude: position.coords.latitude,
  //               longitude: position.coords.longitude,
  //               error: null,
  //             });
  //           },
  //           () => {
  //             if (fail) fail();
  //           },
  //           {timeout: 10000},
  //         );
  //       } else if (fail) fail();
  //     })
  //     .catch(() => {
  //       if (fail) fail();
  //     });
  // };

  const onRegionChangeComplete = async (_region: Region) => {
    console.log('test', _region);

    // this.setState({
    //   locationData: {
    //     latitude: region.latitude,
    //     longitude: region.longitude,
    //   },
    // });
    // this.props.saveUserLocation(region);
  };

  const onPanDrag = (event: PanDragEvent) => {
    // console.log(
    //   event.nativeEvent.coordinate.latitude,
    //   event.nativeEvent.coordinate.longitude,
    // );

    // if (!this.state.mapIsDragged) {
    //   this.setState({mapIsDragged: true});
    // }
    // if (this.props.searchTerm !== '') {
    //   this.props.setSearchTerm('');
    // }
    // eslint-disable-next-line no-unused-expressions, no-underscore-dangle
    // this.googlePlacesAutocomplete?._handleChangeText('');
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref: MapView) => (mapView.current = ref)}
        initialRegion={initialRegion}
        showsIndoorLevelPicker={false}
        provider={PROVIDER_GOOGLE}
        showsBuildings={false}
        showsTraffic={false}
        onRegionChangeComplete={onRegionChangeComplete}
        onPanDrag={onPanDrag}
        style={styles.map}>
        {children}
      </MapView>
    </View>
  );
};

export default Map;
