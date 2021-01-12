import React from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";import {
    setInStorage,
  } from '../../utils/Storage';
  
  export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            loginError: ''    
        };
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    onSubmit = (event) => {
      
        event.preventDefault()

        const loggedIn = {
          email:this.state.email,
          password:this.state.password
        }
        axios.post("http://localhost:4000/login", loggedIn) 
        .then(res => {
        if (res.data.success) {
            console.log(res.data)
            setInStorage('calendaro', { token: res.data.token });
            this.setState({
              loginError: res.message,
              isLoggedIn: true,
              email: '',
              password: '',
              token: res.token,
            });
          } else {
            this.setState({
              loginError: res.message,
            });
          }
        });
    }

    changeEmail = (event) => {
        this.setState({
            email:event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    render(){
        if (this.state.isLoggedIn) {
          return <Redirect to = {{ pathname: "/home" }} />;
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input 
                            type="email"
                            className="form-control" 
                            placeholder="Enter email"
                            onChange={this.changeEmail}
                            value={this.state.email} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password"
                            onChange={this.changePassword}
                            value={this.state.password} 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                    <div className="error-message">{this.state.loginError}</div>
                </div>
            </div>
        );
    }   
}