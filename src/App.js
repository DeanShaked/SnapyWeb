import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Calendar from "./pages/Calendar/Calendar";
import Settings from "./pages/Settings/Settings";


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>Calendaro</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to={"/home"}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/calendar"}>Calendar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/settings"}>Settings</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route path="/login"      component={Login} />
            <Route path="/register"   component={Register} />
            <Route path='/calendar'   component={Calendar} />
            <Route path="/settings"   component={Settings} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;