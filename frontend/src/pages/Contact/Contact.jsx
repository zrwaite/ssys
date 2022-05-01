import React, {useState} from "react";
import {httpReq} from "../../modules/http_requests";
import ReactDOM from "react-dom";
import "./Contact.css"
import SOYC from "../../components/SOYC.png";

function Contact() {

    return (
        <main>
            <div className="contactTop">
                <h1>Contact Us</h1>
                <div className="contactBlurb">
                    <p>Have any questions? Problems? Notice a bug? Please us using the information below!</p>
                </div>
            </div>
            <div className="contactBodyBlue">
                <h1>Summit Information</h1>
                <div className="contactBlurb">
                    <p>Have any general questions about the summit? Please email blythe@sustainableorillia.ca</p>
                </div>
            </div>
            <div className="contactBodyGreen">
                <h1>Tech Support</h1>
                <div className="contactBlurb">
                    <p>Having tech problems? Please email weiqixu2005@sustainableorillia.ca</p>
                </div>
            </div>
            <div className="contactSOYC">
                <h1>SOYC Information</h1>
                <div className="contactSOYCGrid">
                    <div className="contactSOYCImageBox">
                        <img className = "contactSOYCImage" src={SOYC} alt="SOYC" />
                    </div>
                    <div className="contactSOYCBlurb">
                        <p>If you are interested in finding out more about the SOYC, or perhaps even joining, you can email yc@sustainableorillia.ca or click the button below to check out our Instagram!</p>
                        <div className="contactSOYCButtonBox">
                            <a href='https://www.instagram.com/sustainableorillia_yc/'>
                                <button className="contactSOYCButton">SOYC Instagram</button>   
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Contact;