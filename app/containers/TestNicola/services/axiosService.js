import axios from 'axios';
import { TO_DO_API } from '../constants';

// axios instance creation
const proxy = axios.create();

// axios instance setting
export default function axiosCall() {
  return proxy({
    url: `${TO_DO_API}todos`,
    method: 'get',
  });
}
