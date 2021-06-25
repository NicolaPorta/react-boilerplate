import axios from 'axios';
import { TO_DO_API } from '../constants';

// axios instance creation
const proxy = axios.create();

// axios instance setting
export default function axiosCall(type) {
  return proxy({
    baseURL: TO_DO_API + type,
    method: 'get',
  });
}
