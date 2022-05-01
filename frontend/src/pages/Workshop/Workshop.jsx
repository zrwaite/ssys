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
import Ellen from "../../components/Ellen.jpg";
import Bolu from "../../components/Bolu.jpg";
import {Link} from "react-router-dom";

const workshopsData = [
    {
        name: "Elder Trish Monague",
        imageSrc: Trish,
        title: "Workshop:  “The Three Sisters and Sustainability”",
        summary: "Trish Monague (“Cedar Woman”) is from Beausoleil First Nation...",
        description: " Trish Monague (“Cedar Woman”) is from Beausoleil First Nation, and she began her relationship with the spirit at the age of three and uses her gift as a cultural teacher and traditional healer. She has been clean and sober and walking the Anishnawbe Miikan for 30 years. Currently, she is the Heritage and Cultural Coordinator for Beausoleil First Nation and she shares her time, wisdom, and teachings with the Lakehead Orillia community as a traditional healer, Elder-in-residence, and a member of the Lakehead University Elders Council. In Elder Trish’s workshop, students will explore indigenious teachings and understand the connection between indigenious peoples and mother nature. Students will then form connections between climate activism and indigenious teachings, and see the great value indigenious voices and teachings continue to have throughout the climate movement. Depending on the weather conditions, a three sisters ceremony may also be performed!"
    },
    {
        name: "Jen Ball",
        imageSrc: Jen,
        summary: "In this active and engaging workshop, participants will be split into eight global delegations and will work together...",
        title: "Workshop:  There's No Silver Bullet, Only Silver Buckshot: The En-ROADS Climate Action Summit Simulation ",
        description: "In this active and engaging workshop, participants will be split into eight global delegations and will work together to map a course to 1.5 degree Celsius. Students will focus on the many solutions it takes to get where we need to go, and they will discuss equity considerations and co-benefits associated with each and every climate action. They will work with the En-ROADS Interactive Climate Model, an interface created by MIT and Climate Interactive. Come prepared to participate, contribute, and have fun! Jen Ball is a Professor of Sustainability at Humber College and author of The Stacked Deck: An Introduction to Social Inequality (Oxford University Press, 2020)."
    },
    {
        name: "Laura Baldwick",
        imageSrc: Laura,
        summary: "Laura Baldwick, Project Coordinator at Parks Canada's Georgian Bay Islands National Park...",
        title: "Workshop: “Climate Change and Nature-based Solutions”",
        description: "Laura Baldwick, Project Coordinator at Parks Canada's Georgian Bay Islands National Park, works to restore ecological integrity through the removal of invasive alien species. Laura works to protect, preserve and restore protected areas. Parks Canada maintains biodiversity and keeps ecosystems strong. Strong, diverse ecosystems are resilient—that is, better able to cope with the impacts of climate change. A healthy forest with many tree species, for example, can recover better from insect pests. Parks Canada is committed to providing youth with an understanding of the importance of conserving 30% of Canada’s land and water by 2030. Join Laura in this workshop to learn how protected areas serve as natural solutions to climate change, and how humans and nature can work together to naturally heal the earth from the effects of climate change."
    },
    {
        name: "Margaret Prophet",
        imageSrc: Margaret,
        title: "Workshop: “Is your community a climate action leader or a climate action imposter?”",
        summary: "Margaret Prophet has a Bachelor of Education, specialized in Adult Education, and a BA in Psychology from Brock University...",
        description: "Margaret Prophet has a Bachelor of Education, specialized in Adult Education, and a BA in Psychology from Brock University. Her passion for the environment and love of community led her to volunteer for her local ratepayers association. This led to her getting involved with complex land-use planning matters and municipal politics. With that knowledge, she eventually helped create the Simcoe County Greenbelt Coalition, a group with 15 like-minded member groups committed to protecting and preserving natural greenspaces, and growing protected areas (like the Greenbelt) in Ontario. She believes strongly in creating communities where youth can thrive, without the mental and physical effects of sprawled out communities where essential services and community connection is inaccessible.",
    },
    {
        name: "Sami Pritchard",
        imageSrc: Sami,
        title: "Workshop: “Lobbying Youth for Change”",
        summary: "Sami Pritchard is a passionate and experienced Community Organizer and Team Leader dedicated to creating...",
        description: "Sami Pritchard is a passionate and experienced Community Organizer and Team Leader dedicated to creating communities where people, particularly youth, feel a sense of belonging.  She seeks to empower students and youth to see their potential, develop leadership skills and build cultures of care. Her experience working with a variety of organizations -including CanMediate International, the Canadian Federation of Students, and Lakehead University Student Union - has provided her with a strong understanding of organizational structures, allowing her to provide thoughtful and strategic solutions and plans for those seeking to work together to create change. In this workshop, Sami will speak on the ins and outs of using organizing and campaigning as a tool within climate activism, and how young people can fight for climate action within their communities while also creating communities that foster connections and a sense of belonging.",
    },
    {
        name: "Sara Layton",
        imageSrc: Sara,
        title: "Workshop: “Honouring and Working with Complex Climate Emotions in the Classroom”",
        summary: "Sara Layton is a certified teacher (OCT) and graduate student in the Masters of Education program...",
        description: "Sara Layton is a certified teacher (OCT) and graduate student in the Masters of Education program, specializations in Education for Change: Environmental and Sustainability Education at Lakehead University. As part of her GA position, Sara is managing the existential toolkit for climate justice educators, an international network of scholars focused on addressing climate anxiety through sharing research and teaching resources. This workshop will draw on best practice to offer tools for young people to process their climate anxiety and the complex emotions that come with learning about and fighting for climate action It will teach students how to continue to fight for change while prioritizing and protecting their mental health, so they continue to fight for change for years to come.",
    },
    {
        name: "Dr. Brad Dibble",
        imageSrc: BradDibble,
        title: "Workshop: “Comprehending the Climate Crisis”shop: “Responsive Education”",
        summary: "In this workshop, Dr. Brad Dibble explores the climate crisis and how it affects human health...",
        description: "In this workshop, Dr. Brad Dibble explores the climate crisis and how it affects human health. This engaging workshop dives into the science behind climate, specifically the physiological effects of climate change, and how humanity will need to change in order to fight the health impacts caused by climate change.",
    },
    {
        name: "Boluwatife Ogunniyi",
        imageSrc: Bolu,
        title: "Workshop: “Power of Youth: Leading a Youth Climate Group”",
        summary: "filler",
        description: "Filler",
    },
    {
        name: "Youth Climate Lab",
        imageSrc: YCL,
        title: "Workshop: “Responsive Education”",
        summary: "filler",
        description: "Filler",
    },
]

