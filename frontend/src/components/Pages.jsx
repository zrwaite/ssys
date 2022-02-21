import React from "react";
import Home from "../pages/Home";
import Info from "../pages/Info";
import Account from "../pages/Account";
import Contact from "../pages/Contact";
import "../styles/styles.css";
import "../styles/nav.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import User from "../pages/User";
import EmailConfirmation from "../pages/EmailConfirmation";
import Navbar from "./Navbar";
import Workshop1 from "../pages/Workshop1";

function Pages() {
    return (
        <Router>
            <Navbar/>
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
                <Route path="/confirmEmail" element={<EmailConfirmation/>}>
                </Route>
                <Route path="/Workshop1" element={<Workshop1/>}>
                </Route>
            </Routes>
        </Router>
    );
}

export default Pages;
