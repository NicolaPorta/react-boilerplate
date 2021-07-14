// services a fianco alla cartella containers
import axios from 'axios';
import { saveJWT, getJWT } from './jwtManage';
// axios instance creation
const proxy = axios.create();
proxy.defaults.baseURL = process.env.URL_TO_DO_API;
const getAuthorization = tokenArg => {
  if (tokenArg) {
    saveJWT(tokenArg);
  }
  const token = tokenArg || getJWT();
  return token && `Bearer ${token}`;
};
proxy.defaults.headers.common.authorization = getAuthorization();
const tokenRefreshInterceptor = response => {
  const token = response.data.accessToken;
  if (token) {
    proxy.defaults.headers.common.authorization = getAuthorization(token);
  }
  return response;
};
proxy.interceptors.response.use(tokenRefreshInterceptor);

export default proxy;
