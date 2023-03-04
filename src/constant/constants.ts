const COLOR = {
  white: '#fff',
  lightGray: '#eee',
  lightGray2: '#ddd',
  veryPaleOrange: '#FFE5D9',
  paleOrange: '#FFD7BA',
  verySoftOrange: '#FEC89A',
  verySoftRed: '#FEC5BB',
  lightGrayishRed1: '#FCD5CE',
  lightGrayishRed2: '#FAE1DD',
  lightGrayishRed3: '#F8EDEB',
  lightGrayishOrange: '#ECE4DB',
  lightGrayishYellow: '#E8E8E4',
  lightGrayishCyan: '#D8E2DC',
  green: '#3C6255',
  black30: 'rgba(0,0,0,0.30)',
  black60: 'rgba(0,0,0,0.60)',
  black80: 'rgba(0,0,0,0.80)',
  black100: 'rgba(0,0,0,1)',
  blue100: 'rgba(78,166,243,1)',

  primary: {
    light: '#63a4ff',
    main: '#0077c2',
    dark: '#004d80',
  },
  secondary: {
    light: '#b2d8ff',
    main: '#73b5ff',
    dark: '#4285f4',
  },
  background: '#f5f5f5',
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  textLight: '#ffffff',
  success: {
    light: '#a5d6a7',
    main: '#4caf50',
    dark: '#388e3c',
  },
  warning: {
    light: '#ffd54f',
    main: '#ff9800',
    dark: '#f57c00',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
  },
  disabled: '#cccccc',
};

const INPUTMASK = {mask: '0999 999 99 99'};

const INIT_LOCATION = {
  latitude: 41.2858606,
  longitude: 29.1328714,
  latitudeDelta: 0.035,
  longitudeDelta: 0.032,
};

const TWO_POINT_MAX_KM_DISTANCE = 17;

export {COLOR, INPUTMASK, INIT_LOCATION, TWO_POINT_MAX_KM_DISTANCE};
