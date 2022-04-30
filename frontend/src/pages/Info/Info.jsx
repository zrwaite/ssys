import React from "react";
import "./Info.css";
import diannesaxe from "../../components/diannesaxe.jpg";
import {Link} from "react-router-dom";

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
                    <p>200 HIGH SCHOOL STUDENTS FROM ACROSS SIMCOE COUNTY. </p>
                </div>
            </div>
        </main>
    );
} 

export default Info;
