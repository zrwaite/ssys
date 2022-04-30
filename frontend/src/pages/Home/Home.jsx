import React from "react";
import {Link} from "react-router-dom";
import logo from "../../components/SOYC.png";
import "./Home.css";
import CountdownRegistration from "../../components/CountdownRegistration/CountdownRegistration.jsx";
import CountdownSummit from "../../components/CountdownSummit/CountdownSummit.jsx";

function Home() {
    return (
        <main>
            <div className="homeTop">
                <h1>LEADING THE ECO-REVOLUTION</h1>
                <div className="homeBlurb">
                    <p>A one-of-a-kind event created by youth, for youth: empowering high school students to take a stand for their future</p>
                </div>
                <div className="homeRegisterBox">
                    <Link to="/account" className="homeRegister">
                           <span>Register</span>
                    </Link>
                </div>
            </div>
            <div className="homeCountdown">
                <div className="homeCountdownGrid">
                    <div className="homeCountdownBlurb">
                        <p>May 26th, 2022 <br/>9AM to 4PM <br/> Lakehead University Orillia Campus</p>
                    </div>
                    <div className="homeCountdownRight">
                        <h1><CountdownSummit/></h1>
                        <h2>Until The Summit</h2>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;