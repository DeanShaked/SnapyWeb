import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Calendar from "./pages/Calendar/Calendar";
import Settings from "./pages/Settings/Settings";
import Navbar from "./components/Navbar"


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
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