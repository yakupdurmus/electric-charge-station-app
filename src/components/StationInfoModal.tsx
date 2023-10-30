import React from 'react';
import BottomModal from './BottomModal';
import {IStation, MapType} from 'interface/ISettings';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Label} from 'common/Label';
import RenderHtml from 'react-native-render-html';
import {SCREEN_WIDTH} from 'helper/helper';
import Image from 'common/Image';
import {COLOR, STORAGE_KEY, stationIcons} from 'constant/constants';
import images from 'assets/images';
import {Icon} from 'common/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from 'interface/IBase';
import {setFavoriteStation} from 'actions/settingsAction';
import {setItem} from 'helper/Storage';

const StationInfoModal = ({
  isVisible,
  onClose,
  station,
  onPressOpenMap,
  onPressNavigateLocation,
}: {
  isVisible: boolean;
  station?: IStation;
  onClose?: () => void;
  onPressOpenMap: (type: MapType, station?: IStation) => void;
  onPressNavigateLocation: () => void;
}) => {
  const favoriteStation = useSelector(
    (state: IRootState) => state.app.favoriteStation,
  );
  const dispatch = useDispatch();

  const onPressFavorite = (favStation: IStation) => {
    const favIndex = favoriteStation.findIndex(
      item => item.name === favStation.name,
    );
    const newFavStations = [...favoriteStation];

    if (favIndex > -1) {
      newFavStations.splice(favIndex, 1);
      dispatch(setFavoriteStation(newFavStations));
    } else {
      newFavStations.push(favStation);
      dispatch(setFavoriteStation(newFavStations));
    }

    setItem(STORAGE_KEY.favorite, JSON.stringify(newFavStations));
  };

  const renderTitle = () => {
    const isFav =
      favoriteStation.findIndex(item => item.name === station?.name) > -1;

    return (
      <View style={styles.modalTitleContainer}>
        <TouchableOpacity
          style={styles.buttonStlye}
          onPress={() => station && onPressFavorite(station)}>
          <Icon
            name={isFav ? 'heart' : 'heart-o'}
            type="FontAwesome"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <Label numberOfLines={1} style={styles.titleLabel}>
          {station?.name || 'Elektrikli Şarj İstasyonu'}
        </Label>
        <Label style={styles.distanceLabel}> ~{station?.distance}km</Label>
      </View>
    );
  };

  return (
    <BottomModal
      isVisible={isVisible}
      onClose={onClose}
      renderTitle={renderTitle()}>
      <View>
        <View style={styles.content}>
          <View style={styles.row}>
            {station ? (
              <Image
                source={stationIcons[station.stationType]}
                style={styles.stationIconStyle}
                resizeMode="contain"
              />
            ) : null}
          </View>

          {station?.stationAddress ? (
            <View style={styles.htmlContainer}>
              <RenderHtml
                contentWidth={SCREEN_WIDTH}
                source={{html: station.stationAddress}}
              />
            </View>
          ) : null}

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonStlye}
              onPress={() => onPressOpenMap('googleMaps', station)}>
              <Image width={40} height={40} source={images.googleLocation} />
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                style={styles.buttonStlye}
                onPress={() => onPressOpenMap('appleMaps', station)}>
                <Image width={40} height={40} source={images.appleLocation} />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStlye}
              onPress={onPressNavigateLocation}>
              <Image width={40} height={40} source={images.myLocation} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomModal>
  );
};

export default StationInfoModal;

const styles = StyleSheet.create({
  content: {
    marginTop: 8,
    marginBottom: 16,
  },
  htmlContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  buttonStlye: {
    marginRight: 8,
  },
  labelStyle: {
    marginBottom: 8,
  },
  stationIconStyle: {
    width: 50,
    height: 50,
  },
  titleLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  iconStyle: {fontSize: 20, color: COLOR.error.main},
  distanceLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
