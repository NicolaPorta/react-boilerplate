import proxy from 'utils/networkProxy';

// axios instance setting
export default function requestLogin(email, password) {
  return proxy({
    method: 'post',
    url: 'users/login',
    data: {
      email,
      password,
    },
  }).then(res => res);
}
