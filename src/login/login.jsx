import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Login({ setUserName }) {
  const [userName, setUserNameState] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userName');
    setUserName('');
  }, [setUserName]);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      setUserName(userName);
      navigate('/home'); // Redirect after successful login
    } else {
      const body = await response.json();
      setErrMessage(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main className="container-fluid bg-light text-center text-white">
      <div>
        <h1>WELCOME</h1>
        <h3>Friends against phone tag!</h3>
        <div className='input-group mb-3'>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserNameState(e.target.value)} placeholder='Username' />
        </div>
        <div className='input-group mb-3'>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>

        {errMessage && <div className="alert alert-danger mt-3">{errMessage}</div>}

        <Button variant='dark' onClick={loginUser} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant='secondary' onClick={createUser} disabled={!userName || !password}>
          Create
        </Button>
      </div>
    </main>
  );
}
