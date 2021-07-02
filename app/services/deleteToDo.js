import proxy from 'utils/networkProxy';

// axios instance setting
export default function deleteToDo(id) {
  return proxy({
    method: 'delete',
    url: `toDos/${id}`,
  });
}
