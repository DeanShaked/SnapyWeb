import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoggedOut: false
        }
    }
    
    logout = () => {
        axios.post("http://localhost:4000/logout")
        .then(res => {console.log(res.data)})

    }

    render() {
        if (this.state.isLoggedOut) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/calendar" }} />;
        }
        return(
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Event Title</h3>
                <label>Event Name</label>
                <input type="text" className="form-control" placeholder="Event name" />
                <button value="Logout" onClick={this.logout}></button>
            </div>
        </div>
        )
    }
}

