import React from 'react';
import {ViewStyle} from 'react-native';
import {COLOR} from 'constant/constants';
import {IconSet, IconTypes} from './IconSet';

interface IconProps {
  type?: IconTypes;
  name: string;
  style?: ViewStyle;
}

export const Icon = (props: IconProps) => {
  const IconType = props.type || 'AntDesign';
  const SelectedIcon = IconSet[IconType];

  return <SelectedIcon name={props.name} style={[styles, props.style]} />;
};

const styles = {
  color: COLOR.lightGrayishCyan,
};
