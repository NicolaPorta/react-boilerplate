import proxy from 'utils/networkProxy';
import schema from './schema';

// axios instance setting
export default function getToDoList() {
  return proxy({
    method: 'get',
    url: 'toDos',
  }).then(res => {
    const validation = schema.validate(res.data);
    if (validation.error) return console.log(validation.error.message);
    return res;
  });
}
