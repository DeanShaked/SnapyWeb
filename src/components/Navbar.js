import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar({main, navitem1, navitem2}) {
    return(
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        <Link className="navbar-brand" to={`/${main}`}>Calendaro</Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link active" to={`/${main}`}>{main}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/${navitem1}`}>{navitem1}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/${navitem2}`}>{navitem2}</Link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    )
}