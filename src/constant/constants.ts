import images from 'assets/images';
const IS_DARK_SCHEME = false;
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
  latitudeDelta: 0.035,
  longitudeDelta: 0.032,
};

const ZOOM_LEVEL_16 = {
  latitudeDelta: 0.008106739522311557,
  longitudeDelta: 0.007725097239017487,
};

const stationIcons = {
  esarj: images.esarjIconS,
  gcharge: images.gChargeIconS,
  powersarj: images.powerIconS,
  sharz: images.sharzIconS,
  voltrun: images.voltrunIconS,
  zes: images.zesIconS,
};

const API_URL_PROD = 'https://ws-ecs.vercel.app/';
const API_URL_DEV = 'https://ws-ecs-git-develop-yakupdurmus.vercel.app/';
const API_URL_LOCAL = 'http://192.168.1.104:4000/';
const MONTH_FORMAT = 'MM-YYYY';
const USER_KEY = 'yakupdurmus';

const STORAGE_KEY = {
  favorite: 'favoriteStation',
  onBoarding: 'onBoarding',
};

export {
  COLOR,
  INPUTMASK,
  INIT_LOCATION,
  stationIcons,
  ZOOM_LEVEL_16,
  IS_DARK_SCHEME,
  API_URL_PROD,
  API_URL_DEV,
  API_URL_LOCAL,
  MONTH_FORMAT,
  USER_KEY,
  STORAGE_KEY,
};
