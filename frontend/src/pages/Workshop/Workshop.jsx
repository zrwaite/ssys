import React from "react";
import "./Workshop.css";
import {workshopsData} from "../../modules/workshops";
import Ellen from "../../images/Ellen.jpg";

function Workshop() {
    return (
        <main>
            <div className="workshopTop">
                <h1>WORKSHOPS</h1>
                <div className="workshopBlurb">
                    <p>Below are our wonderful workshops and their facilitators! There's even one for the teachers (just
                        click the button below)!</p>
                </div>
                <div className="workshopTopButtonBox">
                    <a href='#teacherWorkshop'>
                        <button className="workshopTopButton">Teacher Workshop</button>
                    </a>
                </div>
            </div>
            {
                workshopsData.map((workshop, i) => {
                    if (i % 2 === 0) {
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
    <div className="workshopGreen" id="teacherWorkshop">
        <h1>Dr. Ellen Field and Bonnie Anderson</h1>
        <div className="workshopGrid">
            <div className="workshopImageBox">
                <img className="workshopImage" src={Ellen} alt="Dr. Ellen Field and Bonnie Anderson"/>
            </div>
            <div className="workshopBlurb">
                <p>Parallel Professional Development Workshop for Teachers - Integrating Climate Change into Your Teaching</p><br/><br/>
                <details>
                <summary>Ellen Field is an Assistant Professor in the Faculty of Education at Lakehead University...</summary>
                <p>Ellen Field is an Assistant Professor in the Faculty of Education at Lakehead University. Her research interests are in policy and practice of climate change education in the Canadian K-12 system. Dr. Field has a strong background in survey development and implementation, educational tool development and stakeholder engagement. She is engaged with Ministries, school boards, teachers and community members, and co-leads an online community on Climate Change Education in Canada. Ellen teaches Environmental Education (B.Ed) and Climate Change Education (M.Ed) in the Faculty of Education, and has engaged 800 teachers in professional development workshops in the last several years. Ellen is an Associate Editor of the Canadian Journal of Environmental Education and co-chair of the Canadian Regional Hub of Monitoring and Evaluation of Climate Change Education (MECCE). Bonnie Anderson is the Outdoor Environmental Education and Healthy Active Living Coordinator for the Simcoe County District School Board. She has extensive experience in leadership in environmental education programs and has worked in Peel, Toronto, Bark Lake Leadership Centre, and Kawartha Pine Ridge District School Boards in coordinating positions. While SSYS students will be partaking in multiple workshop sessions throughout the duration of the summit, a day-long parallel professional development session will be running for educators accompanying their students. The workshop is designed around professional inquiry, in which teachers will co-learn through interactive activities along three lines of inquiry: 1) climate change risks and climate solutions, 2) transformative and transgressive pedagogies and teaching strategies for 21st century climate change education, and 3) building effective understanding into climate change teaching practices. The parallel session will also help address the need to provide professional development for teachers on climate change education. In the national survey, Canada, Climate Change and Education: Opportunities for Public and Formal Education, results report that the average amount of instruction a student in grade 7 -12 year receives in a year or semester is 1 to 10 hours; that 50% of teachers indicated that professional development would help them integrate climate change education in their teaching, and fewer than half of teachers indicated that they feel they have the knowledge and skills to teach about climate change (Field, Schwartzberg, Berger, 2019). The parallel session will provide teachers with the tools needed to successfully teach their students about climate change and climate action, as well as support them in their climate action initiatives. 
                </p>
                </details>
            </div>
        </div>
    </div>
    </main>
    );
}

export default Workshop;
