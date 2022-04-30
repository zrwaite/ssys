import React from "react";
import "./Info.css";
import lakehead from "../../components/lakehead.png";
import diannesaxe from "../../components/diannesaxe.jpg";
import {Link} from "react-router-dom";
import CountdownSummit from "../../components/CountdownSummit/CountdownSummit.jsx";

function Info() {
    return (
        <main>
            <div className="infoTop">
                <h1>WHAT TO EXPECT</h1>
                <div className="infoBlurb">
                    <p>JOIN US FOR A DAY OF EMPOWERING SPEECHES BY LEADERS IN SUSTAINABILITY AND ENVIRONMENTALISM, AND A SERIES OF IMPACTFUL WORKSHOPS</p>
                </div>
            </div>
            <div className="infoWho">
                <h1>WHO?</h1>
                <div className="infoWhoBlurb">
                    <p>200 HIGH SCHOOL STUDENTS FROM ACROSS SIMCOE COUNTY. 10 WORKSHOP LEADERS. 2 KEYNOTE SPEAKERS. <br/><br/>
                    FOR MORE INFORMATION ON THE KEYNOTE SPEAKERS, SCROLL DOWN<br/><br/>
                    FOR MORE INFORMATION ON THE WORKSHOPS, CLICK THE BUTTON BELOW</p>
                </div>
                <div className="infoWhoButtonBox">
                    <Link to="/workshop" className="infoWhoButton">
                           <span>Workshops</span>
                    </Link>
                </div>
            </div>
            <div className="infoWhere">
                <h1>WHERE?</h1>
                <div className="infoWhereGrid">
                    <div className="infoWhereImageBox">
                         <img className = "infoWhereImage" src={lakehead} alt="lakehead" />
                    </div>
                    <div className="infoWhereBlurb">
                        <p>Lakehead University Orillia Campus, 500 University Ave, Orillia
                            <br/><br/>Home to Ontario's second best primarily undergraduate university. For more information about Lakehead Orillia, click the button below.
                        </p>
                        <div className="infoWhereButtonBox">
                            <a href='https://www.lakeheadu.ca/about/orillia-campus'>
                                <button className="infoWhereButton">Lakehead</button>   
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="infoWhen">
                <h1>WHEN?</h1>
                <div className="infoWhenGrid">
                    <div className="infoWhenBlurb">
                        <p>May 26th, 2022. <br/>9AM to 4PM. <br/> A day dedicated to climate.</p>
                    </div>
                    <div className="infoWhenCountdown">
                        <h1><CountdownSummit/></h1>
                        <h2>Until The Summit</h2>
                        <h3>May 26th</h3>
                    </div>
                </div>
            </div>
            <div className="infoWhy">
                <h1>WHY?</h1>
                <div className="infoWhyBlurb">
                    <p>To enable youth-led climate action across Simcoe County</p>
                </div>
            </div>
            <div className="infoKeynote">
                <h1>OUR KEYNOTE SPEAKERS</h1>
                <div className="infoKeynoteBlurb">
                    <p>Below are our 2 fabulous keynote speakers!</p>
                </div>
            </div>
        </main>
    );
} 

export default Info;

