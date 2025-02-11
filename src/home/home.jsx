import React from 'react';
import './home.css';

export function Home() {
  return (
    <main className="status container-fluid p-0 text-light">
      <div className="container">
        <h4 className="text-center">Your friends are free to chat!</h4>
        <br/>
        <div className="row bg-light p-2" style={{ "--bs-bg-opacity": ".5" }}>
          <div className="col-md-6 text-white p-3">
            <h2 className="text-success">Available</h2>
            <ul className="list-group list-group-horizontal flex-wrap">
              <li className="list-group-item">Adge</li>
              <li className="list-group-item">Caroline</li>
              <li className="list-group-item">Lily</li>
              <li className="list-group-item">James</li>
              <li className="list-group-item">Stevie</li>
              <li className="list-group-item">Martha</li>
            </ul>
          </div>
          <div className="col-md-6 text-white p-3">
            <h2 className="text-danger">Busy</h2>
            <ul className="list-group list-group-horizontal flex-wrap">
              <li className="list-group-item">Glinda</li>
              <li className="list-group-item">Fiyero</li>
              <li className="list-group-item">Trisha</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}