import React, {useCallback, useState} from 'react';
import {Dimensions} from 'react-native';
import FastImage, {FastImageProps, OnLoadEvent} from 'react-native-fast-image';

interface IProps {
  width?: number;
  height?: number;
}

const screenWidth = Dimensions.get('window').width;

export default function Image(props: FastImageProps & IProps): JSX.Element {
  const [height, setHeight] = useState(0);
  const width = props.width || screenWidth;

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
      style={{width: width, height: height}}
      {...props}
    />
  );
}
