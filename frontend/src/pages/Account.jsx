import React from "react";
import "../styles/styles.css";
import {Link} from "react-router-dom";
import {createCookie, deleteCookie, getCookie} from "../modules/cookies";

function Account() {
    return (
        <div>
            <h1>Account Page</h1>
            <p>Email = {getCookie("email")}</p>
            <div>
                <div>
                    <Link to="/register">
                        <span className="link-text">Register</span>
                    </Link>
                </div>
                <div>
                    <Link to="/signin">
                        <span className="link-text">Sign In</span>
                    </Link>
                </div>
                <div>
                    <Link to="/user">
                        <span className="link-text">User Page</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Account;