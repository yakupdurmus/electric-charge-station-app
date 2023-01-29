import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';

import {getCurrentPosition} from 'helper/helper';

import {GeolocationResponse} from '@react-native-community/geolocation';
import Map from 'components/Map';
import {IStation} from 'interface/ISettings';
import StationInfoModal from 'components/StationInfoModal';
import {Button} from 'common/Button';
import {INIT_LOCATION} from 'constant/constants';

const StationMap = () => {
  const mapView = useRef<MapView>();

  const [currenctLocation, setCurrenctLocation] =
    useState<Region>(INIT_LOCATION);

  const [stationModalVisible, setStationModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<IStation>();

  useEffect(() => {
    getCurrentPosition((position: GeolocationResponse) => {
      setCurrenctLocation({
        ...currenctLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressMarker = (station: IStation) => {
    setSelectedStation(station);
    setStationModalVisible(true);
  };

  const modalOnClose = () => {
    setStationModalVisible(false);
  };
  const navigationButton = () => {
    mapView.current?.animateToRegion(currenctLocation);
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
