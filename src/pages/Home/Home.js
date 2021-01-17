import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { getFromStorage } from '../../utils/Storage';

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoggedOut: false
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
            else{
              this.setState({
                isLoggedOut: true
              })
            }
          });
        }
    }

    logout() {
        const obj = getFromStorage('calendaro');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            console.log(token)
            axios.get('http://localhost:4000/logout?token=' + token)
            .then(res => {
                if (res.data.success) {
                this.setState({
                    token: '',
                    isLoggedOut: true                
                  });
                }
                else{
                  this.setState({
                    isLoggedOut: false
                  })
                }
            });
        }
    }

    render() {
        if (this.state.isLoggedOut) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/login" }} />
        } else { 
          return(
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Event Title</h3>
                    <label>Event Name</label>
                    <input type="text" className="form-control" placeholder="Event name" />
                    <button value="Logout" onClick={this.logout.bind(this)}></button>
                </div>
            </div>
            )
        }
    }
}

