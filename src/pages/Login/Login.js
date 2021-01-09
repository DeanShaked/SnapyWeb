import React from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            isSignedUp:false
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
            if (res.data.success === true) {
                console.log(res.data)
                this.setState({ isSignedUp: true });
            }
            else {
                console.log(res.data)
            }
        })


        this.setState({
            email:'',
            password:''
        })
    }

    onSignIn() {
        // Grab state
        const {
          loginEmail,
          signInPassword,
        } = this.state;
        this.setState({
          isLoading: true,
        });
        // Post request to backend
        fetch('/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: loginEmail,
            password: signInPassword,
          }),
        }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              setInStorage('the_main_app', { token: json.token });
              this.setState({
                signInError: json.message,
                isLoading: false,
                signInPassword: '',
                loginEmail: '',
                token: json.token,
              });
            } else {
              this.setState({
                signInError: json.message,
                isLoading: false,
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
        console.log(this.state.isSignedUp)
        if (this.state.isSignedUp) {
            // redirect to home if signed up
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
                </div>
            </div>
        );
    }   
}