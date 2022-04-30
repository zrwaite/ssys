import React from "react";
import "./Workshop.css";
import Trish from "../../components/Trish.jpg";
import Jen from "../../components/Jen.png";
import Laura from "../../components/Laura.jpeg";
import Margaret from "../../components/Margaret.jpg";
import Sami from "../../components/Sami.jpg";
import Sara from "../../components/Sara.png";

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
]

function Workshop() {
    return(
    <main>
        <div className="workshopTop">
            <h1>WORKSHOPS</h1>
            <div className="workshopBlurb">
                <p>Below are our 10 wonderful workshops!</p>
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
