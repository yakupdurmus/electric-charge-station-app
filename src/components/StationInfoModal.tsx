import React from 'react';
import BottomModal from './BottomModal';
import {IStation, MapType} from 'interface/ISettings';
import {Platform, StyleSheet, View} from 'react-native';
import {Button} from 'common/Button';
import {Label} from 'common/Label';
import RenderHtml from 'react-native-render-html';
import {SCREEN_WIDTH} from 'helper/helper';

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
  return (
    <BottomModal
      isVisible={isVisible}
      onClose={onClose}
      title={station?.name || 'Elektrikli Şarj İstasyonu'}>
      <View>
        <View style={styles.content}>
          <Label style={styles.labelStyle}>
            {station?.stationType.toUpperCase()}
          </Label>
          {station?.stationAddress ? (
            <View style={styles.htmlContainer}>
              <RenderHtml
                contentWidth={SCREEN_WIDTH}
                source={{html: station.stationAddress}}
              />
            </View>
          ) : null}
          <Button
            buttonType="light"
            onPress={() => onPressOpenMap('googleMaps', station)}
            label={'Googe Maps ile Yol Tarifi Al'}
            style={styles.buttonStlye}
          />
          {Platform.OS === 'ios' ? (
            <Button
              buttonType="light"
              onPress={() => onPressOpenMap('appleMaps', station)}
              label={'Apple Maps ile Yol Tarifi Al'}
              style={styles.buttonStlye}
            />
          ) : null}
          <Button
            buttonType="green"
            onPress={onPressNavigateLocation}
            label={'Bulunduğum Konumu Göster'}
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default StationInfoModal;

const styles = StyleSheet.create({
  content: {
    marginVertical: 24,
  },
  htmlContainer: {
    marginBottom: 16,
  },
  buttonStlye: {
    marginBottom: 8,
  },
  labelStyle: {
    marginBottom: 8,
  },
});
