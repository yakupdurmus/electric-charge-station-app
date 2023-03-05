import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';

import {getCurrentPosition, openMap} from 'helper/helper';

import {GeolocationResponse} from '@react-native-community/geolocation';
import Map from 'components/Map';
import {IStation, MapType} from 'interface/ISettings';
import StationInfoModal from 'components/StationInfoModal';
import {COLOR, INIT_LOCATION} from 'constant/constants';
import {useNavigation} from '@react-navigation/native';
import SearchHeader from 'components/SearchHeader';
import {Icon} from 'common/Icon';
const ANIMATION_DURATION = 500;

const StationsScreen = () => {
  const mapView = useRef<MapView>();
  const navigation = useNavigation<any>();

  const [currenctLocation, setCurrenctLocation] =
    useState<Region>(INIT_LOCATION);
  const [currenctRegion, setCurrenctRegion] = useState<Region>(INIT_LOCATION);

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
      ...currenctRegion,
      latitude: station.latitude,
      longitude: station.longitude,
    };
    mapView.current?.animateToRegion(location, ANIMATION_DURATION);
  };

  const modalOnClose = () => {
    setStationModalVisible(false);
  };
  const onPressNavigateToMyLocation = () => {
    mapView.current?.animateToRegion(currenctLocation, ANIMATION_DURATION);
  };
  const onPressNavigateLocation = () => {
    setStationModalVisible(false);
    mapView.current?.animateToRegion(currenctLocation, ANIMATION_DURATION);
  };
  const onPressOpenMap = (type: MapType, station?: IStation) => {
    openMap(station?.latitude, station?.longitude, type);
  };

  const onRegionChange = (region: Region) => {
    setCurrenctRegion(region);
  };

  const onPressSearchInput = () => {
    navigation.navigate('StationSearchScreen', {onPressMarker});
  };

  const clearSelectedStation = () => {
    setSelectedStation(undefined);
    setStationModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeareView}>
      <View style={styles.container}>
        <Map
          mapViewRef={mapView}
          currenctLocation={currenctLocation}
          onPressMarker={onPressMarker}
          onRegionChange={onRegionChange}
        />
        <SearchHeader
          onPressSearchInput={onPressSearchInput}
          value={selectedStation?.name}
          clearText={clearSelectedStation}
        />
        <StationInfoModal
          station={selectedStation}
          isVisible={stationModalVisible}
          onClose={modalOnClose}
          onPressNavigateLocation={onPressNavigateLocation}
          onPressOpenMap={onPressOpenMap}
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onPressNavigateToMyLocation}
            style={styles.gpsButton}>
            <Icon name="my-location" style={styles.gpsIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default StationsScreen;

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
    bottom: 48,
  },
  actionButtons: {},
  navigateButtonStyle: {marginBottom: 8},
  gpsButton: {
    backgroundColor: COLOR.white,
    alignSelf: 'flex-end',
    padding: 16,
    borderRadius: 30,
  },
  gpsIcon: {
    fontSize: 24,
  },
});
