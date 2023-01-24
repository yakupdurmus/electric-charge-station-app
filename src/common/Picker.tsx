import React from 'react';
import {View, Platform} from 'react-native';
import {Label} from './Label';
import RNPickerSelect, {PickerItemProps} from '@react-native-picker/picker';
import {COLOR} from 'constant/constants';

interface PickerProps {
  title?: string;
  error?: boolean;
  errorMessage?: string;
  contentStyle?: any;
  items?: PickerItemProps;
  onValueChange?: (value: any) => void;
}

export const Picker = (props: PickerProps) => {
  const {error, errorMessage, contentStyle, items, onValueChange} = props;
  const RNPicker = RNPickerSelect as any;

  return (
    <View style={[styles.content, contentStyle]}>
      <RNPicker
        onValueChange={(value: any) => {
          onValueChange && onValueChange(value);
        }}
        items={items || []}
        placeholder={{label: 'İl seçimi yapınız', value: 0}}
        style={styles.pickerStyle}
      />
      {errorMessage ? (
        error ? (
          <Label style={styles.errorTextStyle}>{errorMessage}</Label>
        ) : (
          <Label />
        )
      ) : null}
    </View>
  );
};

const styles = {
  content: {
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: COLOR.lightGray,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
  errorBorderStyle: {
    borderBottomWidth: 1,
    borderColor: COLOR.lightGray,
  },
  errorTextStyle: {
    fontSize: 12,
    opacity: 0.6,
    color: 'red',
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: 5,
  },
  titleStlye: {},
  requireStar: {
    color: 'red',
  },
  phoneInput: {
    borderBottomWidth: 1,
    borderColor: COLOR.lightGray,
    padding: 10,
    fontSize: 14,

    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
  },
  pickerStyle: {
    inputIOS: {
      fontSize: 14,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: COLOR.lightGray,
    },
    inputAndroid: {
      fontSize: 14,
      height: 30,
      marginTop: -15,
      color: COLOR.lightGrayishCyan,
      borderBottomWidth: 1,
      borderColor: COLOR.lightGray,
    },
  },
};
