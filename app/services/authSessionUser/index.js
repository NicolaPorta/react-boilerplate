import proxy from 'utils/networkProxy';

// axios instance setting
export default function requestLogin() {
  return proxy({
    method: 'get',
    url: 'users/login/validation',
  }).then(res => res);
}
