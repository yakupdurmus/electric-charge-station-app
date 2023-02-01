import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const Navigation = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={props.fill || '#000'}
      fillRule="evenodd"
      d="M14.78 1.22a.75.75 0 0 1 .148.851l-5.921 12.5a.75.75 0 0 1-1.406-.14L6.395 9.606 1.568 8.4a.75.75 0 0 1-.14-1.406l12.5-5.92a.75.75 0 0 1 .852.147zM3.965 7.452l3.23.807a.75.75 0 0 1 .546.546l.807 3.23 4.125-8.708-8.708 4.125z"
      clipRule="evenodd"
    />
  </Svg>
);

const Search = (props: IProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={props.fill || '#000'}
      fillRule="evenodd"
      d="M14.78 1.22a.75.75 0 0 1 .148.851l-5.921 12.5a.75.75 0 0 1-1.406-.14L6.395 9.606 1.568 8.4a.75.75 0 0 1-.14-1.406l12.5-5.92a.75.75 0 0 1 .852.147zM3.965 7.452l3.23.807a.75.75 0 0 1 .546.546l.807 3.23 4.125-8.708-8.708 4.125z"
      clipRule="evenodd"
    />
  </Svg>
);

const IconSet = {Navigation, Search};

type IconName = 'Navigation' | 'Search';

interface IProps extends SvgProps {
  name: IconName;
}

const Icon = (props: IProps) => {
  const SelectedIcon = IconSet[props.name];
  return <SelectedIcon {...props} key={props.name} />;
};

export default Icon;
