import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {COLOR} from 'constant/constants';
import {IconSet, IconTypes} from './IconSet';

interface IconProps {
  type?: IconTypes;
  name: string;
  style?: StyleProp<TextStyle>;
}

export const Icon = (props: IconProps) => {
  const IconType = props.type || 'MaterialIcons';
  const SelectedIcon = IconSet[IconType];

  return <SelectedIcon name={props.name} style={[styles, props.style]} />;
};

const styles = {
  color: COLOR.text,
  fontSize: 20,
};
