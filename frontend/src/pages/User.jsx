import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/user_page.css";
import UserInfo from "../components/UserInfo";
import ConferenceInfo from "../components/ConferenceInfo";
import NotificationPanel from "../components/NotificationPanel";

import {getCookie} from "../modules/cookies";
import {Navigate} from "react-router-dom";
import {httpReq, baseURL} from "../modules/http_requests";
import SettingsPanel from "../components/SettingsPanel";
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
        video_approved: false,
        account_enabled: true,
        video_link: "",
        school: "",
        city: "",
        grade: "",
        instagram: "",
        bio: "",
        diet: "",
        shirt_size: "",
        emergency_contact: "",
        additional_info: "",
        public: "",
        password_set: "",
        email_confirmed: ""
    });
    const handleInputChange = (event) => {
        console.log("changing");
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {...userData};
        partialState[name] = value;
        setUserData(partialState);
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
                video_approved: response.objects.video_approved,
                account_enabled: response.objects.account_enabled,
                video_link: response.objects.video_link,
                school: response.objects.school,
                city: response.objects.city,
                grade: response.objects.grade,
                instagram: response.objects.instagram,
                bio: response.objects.bio,
                diet: response.objects.diet,
                shirt_size: response.objects.shirt_size,
                emergency_contact: response.objects.emergency_contact,
                additional_info: response.objects.additional_info,
                image_link: getImageLink(response.objects.image_link),
                public: response.objects.public,
                password_set: response.objects.password_set,
                email_confirmed: response.objects.email_confirmed
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
                <div className={"horizontal"} >
                    <SettingsPanel {...userData} parentHandleInputChange={handleInputChange}/>
                    <NotificationPanel {...userData} parentHandleInputChange={handleInputChange}/>
                </div>
            </header>
            <section className={"userBody"}>
                <UserInfo {...userData} parentHandleInputChange={handleInputChange}/>
                <ConferenceInfo {...userData} parentHandleInputChange={handleInputChange}/>
            </section>
        </main>
    );
}

export default User;