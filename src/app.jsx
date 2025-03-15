import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBoxArrowLeft, BsHouseDoor, BsCalendarWeek, BsPerson } from "react-icons/bs";
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Friends } from './friends/friends';
import { Home } from './home/home';
import { Schedule } from './schedule/schedule';

export default function App() {


    const [userName, setUserName] = React.useState(localStorage.getItem('userName'));

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
            credentials: 'include',
        })
            .catch(() => {
            // Logout failed. Assuming offline
            })
            .finally(() => {
            localStorage.removeItem('userName');
            setUserName(null);
            });
        }

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
                            
                            {userName && (
                                <>
                                <li className="nav-item">
                                <NavLink className='nav-link' to='' onClick={() => logout()}>
                                <BsBoxArrowLeft size="2rem" />
                                </NavLink>
                                </li>  

                                <li className="nav-item">
                                <NavLink className='nav-link' to='home'>
                                <BsHouseDoor size="2rem" />
                                </NavLink>
                                
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to='schedule'>
                                    <BsCalendarWeek size="2rem" />
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to='friends'>
                                    <BsPerson size="2rem" />
                                    </NavLink>
                                </li>
                                </>
                            )}
                            
                            </menu>
                        </nav>
                    </header>

                <Routes>
                    <Route path='/' element={<Login setUserName={setUserName}/>} exact />
                    <Route path='/home' element={<Home userName={userName}/>} />
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