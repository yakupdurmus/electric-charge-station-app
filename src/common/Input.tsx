import React from 'react';
import {TextInput, View, TextInputProps, StyleSheet} from 'react-native';
import {Label} from 'common/Label';
import {COLOR} from 'constant/constants';

interface InputProps extends TextInputProps {
  require?: any;
  title?: any;
  error?: any;
  errorMessage?: any;
  contentStyle?: any;
  style?: any;
  isPhone?: any;
  value?: any;
  placeholder?: string;
}
export const Input = (props: InputProps) => {
  const {require, title, error, errorMessage, contentStyle, style} = props;
  return (
    <View style={[styles.content, contentStyle]}>
      {title && (
        <Label style={styles.titleStlye}>
          {title}
          {require && <Label style={styles.requireStar}>*</Label>}
        </Label>
      )}

      <TextInput
        {...props}
        placeholderTextColor={COLOR.textMuted}
        style={[styles.textInput, error ? styles.errorBorderStyle : {}, style]}
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

const styles = StyleSheet.create({
  content: {},
  errorBorderStyle: {
    borderBottomWidth: 1,
    borderColor: COLOR.error.main,
  },
  errorTextStyle: {
    fontSize: 12,
    opacity: 0.6,
    color: COLOR.error.main,
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: 4,
    backgroundColor: COLOR.white,
  },
  titleStlye: {},
  requireStar: {
    color: COLOR.error.main,
  },
});
