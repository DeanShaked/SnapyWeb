import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios'
import { getFromStorage } from './utils/Storage';

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Calendar from "./pages/Calendar/Calendar";
import Settings from "./pages/Settings/Settings";
import Navbar from "./components/Navbar"


class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      isLoggedOut: false
    }
  }

  componentDidUpdate() {
    const obj = getFromStorage('calendaro');
    if (obj && obj.token) {
      const { token } = obj; 
      // Verify token
      console.log(token)
      axios.get('http://localhost:4000/verify?token=' + token)
      .then(res => {
        if (res.data.success) {
          this.setState({
            isLoggedOut: false
          });
        }
        else {
          this.setState({
            isLoggedOut: true
          })
        }
      });
    }
  }
  componentDidMount() {
    const obj = getFromStorage('calendaro');
    if (obj && obj.token) {
      const { token } = obj; 
      // Verify token
      console.log(token)
      axios.get('http://localhost:4000/verify?token=' + token)
      .then(res => {
        if (res.data.success) {
          this.setState({
            isLoggedOut: false
          });
        }
        else {
          this.setState({
            isLoggedOut: true
          })
        }
      });
    }
  }

render() {
    if (this.state.isLoggedOut) {
      return (
        <Router>
          <div className="App">
            <Navbar main="whoweare" navitem1="login" navitem2="register"/> : 
              <Switch>
                <Route exact path='/home' component={Home} />
                <Route path="/login"      component={Login} />
                <Route path="/register"   component={Register} />
              </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="App">
            <Navbar main="home" navitem1="calendar" navitem2="settings"/> 
              <Switch>
                <Route exact path='/home' component={Home} />
                <Route path='/calendar'   component={Calendar} />
                <Route path="/settings"   component={Settings} />
              </Switch>
          </div>
        </Router>
      );
    }
  }
}
export default App;