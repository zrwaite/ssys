import React from "react";
import {Link} from "react-router-dom";
import logo from "../../images/SOYC.png";
import LindaEllen from "../../images/LindaEllen.jpg";
import "./Home.css";
import CountdownSummit from "../../components/CountdownSummit/CountdownSummit.jsx";

function Home() {
    return (
        <main>
            <div className="homeTop">
                <h1>LEADING THE ECO-REVOLUTION</h1>
                <div className="homeBlurb">
                    <p>A one-of-a-kind event created by youth, for youth: empowering high school students to take a
                        stand for their future</p>
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
            <div className="homeGreen">
                <h1>Workshops, keynote speakers, and more!</h1>
                <div className="homeGreenBlurb">
                    <p>To find out more, click the button below</p>
                </div>
                <div className="homeRegisterBox">
                    <Link to="/info" className="homeRegister">
                           <span>Info</span>
                    </Link>
                </div>
            </div>
            <div className="homeBlue">
                <h1>Meet the Organizers</h1>
                <div className="SOYCGrid">
                    <div className="SOYCImageBox">
                         <img className = "SOYCImage" src={logo} alt="Sustainable Orillia Youth Council" />
                    </div>
                    <div className="SOYCBlurb">
                        <p>The Sustainable Orillia Youth Council
                            <br/><br/>The Sustainable Orillia Youth Council (SOYC) is made up of high school students from across Orillia and surrounding area. Our members are passionate about making a difference in our community by spreading awareness about sustainability and creating initiatives to better the sustainability of Orillia and its residents (such as this one)! The SOYC worked hard to organize this summit. For more information about the SOYC, click the button below.
                        </p>
                        <div className="SOYCButtonBox">
                            <a href='https://www.sustainableorillia.ca/youth-council'>
                                <button className="SOYCButton">SOYC</button>   
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeGreen">
                <h1>Meet the Organizers (Part 2)</h1>
                <div className="SOYCGrid">
                    <div className="SOYCImageBox">
                         <img className = "SOYCImage" src={LindaEllen} alt="Dr. Ellen Field and Dr. Linda Rodenburg" />
                    </div>
                    <div className="SOYCBlurb">
                        <p>Dr. Ellen Field (left) and Dr. Linda Rodenburg (right)
                            <br/><br/>Dr. Ellen Field and Dr. Linda Rodenburg are both professors at Lakehead University. Dr. Field’s research is focused on the policy and practice of climate change education within the k-12 school system. Dr. Rodenburg specializes in postcolonial literatures with a particular interest in indigenous cultural theory. They both have provided us with great support throughout the journey of planning this summit.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;