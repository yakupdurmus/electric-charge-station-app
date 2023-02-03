import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';

import {getCurrentPosition, openMap} from 'helper/helper';

import {GeolocationResponse} from '@react-native-community/geolocation';
import Map from 'components/Map';
import {IStation, MapType} from 'interface/ISettings';
import StationInfoModal from 'components/StationInfoModal';
import {Button} from 'common/Button';
import {INIT_LOCATION} from 'constant/constants';
const ANIMATION_DURATION = 200;

const StationMap = () => {
  const mapView = useRef<MapView>();

  const [currenctLocation, setCurrenctLocation] =
    useState<Region>(INIT_LOCATION);

  const [stationModalVisible, setStationModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<IStation>();

  useEffect(() => {
    getCurrentPosition((position: GeolocationResponse) => {
      const newLocation = {
        ...currenctLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCurrenctLocation(newLocation);
      mapView.current?.animateToRegion(newLocation);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressMarker = (station: IStation) => {
    setSelectedStation(station);
    setStationModalVisible(true);
    const location = {
      ...currenctLocation,
      latitude: station.latitude,
      longitude: station.longitude,
    };
    mapView.current?.animateToRegion(location, ANIMATION_DURATION);
  };

  const modalOnClose = () => {
    setStationModalVisible(false);
  };
  const navigationButton = () => {
    mapView.current?.animateToRegion(currenctLocation, ANIMATION_DURATION);
  };
  const onPressNavigateLocation = () => {
    setStationModalVisible(false);
    mapView.current?.animateToRegion(currenctLocation, ANIMATION_DURATION);
  };
  const onPressOpenMap = (type: MapType, station?: IStation) => {
    openMap(station?.latitude, station?.longitude, type);
  };

  return (
    <SafeAreaView style={styles.safeareView}>
      <View style={styles.container}>
        <Map
          mapViewRef={mapView}
          currenctLocation={currenctLocation}
          onPressMarker={onPressMarker}
        />
        <StationInfoModal
          station={selectedStation}
          isVisible={stationModalVisible}
          onClose={modalOnClose}
          onPressNavigateLocation={onPressNavigateLocation}
          onPressOpenMap={onPressOpenMap}
        />
        <View style={styles.bottomContainer}>
          <Button
            buttonType="green"
            onPress={navigationButton}
            label={'Bulunduğum Konumu Göster'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default StationMap;

const styles = StyleSheet.create({
  safeareView: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '80%',
    position: 'absolute',
    bottom: 30,
  },
  actionButtons: {},
});
