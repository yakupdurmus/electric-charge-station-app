import React from 'react';
import BottomModal from './BottomModal';
import {IStation} from 'interface/ISettings';
import {StyleSheet, View} from 'react-native';
import {Button} from 'common/Button';

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
    alert(station?.latitude);
  };

  return (
    <BottomModal
      isVisible={isVisible}
      onClose={onClose}
      title={station?.name || 'Elektrikli Şarj İstasyonu'}>
      <View style={styles.content}>
        <Button
          buttonType="green"
          onPress={onPressOpenMap}
          label={'Şarj İstasyonuna Yol Tarifi Al'}
        />
      </View>
    </BottomModal>
  );
};

export default StationInfoModal;

const styles = StyleSheet.create({
  content: {
    marginVertical: 24,
  },
});
