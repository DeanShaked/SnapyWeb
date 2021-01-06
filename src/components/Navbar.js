import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {

    return(
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        <Link className="navbar-brand" to={"/home"}>Calendaro</Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/calendar"}>Calendar</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/settings"}>Settings</Link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    )
}