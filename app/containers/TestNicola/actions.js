/*
 *
 * LanguageProvider actions
 *
 */
// import axios from 'axios';

export function changeToDo() {
  return {
    type: 'TO_DO',
    // toDo: axios.get('https://jsonplaceholder.typicode.com/todos/1').then(e => e.data),
  };
}