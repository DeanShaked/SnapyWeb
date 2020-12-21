import React from 'react'
import Calendar from '../Calendar/Calendar'
import Settings from '../Settings/Settings'

function Home() {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Add New Event</h3>

                    <div className="form-group">
                        <label>Event Name</label>
                        <input type="text" className="form-control" placeholder="Event name" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Home

