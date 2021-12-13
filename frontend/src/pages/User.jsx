import React from "react";
import "../styles/styles.css";
import {deleteCookie, getCookie} from "../modules/cookies";
import {Navigate} from "react-router-dom";

const logout = () => {
    deleteCookie("token");
    deleteCookie("email");
    deleteCookie("registrant_type");
    window.location.assign("/account");
}

function User() {
    if (!(getCookie("email") && getCookie("token") && getCookie("registrant_type"))) {
        return <Navigate to='/account'/>;
    }
    return (
        <main>
            <header>
                <h1>User Page</h1>
                <p>Email = {getCookie("email")}</p>
                <p>Token = {getCookie("token")}</p>
                <p>Account Type = {getCookie("registrant_type")}</p>
                <button onClick={logout}>Logout</button>
            </header>
        </main>
    );
}

export default User;