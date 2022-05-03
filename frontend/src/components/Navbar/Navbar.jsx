import React, {useState} from "react";
import "./Navbar.css";
import logo from "../../images/SSYS.png";
import {Link} from "react-router-dom";

function Navbar() {

    const [isMobile, setIsMobile] = useState(false);

    return (
        <nav className="navbar">
                    <a href="/">
                    <img className="navImage" src={logo} alt="SSYS"/>
                    </a>
            <ul className={isMobile? "nav-links-mobile" : "nav-links"}
            onClick={() => setIsMobile(false)}
            >
                <Link to="/" className="home">
                    <li>Home</li>
                </Link>
                <Link to="/info" className="info">
                    <li>Info</li>
                </Link>
                <Link to="/account" className="account">
                    <li>Account</li>
                </Link>
                <Link to="/contact" className="contact">
                    <li>Contact</li>
                </Link>
            </ul>
            <button className="mobile-menu-icon"
            onClick={() => setIsMobile(!isMobile)}
            >
                {isMobile ? (
                <div className="navButtonBackground">X</div> 
               ) : (<div className="navButtonBackground">☰</div>
               )}
            </button>
        </nav>
    );
}
export default Navbar;
