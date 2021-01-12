import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
    setInStorage,
    getFromStorage,
  } from '../../utils/Storage';

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoggedOut: false
        }
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        const obj = getFromStorage('calendaro');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          axios.get('/api/account/verify?token='+token)
            .then(res => {
              console.log(res.data)
              if (res.success) {
                console.log("here 1")
                this.setState({
                  token,
                });
              }
              else{
                console.log("here 2")
                this.setState({
                  isLoggedOut: true
                })
              }
            });
        }
    }

    logout() {
        const obj = getFromStorage('calendaro');
        console.log(obj)
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(res => {
                if (res.data.success) {
                this.setState({
                    token: '',
                    isLoggedOut: true
                });
                }
            });
        }
    }

    render() {
      console.log(this.state.isLoggedOut)
        if (this.state.isLoggedOut) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/login" }} />;
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

