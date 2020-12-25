import React from "react";
import axios from 'axios';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            fullname:'',
            email:'',
            username:'',
            password:'',
        };
    }

    onSubmit(event){
        event.preventDefault()

        const registered = {
            fullname:this.state.fullname,
            email:this.state.email,
            username:this.state.username,
            password:this.state.password
        }

        axios.post('http://localhost:4000/register', registered)
        .then(response => console.log(response.data))

        this.setState({
            fullname:'',
            email:'',
            username:'',
            password:'',
        })
    }

    changeFullName(event){
        this.setState({
            fullname:event.target.value
        })
    }
    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }
    render(){
        return(
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text"
                        className="form-control"
                        placeholder="Enter Full Name"
                        onChange={this.changeFullName.bind(this)}
                        value={this.fullname}
                         />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={this.changeEmail.bind(this)}
                        value={this.email} />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        onChange={this.changeUsername.bind(this)}
                        value={this.username}
                           />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={this.changePassword.bind(this)}
                        value={this.password} />
                    </div>

                    <input type="submit" className="btn btn-primary btn-block" value="Register"></input>

                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
        )};
}