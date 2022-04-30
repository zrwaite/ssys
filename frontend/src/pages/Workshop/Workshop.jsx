import React from "react";
import {Link} from "react-router-dom";
import "./Workshop.css";
import Trish from "../../components/Trish.jpg";

function Workshop() {
    return(
    <main>
        <div className="workshopTop">
            <h1>WORKSHOPS</h1>
            <div className="workshopBlurb">
                <p>Below are our 10 wonderful workshops!</p>
            </div>
        </div>
        <div className="workshopGreen">
                <h1>Elder Trish Monague</h1>
                <div className="workshopGrid">
                    <div className="workshopImageBox">
                         <img className = "workshopImage" src={Trish} alt="Elder Trish Monague" />
                    </div>
                    <div className="workshopBlurb">
                        <p>Trish Monague (“Cedar Woman”) is from Beausoleil First Nation, and she began her relationship with the spirit at the age of three and uses her gift as a cultural teacher and traditional healer. She has been clean and sober and walking the Anishnawbe Miikan for 30 years. Currently, she is the Heritage and Cultural Coordinator for Beausoleil First Nation and she shares her time, wisdom, and teachings with the Lakehead Orillia community as a traditional healer, Elder-in-residence, and a member of the Lakehead University Elders Council.</p>
                    </div>
                </div>
            </div>
    </main>
    );
}

export default Workshop;
