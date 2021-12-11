import React from "react";
import Home from "../pages/Home";
import Info from "../pages/Info";
import User from "../pages/User";
import Contact from "../pages/Contact";
import "../styles/styles.css";
import "../styles/nav.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


function Navbar() {
    return (
        <Router>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <span className="link-text home-link">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/info" className="nav-link">
                            <span className="link-text code-link">Conference Info</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user" className="nav-link">
                            <span className="link-text hobbies-link">User Page</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">
                            <span className="link-text contact-link">Contact Us</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}>
                </Route>
                <Route path="/info" element={<Info/>}>
                </Route>
                <Route path="/user" element={<User/>}>
                </Route>
                <Route path="/contact" element={<Contact/>}>
                </Route>
            </Routes>
        </Router>
    );
}

export default Navbar;
