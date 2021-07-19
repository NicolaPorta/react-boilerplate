import Cookies from 'js-cookie';

const jwtTokenKey = 'accessToken';
export const getJWT = () => Cookies.get(jwtTokenKey);
export const saveJWT = tokenArg => Cookies.set(jwtTokenKey, tokenArg);
