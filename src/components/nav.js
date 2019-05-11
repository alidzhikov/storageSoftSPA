import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './auth/register';

export default class Nav extends Component {
    render() {
        return (
            <Router>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">MO11</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Вход</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Регистрация</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            
                <Route path="/signup" component={Signup} />
            </Router>
        );
    }
}