import React, {useState} from "react";
import {httpReq} from "../../modules/http_requests";
import ReactDOM from "react-dom";
import "./Contact.css"

function Contact() {

    return (
        <main>
            <div className="contactTop">
                <h1>Contact Us</h1>
                <div className="contactBlurb">
                    <p>Have any questions? Problems? Notice a bug? Please us using the information below!</p>
                </div>
            </div>
        </main>
    );
}

export default Contact;