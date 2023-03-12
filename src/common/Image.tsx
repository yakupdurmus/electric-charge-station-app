import {SCREEN_WIDTH} from 'helper/helper';
import React, {useCallback, useState} from 'react';
import {ImageStyle} from 'react-native';
import FastImage, {FastImageProps, OnLoadEvent} from 'react-native-fast-image';

interface IProps {
  width?: number;
  height?: number;
  style?: ImageStyle;
}

export default function Image(props: FastImageProps & IProps): JSX.Element {
  const [height, setHeight] = useState(0);
  const width = props.width || SCREEN_WIDTH;

  const onLoad = useCallback(
    (e: OnLoadEvent) => {
      const aspectRatio = e.nativeEvent.width / e.nativeEvent.height;
      setHeight(width / aspectRatio);
    },
    [width],
  );

  return (
    <FastImage
      onLoad={onLoad}
      {...props}
      style={[{width: width, height: height}, props.style]}
    />
  );
}
