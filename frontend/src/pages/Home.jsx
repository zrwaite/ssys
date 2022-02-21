import React from "react";
import "../styles/styles.css";
import "../styles/home.css";
import {Link} from "react-router-dom";
import logo from "../components/SOYC.png"

function Home() {
    return (
        <main>
            <div class="layout">
                <div class="top">
                    <h1 class="leading">Leading the Eco-Revolution</h1>
                    <h3 class="oneofakind">A one of a kind event created by youth, for youth, empowering youth ages 14-18 to take a stand for their future<br/></h3>
                    <div>
                    <Link to="/account" className="butt">
                        <span className="butttext">Register Now</span>
                    </Link>
                    </div>
                    <div><br/><br/><br/></div>
                </div>
                <div class="countdown">
                    <div class="registrationcountdown">
                        <h1>69:69:69:69</h1>
                        <h2>Until Registration Closes</h2>
                        <h3>Whenever</h3>
                    </div>
                    <div class="conferencecountdown">
                        <h1>69:69:69:69</h1>
                        <h2>Until The Summit</h2>
                        <h3>May 10th</h3>
                    </div>
                </div>
                <div class="keynote">
                    <h2>Our Keynote Speakers</h2>
                    <div class="firstspeakerimagebox">
                         <img className = "firstspeakerimage" src={logo} alt="Logo" />
                    </div>
                    <div class="firstspeakerblurbbox">
                        <p class="firstspeakerblurbtext">This is just some text</p>
                    </div>
                    <div class = "secondspeakerimagebox">
                    <img className= "secondspeakerimage" src={logo} alt="Logo"/>
                    </div>
                    <div class="secondspeakerblurbbox">
                        <p class="secondspeakerblurbtext">This is just some text</p>
                    </div>
                </div>
                <div className="workshop">
                    <h2>Our Workshops</h2>
                    <div>
                    <Link to="/workshop1" className="butt">
                        <span className="butttext">Register Now</span>
                    </Link>
                    </div>
                </div>
                <div className="about">
                    <h2>About Us</h2>
                </div>
            </div>
        </main>
    );
}

export default Home;