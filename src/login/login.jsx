import React from 'react';
import { Link } from 'react-router-dom';

export function Login({setUserName}) {
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    localStorage.removeItem('userName');
    setUserName('');
  }
  , []);

  function loginUser(e){
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!userName || !password) {
      e.preventDefault();
      return;
    }
    //some validation would go here with database: username + password

    setUserName(userName);
    localStorage.setItem('userName', userName); 
  }

  function createUser(e){
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!userName || !password) {
      e.preventDefault();
      return;
    }
    //add DB validation
    setUserName(userName);
    localStorage.setItem('userName', userName);
    
  }

  return (
    <main className="container-fluid bg-light text-center text-white">
      <div>
        <h1>WELCOME</h1>
        <h3>Friends against phone tag!</h3>
        <form method="get" action="/home">
          <div className="input-group mb-3">
            <input className="form-control" id="username" type="text" placeholder="Username" />
          </div>
          <div className="input-group mb-3">
            <input className="form-control" id="password" type="password" placeholder="Password" />
          </div>
          <Link to="/home"  className="btn btn-dark" onClick={loginUser}>Login</Link>
          <Link to="/home" className="btn btn-secondary" onClick={createUser}>Create</Link>
        </form>
      </div>
    </main>
  );
}