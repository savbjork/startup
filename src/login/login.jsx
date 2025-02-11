import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-light text-center text-white">
      <div>
        <h1>WELCOME</h1>
        <h3>Friends against phone tag!</h3>
        <form method="get" action="home">
          <div className="input-group mb-3">
            <input className="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <input className="form-control" type="password" placeholder="password" />
          </div>
          <button type="submit" className="btn btn-dark">Login</button>
          <button type="submit" className="btn btn-secondary">Create</button>
        </form>
      </div>
    </main>
  );
}