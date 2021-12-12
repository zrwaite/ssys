import React from "react";
import Home from "../pages/Home";
import Info from "../pages/Info";
import Account from "../pages/Account";
import Contact from "../pages/Contact";
import "../styles/styles.css";
import "../styles/nav.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import User from "../pages/User";


function Navbar() {
    return (
        <Router>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <span className="link-text">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
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
            <Routes>
                <Route path="/" element={<Home/>}>
                </Route>
                <Route path="/info" element={<Info/>}>
                </Route>
                <Route path="/account" element={<Account/>}>
                </Route>
                <Route path="/contact" element={<Contact/>}>
                </Route>
                <Route path="/register" element={<Register/>}>
                </Route>
                <Route path="/signin" element={<SignIn/>}>
                </Route>
                <Route path="/user" element={<User/>}>
                </Route>
            </Routes>
        </Router>
    );
}

export default Navbar;
