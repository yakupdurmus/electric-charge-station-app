import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLOR} from 'constant/constants';

interface ILabel extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'normal';
  bold?: boolean;
}

export const Label = (props: ILabel) => {
  const {type, bold, style} = props;

  const testStyle = [
    styles.textStyle,
    styles[type || 'normal'],
    bold && styles.bold,
    style,
  ];

  return (
    <Text style={testStyle} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: COLOR.black80,
    textAlign: 'left',
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 7,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  h4: {
    fontSize: 44,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  normal: {},
});
