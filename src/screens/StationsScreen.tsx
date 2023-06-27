import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';

import {getCurrentPosition, openMap} from 'helper/helper';

import {GeolocationResponse} from '@react-native-community/geolocation';
import Map from 'components/Map';
import {IStation, MapType} from 'interface/ISettings';
import StationInfoModal from 'components/StationInfoModal';
import {COLOR, ZOOM_LEVEL_16} from 'constant/constants';
import {useNavigation} from '@react-navigation/native';
import SearchHeader from 'components/SearchHeader';
import {Icon} from 'common/Icon';
import {IRootState} from 'interface/IBase';
import {useDispatch, useSelector} from 'react-redux';
import {
  getStationsByLocation,
  setCurrentRegion,
  setCurrentLocation,
} from 'actions/settingsAction';
const ANIMATION_DURATION = 500;

const StationsScreen = () => {
  const mapView = useRef<MapView>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [markerList, setMarkerList] = useState<IStation[]>([]);

  const currentRegion = useSelector(
    (state: IRootState) => state.app.currentRegion,
  );

  const currentLocation = useSelector(
    (state: IRootState) => state.app.currentLocation,
  );

  const [searchInAreaButtonVisible, setSearchInAreaButtonVisible] =
    useState(false);

  const [stationModalVisible, setStationModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<IStation>();

  useEffect(() => {
    getCurrentPosition(async (position: GeolocationResponse) => {
      const newLocation = {
        ...currentLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      dispatch(setCurrentLocation(newLocation));
      mapView.current?.animateToRegion(newLocation);
      const markers = await dispatch(
        getStationsByLocation(currentRegion, newLocation),
      );
      setMarkerList(markers);
      setSearchInAreaButtonVisible(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshMarkerListAndNavigate = async (station: IStation) => {
    const stationRegion: Region = {
      ...ZOOM_LEVEL_16,
      latitude: station.latitude,
      longitude: station.longitude,
    };

    const stations: IStation[] = await dispatch(
      getStationsByLocation(stationRegion, currentLocation),
    );
    setMarkerList(stations);
    onPressMarker(station);
  };

  const onPressMarker = (station: IStation) => {
    setSelectedStation(station);
    setStationModalVisible(true);
    const location = {
      ...ZOOM_LEVEL_16,
      latitude: station.latitude,
      longitude: station.longitude,
    };
    mapView.current?.animateToRegion(location, ANIMATION_DURATION);
  };

  const modalOnClose = () => {
    setStationModalVisible(false);
  };
  const onPressNavigateToMyLocation = () => {
    mapView.current?.animateToRegion(currentLocation, ANIMATION_DURATION);
  };
  const onPressNavigateLocation = () => {
    setStationModalVisible(false);
    mapView.current?.animateToRegion(currentLocation, ANIMATION_DURATION);
  };
  const onPressOpenMap = (type: MapType, station?: IStation) => {
    openMap(station?.latitude, station?.longitude, type);
  };

  const onRegionChange = (region: Region) => {
    dispatch(setCurrentRegion(region));
    setSearchInAreaButtonVisible(true);
  };

  const onPressSearchInAreaButtonVisible = async () => {
    setSearchInAreaButtonVisible(false);
    const markers = await dispatch(
      getStationsByLocation(currentRegion, currentLocation),
    );
    setMarkerList(markers);
  };

  const onPressSearchInput = () => {
    navigation.navigate('StationSearchScreen', {refreshMarkerListAndNavigate});
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
          currentLocation={currentLocation}
          onPressMarker={onPressMarker}
          onRegionChange={onRegionChange}
          markerList={markerList}
        />
        <SearchHeader
          onPressSearchInput={onPressSearchInput}
          value={selectedStation?.name}
          clearText={clearSelectedStation}
          searchInAreaButtonVisible={searchInAreaButtonVisible}
          onPressSearchInAreaButtonVisible={onPressSearchInAreaButtonVisible}
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
    position: 'absolute',
    bottom: 24,
    right: 24,
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
