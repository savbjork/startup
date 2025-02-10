import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//TODO: add icons
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Friends } from './friends/friends';
import { Home } from './home/home';
import { Schedule } from './schedule/schedule';

export default function App() {
    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className="container-fluid bg-light">
                    <nav className="navbar fixed-top">
                        <a className="navbar-brand text-dark" href="#">
                            <h2>
                            Do Disturb<sup>&reg;</sup>
                            <img src="sun.png" alt="sun" width={40} />
                            </h2>
                        </a>
                            <menu className="navbar-nav justify-content-end gap-2 align-items-center">
                            {/* <li className="nav-item">
                            <a className="nav-link text-secondary" href="index.html">
                            <i className="bi bi-box-arrow-left" style={{ fontSize: '2rem' }}></i>
                            </a>
                            </li> 
                            <li className="nav-item">
                            <a className="nav-link text-secondary" href="home.html">
                            <i className="bi bi-house-door" style={{ fontSize: '2rem' }}></i>
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link text-secondary" href="schedule.html">
                            <i className="bi bi-calendar-week" style={{ fontSize: '2rem' }}></i>
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link text-dark" href="friends.html">
                            <i className="bi bi-person" style={{ fontSize: '2rem' }}></i>
                            </a>
                            </li> */}
                            <li className='nav-item'>
                                <NavLink className='nav-link' to=''>Login</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='home'>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='schedule'>Schedule</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='friends'>Friends</NavLink>
                            </li>
                            </menu>
                        </nav>
                    </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/home' element={<Home />} />
                    <Route path='/schedule' element={<Schedule />} />
                    <Route path='/friends' element={<Friends />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="text-50 text-secondary bg-light">
                    <div className="container-fluid">
                        <span>   Author: Savannah Bjorkman</span>
                        <a className="text-muted" href="https://github.com/savbjork/startup/tree/main">GitHub</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
      
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }