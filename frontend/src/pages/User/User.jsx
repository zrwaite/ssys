import React, {useState} from "react";
import "./User.css";
import UserInfo from "../../components/UserInfo";
import ConferenceInfo from "../../components/ConferenceInfo";
import NotificationPanel from "../../components/NotificationPanel";
import WorkshopChoices from "../../components/WorkshopChoices";

import {getCookie} from "../../modules/cookies";
import {Navigate} from "react-router-dom";
import {httpReq, baseURL} from "../../modules/http_requests";
import SettingsPanel from "../../components/SettingsPanel";
import AccountIcon from "../../images/account.svg";

// import ReactDOM from "react-dom";

const getImageLink = (imageLink) => {
    return baseURL + "/images/" + imageLink;
}

const User = () => {
    const [dataPulled, setDataPulled] = useState(false);
    const [userData, setUserData] = useState({
        email: getCookie("email"),
        studentInfo: (getCookie("user_type") === "student" || getCookie("user_type") === "individual"),
        fname: "",
        lname: "",
        image_link: "",
        image_approved: false,
        account_enabled: true,
        school: "",
        city: "",
        grade: "",
        instagram: "",
        bio: "",
        diet: "",
        emergency_contact: "",
        additional_info: "",
        public: "",
        password_set: "",
        email_confirmed: "",
        workshop_choices: ""
    });
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {...userData};
        partialState[name] = value;
        setUserData(partialState);
    }

    const changeWorkshopChoices = (newChoices) => {
        setUserData({...userData, workshop_choices: newChoices});
    }

    const getUserData = async () => {
        let json = await httpReq("/api/user/?email=" + getCookie("email"), "GET")
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            setUserData({
                ...userData,
                email: getCookie("email"),
                fname: response.objects.fname,
                lname: response.objects.lname,
                image_approved: response.objects.image_approved,
                account_enabled: response.objects.account_enabled,
                school: response.objects.school,
                city: response.objects.city,
                grade: response.objects.grade,
                instagram: response.objects.instagram,
                bio: response.objects.bio,
                diet: response.objects.diet,
                emergency_contact: response.objects.emergency_contact,
                additional_info: response.objects.additional_info,
                image_link: response.objects.image_link ? getImageLink(response.objects.image_link) : AccountIcon,
                public: response.objects.public,
                password_set: response.objects.password_set,
                email_confirmed: response.objects.email_confirmed,
                workshop_choices: response.objects.workshop_choices
            })
        } else if (response.errors.length > 0) {
            alert(response.errors)
        }
        setDataPulled(true);
    }
    if (!dataPulled) getUserData();
    if (!(getCookie("email") && getCookie("token") && getCookie("user_type"))) return <Navigate to='/account'/>;

    return (
        <main>
            <header className={"userHeader"}>
                <div className="horizontal">
                    <img className={"userImage"} src={userData.image_link} alt={userData.image_link}/>
                    <h2>{userData.fname} {userData.lname}</h2>
                </div>
                <div className={"horizontal"}>
                    <SettingsPanel {...userData} parentHandleInputChange={handleInputChange}/>
                    <NotificationPanel {...userData} parentHandleInputChange={handleInputChange}/>
                </div>
            </header>
            <section className={"userBody"}>
                <div className={"informationColumn"}>
                    <UserInfo {...userData} parentHandleInputChange={handleInputChange}/>
                    <ConferenceInfo {...userData} parentHandleInputChange={handleInputChange}/>
                </div>
                <WorkshopChoices {...userData} parentChangeWorkshopChoices={changeWorkshopChoices}/>
            </section>
        </main>
    );
}

export default User;