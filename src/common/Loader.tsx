import React from 'react';
import {View} from 'react-native';
import Spinner, {SpinnerProps} from 'react-native-spinkit';
import {COLOR} from 'constant/constants';

export const Loader = (props: SpinnerProps) => {
  return (
    <View style={styles.container}>
      <Spinner size={50} color={COLOR.white} type="ArcAlt" {...props} />
    </View>
  );
};

const styles = {
  container: {flex: 1},
};