function Workshop() {
    return(
    <main>
        <div className="workshopTop">
            <h1>WORKSHOPS</h1>
            <div className="workshopBlurb">
                <p>Below are our wonderful workshops and their facilitators! There's even one for the teachers (just click the button below)!</p>
            </div>
            <div className="workshopTopButtonBox">
                    <a href='#teacherWorkshop'>
                        <button className="workshopTopButton">Teacher Workshop</button>   
                    </a>
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
                    <p>{workshop.title}</p><br/><br/>
                    <details>
                    <summary>{workshop.summary}</summary>
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
                    <p>{workshop.title}</p><br/><br/>
                    <details>
                    <summary>{workshop.summary}</summary>
                    <p>{workshop.description}</p>
                    </details>
                </div>
            </div>
        </div>)
    }
    })
}
    <div className="workshopBlue" id="teacherWorkshop">
        <h1>Dr. Ellen Field and Bonnie Anderson</h1>
        <div className="workshopGrid">
            <div className="workshopImageBox">
                <img className="workshopImage" src={Ellen} alt="Dr. Ellen Field and Bonnie Anderson"></img>
            </div>
            <div className="workshopBlurb">
                <p>Parallel Professional Development Workshop for Teachers - Integrating Climate Change into Your Teaching</p><br/><br/>
                <details>
                <summary>Ellen Field is an Assistant Professor in the Faculty of Education at Lakehead University...</summary>
                <p>Ellen Field is an Assistant Professor in the Faculty of Education at Lakehead University. Her research interests are in policy and practice of climate change education in the Canadian K-12 system. Dr. Field has a strong background in survey development and implementation, educational tool development and stakeholder engagement. She is engaged with Ministries, school boards, teachers and community members, and co-leads an online community on Climate Change Education in Canada. Ellen teaches Environmental Education (B.Ed) and Climate Change Education (M.Ed) in the Faculty of Education, and has engaged 800 teachers in professional development workshops in the last several years. Ellen is an Associate Editor of the Canadian Journal of Environmental Education and co-chair of the Canadian Regional Hub of Monitoring and Evaluation of Climate Change Education (MECCE). Bonnie Anderson is the Outdoor Environmental Education and Healthy Active Living Coordinator for the Simcoe County District School Board. She has extensive experience in leadership in environmental education programs and has worked in Peel, Toronto, Bark Lake Leadership Centre, and Kawartha Pine Ridge District School Boards in coordinating positions.</p>
                </details>
            </div>
        </div>
    </div>
    </main>
    );
}

export default Workshop;
