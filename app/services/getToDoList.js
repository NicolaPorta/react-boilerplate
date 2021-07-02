import proxy from 'utils/networkProxy';

// axios instance setting
export default function getToDoList() {
  return proxy({
    method: 'get',
    url: 'toDos',
  });
}
