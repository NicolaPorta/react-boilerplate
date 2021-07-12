import proxy from 'utils/networkProxy';

// axios instance setting
export default function addToDoList(toDo) {
  return proxy({
    method: 'post',
    url: `toDos/`,
    data: toDo,
  });
}
