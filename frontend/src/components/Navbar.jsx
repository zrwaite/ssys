import React from "react";
import "../styles/styles.css";
import "../styles/nav.css";
import logo from '../components/SOYC.png'
import {Link} from "react-router-dom";



function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-link">
                <i className="fa fa-bars"></i>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <span className="link-text">Logo to be here</span>
                    </Link>
                </li>
                <li exact className="nav-item">
                    <Link to="/info" className="nav-link">
                        <span className="link-text">Conference Info</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/account" className="nav-link">
                        <span className="link-text">Account Page</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                        <span className="link-text">Contact Us</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;
