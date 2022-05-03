import Trish from "../images/Trish.jpg";
import Jen from "../images/Jen.png";
import Laura from "../images/Laura.jpeg";
import Margaret from "../images/Margaret.jpg";
import Sami from "../images/Sami.jpg";
import Sara from "../images/Sara.png";
import BradDibble from "../images/BradDibble.jpg";
import Bolu from "../images/Bolu.jpg";
import Alyvia from "../images/Alyvia.png";
import YCL from "../images/YCL.jpg";

const workshopsData = [
    {
        name: "Elder Trish Monague",
        code: "a",
        imageSrc: Trish,
        title: "Workshop:  “The Three Sisters and Sustainability”",
        summary: "Trish Monague (“Cedar Woman”) is from Beausoleil First Nation...",
        description: " Trish Monague (“Cedar Woman”) is from Beausoleil First Nation, and she began her relationship with the spirit at the age of three and uses her gift as a cultural teacher and traditional healer. She has been clean and sober and walking the Anishnawbe Miikan for 30 years. Currently, she is the Heritage and Cultural Coordinator for Beausoleil First Nation and she shares her time, wisdom, and teachings with the Lakehead Orillia community as a traditional healer, Elder-in-residence, and a member of the Lakehead University Elders Council. In Elder Trish’s workshop, students will explore indigenious teachings and understand the connection between indigenious peoples and mother nature. Students will then form connections between climate activism and indigenious teachings, and see the great value indigenious voices and teachings continue to have throughout the climate movement. Depending on the weather conditions, a three sisters ceremony may also be performed!"
    },
    {
        name: "Jen Ball",
        code: "b",
        imageSrc: Jen,
        summary: "In this active and engaging workshop, participants will be split into eight global delegations and will work together...",
        title: "Workshop:  There's No Silver Bullet, Only Silver Buckshot: The En-ROADS Climate Action Summit Simulation ",
        description: "In this active and engaging workshop, participants will be split into eight global delegations and will work together to map a course to 1.5 degree Celsius. Students will focus on the many solutions it takes to get where we need to go, and they will discuss equity considerations and co-benefits associated with each and every climate action. They will work with the En-ROADS Interactive Climate Model, an interface created by MIT and Climate Interactive. Come prepared to participate, contribute, and have fun! Jen Ball is a Professor of Sustainability at Humber College and author of The Stacked Deck: An Introduction to Social Inequality (Oxford University Press, 2020)."
    },
    {
        name: "Laura Baldwick",
        code: "c",
        imageSrc: Laura,
        summary: "Laura Baldwick, Project Coordinator at Parks Canada's Georgian Bay Islands National Park...",
        title: "Workshop: “Climate Change and Nature-based Solutions”",
        description: "Laura Baldwick, Project Coordinator at Parks Canada's Georgian Bay Islands National Park, works to restore ecological integrity through the removal of invasive alien species. Laura works to protect, preserve and restore protected areas. Parks Canada maintains biodiversity and keeps ecosystems strong. Strong, diverse ecosystems are resilient—that is, better able to cope with the impacts of climate change. A healthy forest with many tree species, for example, can recover better from insect pests. Parks Canada is committed to providing youth with an understanding of the importance of conserving 30% of Canada’s land and water by 2030. Join Laura in this workshop to learn how protected areas serve as natural solutions to climate change, and how humans and nature can work together to naturally heal the earth from the effects of climate change."
    },
    {
        name: "Margaret Prophet",
        code: "d",
        imageSrc: Margaret,
        title: "Workshop: “Is your community a climate action leader or a climate action imposter?”",
        summary: "Margaret Prophet has a Bachelor of Education, specialized in Adult Education, and a BA in Psychology from Brock University...",
        description: "Margaret Prophet has a Bachelor of Education, specialized in Adult Education, and a BA in Psychology from Brock University. Her passion for the environment and love of community led her to volunteer for her local ratepayers association. This led to her getting involved with complex land-use planning matters and municipal politics. With that knowledge, she eventually helped create the Simcoe County Greenbelt Coalition, a group with 15 like-minded member groups committed to protecting and preserving natural greenspaces, and growing protected areas (like the Greenbelt) in Ontario. She believes strongly in creating communities where youth can thrive, without the mental and physical effects of sprawled out communities where essential services and community connection is inaccessible.",
    },
    {
        name: "Sami Pritchard",
        code: "e",
        imageSrc: Sami,
        title: "Workshop: “Lobbying Youth for Change”",
        summary: "Sami Pritchard is a passionate and experienced Community Organizer and Team Leader dedicated to creating...",
        description: "Sami Pritchard is a passionate and experienced Community Organizer and Team Leader dedicated to creating communities where people, particularly youth, feel a sense of belonging.  She seeks to empower students and youth to see their potential, develop leadership skills and build cultures of care. Her experience working with a variety of organizations -including CanMediate International, the Canadian Federation of Students, and Lakehead University Student Union - has provided her with a strong understanding of organizational structures, allowing her to provide thoughtful and strategic solutions and plans for those seeking to work together to create change. In this workshop, Sami will speak on the ins and outs of using organizing and campaigning as a tool within climate activism, and how young people can fight for climate action within their communities while also creating communities that foster connections and a sense of belonging.",
    },
    {
        name: "Sara Layton",
        code: "f",
        imageSrc: Sara,
        title: "Workshop: “Honouring and Working with Complex Climate Emotions in the Classroom”",
        summary: "Sara Layton is a certified teacher (OCT) and graduate student in the Masters of Education program...",
        description: "Sara Layton is a certified teacher (OCT) and graduate student in the Masters of Education program, specializations in Education for Change: Environmental and Sustainability Education at Lakehead University. As part of her GA position, Sara is managing the existential toolkit for climate justice educators, an international network of scholars focused on addressing climate anxiety through sharing research and teaching resources. This workshop will draw on best practice to offer tools for young people to process their climate anxiety and the complex emotions that come with learning about and fighting for climate action It will teach students how to continue to fight for change while prioritizing and protecting their mental health, so they continue to fight for change for years to come.",
    },
    {
        name: "Dr. Brad Dibble",
        code: "g",
        imageSrc: BradDibble,
        title: "Workshop: “Comprehending the Climate Crisis”shop: “Responsive Education”",
        summary: "In this workshop, Dr. Brad Dibble explores the climate crisis and how it affects human health...",
        description: "In this workshop, Dr. Brad Dibble explores the climate crisis and how it affects human health. This engaging workshop dives into the science behind climate, specifically the physiological effects of climate change, and how humanity will need to change in order to fight the health impacts caused by climate change.",
    },
    {
        name: "Boluwatife Ogunniyi",
        code: "h",
        imageSrc: Bolu,
        title: "Workshop: “Power of Youth: Grassroots Youth Environmental Action”",
        summary: "Bolu Ogunniyi is a student at the University of Toronto, hoping to pursue a double major in Global Health and Bioethics...",
        description: "Bolu Ogunniyi is a student at the University of Toronto, hoping to pursue a double major in Global Health and Bioethics. She is also the creator and former president of the Simcoe County Environmental Youth Alliance (SCEYA). She has much experience in advocacy and youth organizing and is passionate about building a better future for youth to come. In Bolu’s workshop she will walk students through the ins and outs of youth organizing and creating and managing youth environmentalism groups. She will show students just how possible it is to run successful initiatives as a young person in Simcoe County, and give them tips and tricks on how to accomplish these feats in their own communities. Students will then get to share their experiences within youth climate action and Bolu will share her experiences and answer questions in turn.",
    },
    {
        name: "Alyvia Sipidias",
        code: "i",
        imageSrc: Alyvia,
        title: "Workshop: “Climate Action Planning: Where to Begin”",
        summary: "Alyvia Sipidias is a certified teacher (OCT) and graduate student in the Masters of Education program...",
        description: "Alyvia Sipidias is a certified teacher (OCT) and graduate student in the Masters of Education program, specialization in Education for Change: Environmental Sustainability Education at Lakehead University. In this workshop Alyvia will provide students with an action-planning framework for students to consolidate their learning from the one day summit into an action plan for their home school. Through her graduate assistantship Alyvia is working with the Community Engagement and Lifelong Learning department. Based on her passion for environmental education, Alyvia will be assisting the Sustainable Orillia Youth Council with the day long Summit event. In this workshop, Alyvia will be teaching an introductory class to climate action planning, teaching students the simple things they need in order to get started on their climate action journey.",
    },
    {
        name: "Youth Climate Lab",
        code: "j",
        imageSrc: YCL,
        title: "Workshop: “Responsive Education”",
        summary: "The Youth Climate Lab is a youth-led organization that focuses on enabling youth to re-imagine and rebuild...",
        description: "The Youth Climate Lab is a youth-led organization that focuses on enabling youth to re-imagine and rebuild the flawed systems holding in place climate inaction, so that youth can achieve a just, climate-resilient world.  Through their pop-up climate labs, they facilitate projects that focus on driving shifts that enable youths to gain the skills to be creative leaders and radical collaborators that can build policy solutions that challenge current systems of thought and societal organization. The Youth Climate Lab has collaborated with 30+ partners around the globe to reach youth in 77 different countries. In this workshop, the Youth Climate Lab will ask students to discuss experiences with teachers and adult allies that have allowed for them to learn about and take action on climate change. Student responses along with a follow-up debrief workshop with youth organizers will inform the development of a model of the roles and processes of responsive education, that is education approaches that address the specific positionality of how youth will be adversely affected by climate impacts but currently do not have agency to control policy that will affect their future quality of life. This workshop will replace the ‘fourth’ workshop time described in the itinerary - all students will participate in their class groups. The goal of this workshop is to leave students with a tangible plan for a climate action initiative they can bring back to their home communities (school, greater community, etc.) The team at the Sustainable Orillia Youth Council found that when they attended conferences such as the summit, they would leave incredibly inspired but without a plan to turn that inspiration into action. We wish to bring and end to that, and the Youth Climate Lab workshop will ensure that students leave with the framework for a climate action initiative. ",
    },
];

export {workshopsData}