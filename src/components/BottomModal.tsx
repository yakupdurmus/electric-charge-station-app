import {View} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'common/Button';
import {Label} from 'common/Label';
import {COLOR} from 'constant/constants';

interface IProps {
  isVisible?: boolean;
  onClose?: () => void;
  onHide?: () => void;
  children?: JSX.Element;
  modalTopComponent?: JSX.Element;
  title?: string;
}

export default function BottomModal(props: IProps) {
  return (
    <Modal
      isVisible={props.isVisible}
      onSwipeComplete={props.onClose}
      onBackButtonPress={props.onClose}
      onModalHide={props.onHide}
      hasBackdrop={false}
      coverScreen={false}
      swipeDirection={['down']}
      style={styles.modalStyle}
      propagateSwipe={true}>
      <View>
        {props.modalTopComponent}
        <View style={styles.contentStyle}>
          <View style={styles.gestureTouchContainer}>
            <View style={styles.gestureTouch} />
          </View>
          <View style={styles.title}>
            <Label numberOfLines={1} style={styles.titleLabel}>
              {props.title}
            </Label>
            <Button onPress={props.onClose} label={'Kapat'} />
          </View>
          <View>{props.children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    justifyContent: 'flex-end',
  },
  contentStyle: {
    minHeight: 100,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'center',
  },
  titleLabel: {
    marginTop: 8,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },

  gestureTouch: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLOR.lightGray2,
  },

  gestureTouchContainer: {
    top: 8,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
});
