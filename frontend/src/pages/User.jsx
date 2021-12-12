import React from "react";
import "../styles/styles.css";
import {getCookie} from "../modules/cookies";

function User() {
    return (
        <main>
            <header>
                <h1>User Page</h1>
                <p>Email = {getCookie("email")}</p>
                <p>Token = {getCookie("token")}</p>
                <p>Account Type = {getCookie("registrant_type")}</p>
            </header>
        </main>
    );
}

export default User;