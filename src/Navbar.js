import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Login from './Login';

function Navbar(){

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style = {{backgroundColor: '#1e3c52'}}>
                <Link to = '/' className="navbar-brand">
                   iTrello
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to = "/" className="nav-link">
                                All Items
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to  = "/allcards" className="nav-link">
                                All cards
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/login" className="nav-link">
                                Login
                                

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/register2" className="nav-link">
                                Register
                                

                            </Link>
                        </li>

                    </ul>
                  
                </div>
            </nav>
        </div>
    );
    
}

export default Navbar;