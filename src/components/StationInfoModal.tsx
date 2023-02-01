import React from 'react';
import BottomModal from './BottomModal';
import {IStation} from 'interface/ISettings';
import {Platform, StyleSheet, View} from 'react-native';
import {Button} from 'common/Button';
import {openMap} from 'helper/helper';

const StationInfoModal = ({
  isVisible,
  onClose,
  station,
}: {
  isVisible: boolean;
  station?: IStation;
  onClose?: () => void;
}) => {
  const onPressOpenMap = () => {
    openMap(station?.latitude, station?.longitude);
  };

  return (
    <BottomModal
      isVisible={isVisible}
      onClose={onClose}
      title={station?.name || 'Elektrikli Şarj İstasyonu'}>
      <View>
        <View style={styles.content}>
          <Button
            buttonType="light"
            onPress={onPressOpenMap}
            label={'Googe Maps ile Yol Tarifi Al'}
            style={styles.buttonStlye}
          />
          {Platform.OS === 'ios' ? (
            <Button
              buttonType="light"
              onPress={onPressOpenMap}
              label={'Apple Maps ile Yol Tarifi Al'}
              style={styles.buttonStlye}
            />
          ) : null}
          <Button
            buttonType="green"
            onPress={onPressOpenMap}
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
  buttonStlye: {
    marginBottom: 8,
  },
});
