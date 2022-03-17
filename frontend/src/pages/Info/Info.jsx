import React from "react";
import "./Info.css";
import diannesaxe from "../../components/diannesaxe.jpg";
import {Link} from "react-router-dom";

function Info() {
    return (
        <main>
            <div class="infoLayout">
                <div class="singular">
                    <h1 class="leading">What is the Sustainable Simcoe Youth Summit?</h1>
                    <h3 class="oneofakind">The Sustainable Simcoe Youth Summit(SSYS) is by youth, for youth and it's centered around bringing together like minded environmentally conscious youth from all across Simcoe County<br/></h3>
                </div>
                <div class="split">
                    <div class="half">
                        <h2>Featured Speakers</h2>
                        <p>We will have 2 featured speakers to start off and to end the day. They will be acclaimed climate lawyer Dianne Saxe, and another person that will be determined</p>
                        <img class="images" src={diannesaxe} />
                        <p>Make a new component for Dianne Saxe the featured speaker and insert a link here</p>
                    </div>
                    <div class="half">
                        <h2 class="topalign">Workshops</h2>
                        <ul>
                            <li>First Workshop</li>
                            <li>Second Workshop</li>
                            <li>Third Workshop</li>
                            <li>Fourth Workshop</li>
                            <li>Fifth Workshop</li>
                            <li>Sixth Workshop</li>
                            <li>Seventh Workshop</li>
                            <li>Eighth Workshop</li>
                            <li>Ninth Workshop</li>
                            <li>Tenth Workshop</li>
                        </ul>
                    </div>
                </div>
                <div class="singular">
                    <h2 class="leading">What will the day look like for you?</h2>
                    <p>9:00AM: Introductory Speaker</p>
                    <p>10:00AM - 12:00AM: Workshops</p>
                    <p>12:00AM - 1:00PM: Lunch</p>
                    <p>1:00AM - 2:00PM: Workshop</p>
                    <p>2:00PM - 3:00PM: Youth Climate Lab Workshop</p>
                    <p>3:00PM - 4:00PM: Final Speaker - make this look nicer or something</p>
                </div>
                <div class="split">
                    <div class="half">
                        <h2>When?</h2>
                        <h1>69:69:69:69</h1>
                        <h2>Until The Summit</h2>
                        <h3>May 10th</h3>
                    </div>
                    <div class="half">
                        <h2>Where?</h2>
                        <p>Have some type of Map API or somethign just showing where LakeHead is and stuff</p>
                    </div>
                </div>
                <div class="singular">
                    <h2 class="leading">Meet the Team!</h2>
                    <img class="images" src={diannesaxe}/>
                    <p>This is just a placeholder image for now</p>
                </div>
                <div class="singular">
                    <h2 class="leading">More Questions?</h2>
                    <Link to="/contact" className="butt">
                        <span className="butttext">Click Here</span>
                        <br/>
                    </Link>
                </div>
            </div>
        </main>
    );
} 

export default Info;
