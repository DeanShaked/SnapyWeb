import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { getFromStorage } from '../../utils/Storage';
import MyPhoto from "./avatar.jpg";
import ReactRoundedImage from "react-rounded-image";
export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoggedOut: false,
            profileImg: MyPhoto
        }
    }

    imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){
          this.setState({profileImg: reader.result})
        }
      }
      reader.readAsDataURL(e.target.files[0])
    };
    
    componentDidMount() {
        const obj = getFromStorage('calendaro');
        if (obj && obj.token) {
          const { token } = obj; 
          // Verify token
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
          return (
            <div className="main-wrapper">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding:"96px"}}>
                <ReactRoundedImage
                  image={this.state.profileImg}
                  roundedColor="#66A5CC"
                  imageWidth="300"
                  imageHeight="300"
                  roundedSize="8"
                  hoverColor="#e3e3e3"
                />
                <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler.bind(this)}/>
              </div>
              <div className="auth-wrapper">
                  <div className="auth-inner">
                      <h3>Event Title</h3>
                      <label>Event Name</label>
                      <input type="text" className="form-control" placeholder="Event name" />
                      <button value="Logout" onClick={this.logout.bind(this)}></button>
                  </div>
              </div>
            </div>
            )
        }
    }
}

