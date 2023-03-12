import images from 'assets/images';

const COLOR = {
  white: '#fff',
  background: '#f5f5f5',
  lightGray: '#eee',
  lightGray2: '#ddd',
  disabled: '#cccccc',
  black30: 'rgba(0,0,0,0.30)',
  black60: 'rgba(0,0,0,0.60)',
  black80: 'rgba(0,0,0,0.80)',
  black100: 'rgba(0,0,0,1)',
  textLight: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',

  primary: {
    light: '#63a4ff',
    main: '#4ea6f3',
    dark: '#004d80',
  },
  secondary: {
    light: '#c2e2fe',
    main: '#62b4fc',
    dark: '#0370d0',
  },
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
};

const INPUTMASK = {mask: '0999 999 99 99'};

const INIT_LOCATION = {
  latitude: 41.0258606,
  longitude: 29.0628714,
  latitudeDelta: 0.135,
  longitudeDelta: 0.132,
};

const stationIcons = {
  esarj: images.esarjIcon,
  gcharge: images.gChargeIcon,
  powersarj: images.powerIcon,
  sharz: images.sharzIcon,
  voltrun: images.voltrunIcon,
  zes: images.zesIcon,
};

const TWO_POINT_MAX_KM_DISTANCE = 17;

export {
  COLOR,
  INPUTMASK,
  INIT_LOCATION,
  TWO_POINT_MAX_KM_DISTANCE,
  stationIcons,
};
