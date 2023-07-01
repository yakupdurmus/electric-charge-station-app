import axios from 'axios';
import {API_URL_PROD, API_URL_LOCAL} from 'constant/constants';
import {getHeaderHash} from './helper';

const axiosInstance = axios.create({
  baseURL: __DEV__ ? API_URL_LOCAL : API_URL_PROD,
  timeout: 1000,
  headers: {hash: getHeaderHash()},
});

export default axiosInstance;
