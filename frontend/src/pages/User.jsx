import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/user_page.css";
import notificationIcon from '../images/notifications.svg';
import settingsIcon from '../images/settings.svg';
import UserInfo from "../components/UserInfo";
import ConferenceInfo from "../components/ConferenceInfo";

import {deleteCookie, getCookie} from "../modules/cookies";
import {Navigate} from "react-router-dom";
import {httpReq} from "../modules/http_requests";
// import ReactDOM from "react-dom";

const getImageLink = (imageLink) => {
    return "http://localhost/ssys/backend/images/" + imageLink;
}

const logout = () => {
    deleteCookie("token");
    deleteCookie("email");
    deleteCookie("registrant_type");
    window.location.assign("/account");
}

function User() {
    let [state, setState] = useState({
        email: getCookie("email"),
        studentInfo: (getCookie("registrant_type") === "student" || getCookie("registrant_type") === "individual"),
        fname: "",
        lname: "",
        image_link: "",
        school: "",
        bio: "",
        grade: "",
        city: "",
        password_set: false,
        image_approved: false,
        instagram: "",
        emergency_contact: "",
        email_confirmed: false,
        video_approved: false,
        account_enabled: true,
        public: false,
        video_link: "",
        shirt_size: "",
        additional_info: "",
        diet: "",
        loaded: false
    });

    const getUserData = async () => {
        console.log("function called");
        let json = await httpReq("/ssys/backend/api/student/?email=" + getCookie("email"), "GET")
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            console.log(response);
            setState({
                email: getCookie("email"),
                studentInfo: (getCookie("registrant_type") === "student" || getCookie("registrant_type") === "individual"),
                fname: response.objects.fname,
                lname: response.objects.lname,
                image_link: getImageLink(response.objects.image_link),
                school: response.objects.school,
                bio: response.objects.bio,
                grade: response.objects.grade,
                city: response.objects.city,
                diet: response.objects.diet,
                shirt_size: response.objects.shirt_size,
                emergency_contact: response.objects.emergency_contact,
                additional_info: response.objects.additional_info,
                password_set: response.objects.password_set,
                image_approved: response.objects.image_approved,
                email_confirmed: response.objects.email_confirmed,
                video_approved: response.objects.video_approved,
                account_enabled: response.objects.account_enabled,
                public: response.objects.public,
                video_link: response.objects.video_link,
                workshop_choices: response.objects.workshop_choices,
                loaded: true
            })
        } else if (response.errors.length > 0) {
            setState({
                email: state.email,
                studentInfo: state.studentInfo,
                fname: state.fname,
                lname: state.lname,
                image_link: state.image_link,
                school: "",
                bio: "",
                grade: "",
                city: "",
                diet: "",
                shirt_size: "",
                emergency_contact: "",
                additional_info: "",
                password_set: false,
                image_approved: false,
                email_confirmed: false,
                video_approved: false,
                account_enabled: false,
                public: false,
                video_link: "",
                workshop_choices: "",
                loaded: true
            })
            console.log(response.errors)
        }
    }

    if (!state.loaded) {
        getUserData();
    }
    console.log(state);

    if (!(getCookie("email") && getCookie("token") && getCookie("registrant_type"))) return <Navigate to='/account'/>;

    return (
        <main>
            <header className={"userHeader"}>
                <img className={"userImage"} src={state.image_link} alt={state.image_link}/>
                <div>
                    <h3>{state.fname}</h3>
                    <h3>{state.lname}</h3>
                </div>
                <img className={"notificationIcon"} src={notificationIcon} alt={"notifications icon"}/>
                <img className={"settingsIcon"} src={settingsIcon} alt={"settings icon"}/>
            </header>
            <div>
                <UserInfo studentInfo={state.studentInfo} school={state.school} city={state.city} grade={state.grade}
                          instagram={state.instagram} bio={state.bio}/>
                <ConferenceInfo studentInfo={state.studentInfo} diet={state.diet} shirt_size={state.shirt_size}
                                emergency_contact={state.emergency_contact} additional_info={state.additional_info}
                                bio={state.bio}/>
            </div>
            <div>
                <h1>User Page</h1>
                <p>Email = {getCookie("email")}</p>
                <p>Token = {getCookie("token")}</p>
                <p>Account Type = {getCookie("registrant_type")}</p>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
            </div>
        </main>
    );
}

export default User;