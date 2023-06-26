import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Label} from 'common/Label';
import Spinner from 'react-native-spinkit';
import {COLOR} from 'constant/constants';
import {Icon} from './Icon';

interface ButtonProps extends TouchableOpacityProps {
  style?: any;
  textProps?: any;
  textStyle?: any;
  children?: any;
  label?: any;
  loading?: any;
  border?: any;
  left?: any;
  right?: any;
  buttonType?: 'light' | 'yellow' | 'smokeyellow' | 'orange' | 'green' | 'blue';
  leftIcon?: any;
}

export const Button = (props: ButtonProps) => {
  const {loading} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      {...props}
      disabled={!!loading}
      style={[
        styles.buttonStyle,
        props.border && styles.bordered,
        props.left && styles.left,
        props.right && styles.right,
        props.buttonType && styles[props.buttonType],
        props.style,
      ]}>
      {props.leftIcon ? (
        <Icon style={styles.leftIconStyle} name={props.leftIcon} />
      ) : null}
      {loading ? (
        <Spinner
          size={Platform.OS === 'android' ? 19 : 18}
          color={COLOR.white}
        />
      ) : (
        <Label
          {...props.textProps}
          style={[
            props.buttonType && styles[props.buttonType],
            props.textStyle,
          ]}>
          {props.children}
          {props.label}
        </Label>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftIconStyle: {
    marginRight: 4,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 3,
    flexDirection: 'row',
  },
  bordered: {
    borderWidth: 1,
    borderColor: COLOR.lightGray,
  },
  textStyle: {},
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  light: {
    backgroundColor: COLOR.lightGray2,
  },
  orange: {
    backgroundColor: COLOR.warning.dark,
    color: COLOR.white,
  },
  yellow: {
    backgroundColor: COLOR.warning.light,
    color: COLOR.white,
  },
  smokeyellow: {
    backgroundColor: COLOR.warning.main,
    color: COLOR.white,
  },
  green: {
    backgroundColor: COLOR.success.main,
    color: COLOR.white,
  },
  blue: {
    backgroundColor: COLOR.secondary.dark,
    color: COLOR.white,
  },
});
