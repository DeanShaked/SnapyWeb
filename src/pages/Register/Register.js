import React from "react";
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            email:'',
            password:'',
        };
        this.changeFullName = this.changeFullName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    onSubmit = (event) => {
        
        event.preventDefault()

        const registered = {
            fullName:this.state.fullName,
            email:this.state.email,
            password:this.state.password
        }
        
        axios.post("http://localhost:4000/register", registered)
        .then(res => console.log(res.data))

        this.setState({
            fullName:'',
            email:'',
            password:''
        })
    }

    changeFullName = (event) =>{
        this.setState({
            fullName:event.target.value
        })
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
        return(
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text"
                        className="form-control"
                        placeholder="Enter Full Name"
                        onChange={this.changeFullName}
                        value={this.state.fullName}
                         />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={this.changeEmail}
                        value={this.state.email} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={this.changePassword}
                        value={this.state.password} />
                    </div>

                    <input type="submit" className="btn btn-primary btn-block" value="Register" ></input>

                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
        )};
}