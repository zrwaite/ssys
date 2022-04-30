import React from "react";
import {Link} from "react-router-dom";
import "./Workshop.css";
import Trish from "../../components/Trish.jpg";
import Jen from "../../components/Jen.png";
import Laura from "../../components/Laura.jpeg";
import Margaret from "../../components/Margaret.jpg";
import Sami from "../../components/Sami.jpg";
import Sara from "../../components/Sara.png";
import YCL from "../../components/YCL.jpg";
import Ellen from "../../components/Ellen.jpg";
import BradDibble from "../../components/BradDibble.jpg";

function Workshop() {
    return(
    <main>
        <div className="workshopTop">
            <h1>WORKSHOPS</h1>
            <div className="workshopBlurb">
                <p>Below are our wonderful workshops and their facilitators (teachers, go down to the bottom - there's even one for you)!</p>
            </div>
        </div>
        <div className="workshopGreen">
            <h1>Elder Trish Monague</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Trish} alt="Elder Trish Monague" />
                </div>
                <div className="workshopBlurb">
                    <p>
                        Workshop:  “The Three Sisters and Sustainability” <br/><br/>
                        Trish Monague (“Cedar Woman”) is from Beausoleil First Nation, and she began her relationship with the spirit at the age of three and uses her gift as a cultural teacher and traditional healer. She has been clean and sober and walking the Anishnawbe Miikan for 30 years. Currently, she is the Heritage and Cultural Coordinator for Beausoleil First Nation and she shares her time, wisdom, and teachings with the Lakehead Orillia community as a traditional healer, Elder-in-residence, and a member of the Lakehead University Elders Council.
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopBlue">
            <h1>Jen Ball</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Jen} alt="Jen Ball" />
                </div>
                <div className="workshopBlurb">
                    <p>
                        Workshop:  There's No Silver Bullet, Only Silver Buckshot: The En-ROADS Climate Action Summit Simulation <br/><br/>
                        In this active and engaging workshop, participants will be split into eight global delegations and will work together to map a course to 1.5 degree Celsius. 
We'll focus on the many solutions it takes to get where we need to go, and we'll discuss equity considerations and co-benefits associated with each and every climate action. We'll work with the En-ROADS Interactive Climate Model, an interface created by MIT and Climate Interactive. Come prepared to participate, contribute, and have fun! 
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopGreen">
            <h1>Laura Baldwick</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Laura} alt="Laura Baldwick" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Workshop: “Climate Change and Nature-based Solutions” <br/><br/>
                    Laura Baldwick, Project Coordinator at Parks Canada's Georgian Bay Islands National Park, works to restore ecological integrity through the removal of invasive alien species. Laura works to protect, preserve and restore protected areas. Parks Canada maintains biodiversity and keeps ecosystems strong. Strong, diverse ecosystems are resilient—that is, better able to cope with the impacts of climate change. A healthy forest with many tree species, for example, can recover better from insect pests. Parks Canada is committed to providing youth with an understanding of the importance of conserving 30% of Canada’s land and water by 2030. Join Laura to learn how protected areas serve as natural solutions to climate change.
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopBlue">
            <h1>Margaret Prophet</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Margaret} alt="Margaret Prophet" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Workshop: “Complete Communities” <br/><br/>
                    Margaret Prophet has a Bachelor of Education, specialized in Adult Education, and a BA in Psychology from Brock University. Her passion for the environment and love of community led her to volunteer for her local ratepayers association. This led to her getting involved with complex land-use planning matters and municipal politics. With that knowledge, she eventually helped create the Simcoe County Greenbelt Coalition, a group with 15 like-minded member groups committed to protecting and preserving natural greenspaces, and growing protected areas (like the Greenbelt) in Ontario. She believes strongly in creating communities where youth can thrive, without the mental and physical effects of sprawled out communities where essential services and community connection is inaccessible.
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopGreen">
            <h1>Sami Pritchard</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Sami} alt="Sami Pritchard" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Workshop: “Lobbying Youth for Change” <br/><br/>
                    Sami Pritchard is a passionate and experienced Community Organizer and Team Leader dedicated to creating communities where people, particularly youth, feel a sense of belonging.  She seeks to empower students and youth to see their potential, develop leadership skills and build cultures of care. Her experience working with a variety of organizations -including CanMediate International, the Canadian Federation of Students, and Lakehead University Student Union - has provided her with a strong understanding of organizational structures, allowing her to provide thoughtful and strategic solutions and plans for those seeking to work together to create change.
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopBlue">
            <h1>Sara Layton and Olivia Hunter</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Sara} alt="Sara Layton and Olivia Hunter" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Workshop: “Mental Health: Managing Climate Anxiety and Burnout alongside Environmental Action” <br/><br/>
                    Sara Layton and Olivia Hunter are both certified teachers (OCT) and graduate students in the Masters of Education program, specializations in Education for Change: Environmental and Sustainability Education at Lakehead University. As part of their GA positions, Sara and Olivia are managing the existential toolkit for climate justice educators, an international network of scholars focused on addressing climate anxiety through sharing research and teaching resources. This workshop will draw on best practice to offer tools for young people to process their climate anxiety.
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopGreen">
            <h1>Youth Climate Lab</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={YCL} alt="Youth Climate Lab" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Workshop: “Responsive Education” <br/><br/>
                    blah blah blah
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopBlue">
            <h1>Dr. Brad Dibble</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={BradDibble} alt="Dr. Ellen Field and bonnie Anderson" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Workshop: “Comprehending the Climate Crisis”<br/><br/>
                    </p>
                </div>
            </div>
        </div>
        <div className="workshopGreen">
            <h1>Dr. Ellen Field and Bonnie Anderson</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className = "workshopImage" src={Ellen} alt="Dr. Ellen Field and bonnie Anderson" />
                </div>
                <div className="workshopBlurb">
                    <p>
                    Parallel Professional Development Workshop for Teachers - Integrating Climate Change into Your Teaching <br/><br/>
                    Ellen Field is an Assistant Professor in the Faculty of Education at Lakehead University. Her research interests are in policy and practice of climate change education in the Canadian K-12 system. Dr. Field has a strong background in survey development and implementation, educational tool development and stakeholder engagement. She is engaged with Ministries, school boards, teachers and community members, and co-leads an online community on Climate Change Education in Canada.
Ellen teaches Environmental Education (B.Ed) and Climate Change Education (M.Ed) in the Faculty of Education, and has engaged 800 teachers in professional development workshops in the last several years. Ellen is an Associate Editor of the Canadian Journal of Environmental Education and co-chair of the Canadian Regional Hub of Monitoring and Evaluation of Climate Change Education (MECCE).
Bonnie Anderson is the Outdoor Environmental Education and Healthy Active Living Coordinator for the Simcoe County District School Board. She has extensive experience in leadership in environmental education programs and has worked in Peel, Toronto, Bark Lake Leadership Centre, and Kawartha Pine Ridge District School Boards in coordinating positions.
                    </p>
                </div>
            </div>
        </div>
    </main>
    );
}

export default Workshop;
