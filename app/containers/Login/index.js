import React from 'react';

export default function Login() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input name="name" type="text" placeholder="Insert name" />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <br />
        <input name="surname" type="text" placeholder="Insert surname" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input name="password" type="text" placeholder="Insert password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
