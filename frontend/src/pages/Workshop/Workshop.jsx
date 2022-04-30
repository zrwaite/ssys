import React from "react";
import "./Workshop.css";
import Trish from "../../components/Trish.jpg";
import Jen from "../../components/Jen.png";
import Laura from "../../components/Laura.jpeg";
import Margaret from "../../components/Margaret.jpg";
import Sami from "../../components/Sami.jpg";
import Sara from "../../components/Sara.png";
import YCL from "../../components/YCL.jpg";
import BradDibble from "../../components/BradDibble.jpg";

const workshopsData = [
    {
        name: "Elder Trish Monague",
        imageSrc: Trish,
        title: "Workshop:  “The Three Sisters and Sustainability”",
        description: " Trish Monague (“Cedar Woman”) is from Beausoleil First Nation, and she began her relationship with the spirit at the age of three and uses her gift as a cultural teacher and traditional healer. She has been clean and sober and walking the Anishnawbe Miikan for 30 years. Currently, she is the Heritage and Cultural Coordinator for Beausoleil First Nation and she shares her time, wisdom, and teachings with the Lakehead Orillia community as a traditional healer, Elder-in-residence, and a member of the Lakehead University Elders Council."
    },
    {
        name: "Jen Ball",
        imageSrc: Jen,
        title: "Workshop:  There's No Silver Bullet, Only Silver Buckshot: The En-ROADS Climate Action Summit Simulation ",
        description: "In this active and engaging workshop, participants will be split into eight global delegations and will work together to map a course to 1.5 degree Celsius. We'll focus on the many solutions it takes to get where we need to go, and we'll discuss equity considerations and co-benefits associated with each and every climate action. We'll work with the En-ROADS Interactive Climate Model, an interface created by MIT and Climate Interactive. Come prepared to participate, contribute, and have fun!"
    },
    {
        name: "Laura Baldwick",
        imageSrc: Laura,
        title: "Workshop: “Climate Change and Nature-based Solutions”",
        description: "Laura Baldwick, Project Coordinator at Parks Canada’s Georgian Bay Islands National Park, works to restore ecological integrity through the removal of invasive alien species. Laura works to protect, preserve and restore protected areas. Parks Canada maintains biodiversity and keeps ecosystems strong. Strong, diverse ecosystems are resilient—that is, better able to cope with the impacts of climate change. A healthy forest with many tree species, for example, can recover better from insect pests. Parks Canada is committed to providing youth with an understanding of the importance of conserving 30% of Canada’s land and water by 2030. Join Laura to learn how protected areas serve as natural solutions to climate change."
    },
    {
        name: "Margaret Prophet",
        imageSrc: Margaret,
        title: "Workshop: “Complete Communities”",
        description: "Margaret Prophet has a Bachelor of Education, specialized in Adult Education, and a BA in Psychology from Brock University. Her passion for the environment and love of community led her to volunteer for her local ratepayers association. This led to her getting involved with complex land-use planning matters and municipal politics. With that knowledge, she eventually helped create the Simcoe County Greenbelt Coalition, a group with 15 like-minded member groups committed to protecting and preserving natural greenspaces, and growing protected areas (like the Greenbelt) in Ontario. She believes strongly in creating communities where youth can thrive, without the mental and physical effects of sprawled out communities where essential services and community connection is inaccessible.",
    },
    {
        name: "Sami Pritchard",
        imageSrc: Sami,
        title: "Workshop: “Lobbying Youth for Change”",
        description: "Sami Pritchard is a passionate and experienced Community Organizer and Team Leader dedicated to creating communities where people, particularly youth, feel a sense of belonging.  She seeks to empower students and youth to see their potential, develop leadership skills and build cultures of care. Her experience working with a variety of organizations -including CanMediate International, the Canadian Federation of Students, and Lakehead University Student Union - has provided her with a strong understanding of organizational structures, allowing her to provide thoughtful and strategic solutions and plans for those seeking to work together to create change.",
    },
    {
        name: "Sara Layton and Olivia Hunter",
        imageSrc: Sara,
        title: "Workshop: “Mental Health: Managing Climate Anxiety and Burnout alongside Environmental Action”",
        description: "Sara Layton and Olivia Hunter are both certified teachers (OCT) and graduate students in the Masters of Education program, specializations in Education for Change: Environmental and Sustainability Education at Lakehead University. As part of their GA positions, Sara and Olivia are managing the existential toolkit for climate justice educators, an international network of scholars focused on addressing climate anxiety through sharing research and teaching resources. This workshop will draw on best practice to offer tools for young people to process their climate anxiety.",
    },
    {
        name: "Dr. Brad Dibble",
        imageSrc: BradDibble,
        title: "Workshop: “Comprehending the Climate Crisis”shop: “Responsive Education”",
        description: "Filler",
    },
    {
        name: "Youth Climate Lab",
        imageSrc: YCL,
        title: "Workshop: “Responsive Education”",
        description: "Filler",
    },
]

function Workshop() {
    return(
    <main>
        <div className="workshopTop">
            <h1>WORKSHOPS</h1>
            <div className="workshopBlurb">
                <p>Below are our wonderful workshops and their facilitators!</p>
            </div>
        </div>
{
    workshopsData.map((workshop, i) => {
        if(i%2==0){
        return (<div key={i} className="workshopGreen">
            <h1>{workshop.name}</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className="workshopImage" src={workshop.imageSrc} alt={workshop.name}/>
                </div>
                <div className="workshopBlurb">
                    <details>
                    <summary><p>{workshop.title}</p></summary><br/><br/>
                    <p>{workshop.description}</p>
                    </details>
                </div>
            </div>
        </div>)
    }
    else{
        return (<div key={i} className="workshopBlue">
            <h1>{workshop.name}</h1>
            <div className="workshopGrid">
                <div className="workshopImageBox">
                    <img className="workshopImage" src={workshop.imageSrc} alt={workshop.name}/>
                </div>
                <div className="workshopBlurb">
                    <details>
                    <summary><p>{workshop.title}</p></summary><br/><br/>
                    <p>{workshop.description}</p>
                    </details>
                </div>
            </div>
        </div>)
    }
    })
}
    </main>
    );
}

export default Workshop;
