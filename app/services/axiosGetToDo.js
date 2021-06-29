// services a fianco alla cartella containers
import axios from 'axios';

// axios instance creation
const proxy = axios.create();
proxy.defaults.baseURL = process.env.URL_TO_DO_API;

// axios instance setting
export default function getToDoList() {
  return proxy({
    method: 'get',
    url: 'toDos',
  });
}
