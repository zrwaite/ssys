import React from "react";
import "./Info.css";
import lakehead from "../../components/lakehead.png";
import BradDibble from "../../components/BradDibble.jpg";
import AllieRougeot from "../../components/AllieRougeot.jpg";
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
                    <p>To enable youth-led climate action across Simcoe County. With each student taking part in 3 workshops of their choice, 1 collective workshop, and listening to 2 amazing keynote speakers, it will be a day they will never forget. </p>
                </div>
            </div>
            <div className="infoKeynote">
                <h1>OUR KEYNOTE SPEAKERS</h1>
                <div className="infoKeynoteBlurb">
                    <p>Below are our 2 fabulous keynote speakers!</p>
                </div>
            </div>
            <div className="infoDibble">
                <h1>Dr. Brad Dibble</h1>
                <div className="infoDibbleGrid">
                    <div className="infoDibbleImageBox">
                         <img className = "infoDibbleImage" src={BradDibble} alt="Dr. Brad Dibble" />
                    </div>
                    <div className="infoDibbleBlurb">
                        <details>
                        <summary>Dr. Brad Dibble</summary>
                        <p>Dr. Brad Dibble was appointed by the federal Minister of the Environment as one of 25 members to the Sustainable Development Advisory Council, a membership he still maintains. A Mentor for Climate Reality Canada, he has received training with Al Gore and endorsements from Col. Chris Hadfield for his work.  He has also written the award-winning book, Comprehending the Climate Crisis: Everything you need to know about Global Warming and how to stop it (2012).  
                            <br/><br/> His opening keynote address will provide summit participants with all the background information they need to understand the science behind the climate crisis, and what changes need to be made to stop the damage before it is too late. 
                        </p>
                        </details>
                    </div>
                </div>
            </div>
            <div className="infoAllie">
                <h1>Aliénor (Allie) Rougeot</h1>
                <div className="infoAllieGrid">
                    <div className="infoAllieImageBox">
                         <img className = "infoAllieImage" src={AllieRougeot} alt="Aliénor (Allie) Rougeot" />
                    </div>
                    <div className="infoAllieBlurb">
                        <details>
                        <summary>Allie Rougeot</summary>
                        <p>Allie Rougeot is an Economics and Public Policy student at the University of Toronto. She has been an environmental and human rights activist since the age of 10, and has, since high school, been passionate about sustainability and climate justice. Since January 2019 she has been the lead coordinator of the Fridays for Future movement in Toronto. She has been recognized for her work by the Canadian Voice of Women for peace with the Kim Phuc Youth Award, and has appeared several times in the Toronto Star, on Metro Morning, CTV, Global News, Radio Canada, National Observer and other media.
                            <br/><br/>Her closing keynote address will focus on her experiences as a youth organizer, activist and changemaker. She is here to inspire and empower summit participants to take what they learned throughout the day and use it to create real change in their communities, and fight for the future in which they want to live!
                        </p>
                        </details>
                    </div>
                </div>
            </div>
            <div className="infoBring">
                <h1>What to bring?</h1>
                <div className="infoBringBlurb">
                    <p>As per Lakehead University, masks are mandatory so please bring a mask! Lunch is provided by Lakehead University. Any dietary restrictions must be communicated through schools or through the account page on the website. We will try our best to accommodate your request. Our complimentary “Swag bags” will include a pen, notebook, a drawstring bag, and a reusable water bottle. Snacks will also be included in the bags. Please leave valuables at home and only bring what you absolutely need. There will be separate places for schools/groups to put their things if needed. </p>
                </div>
            </div>
        </main>
    );
} 

export default Info;

