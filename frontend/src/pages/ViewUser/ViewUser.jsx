import React, {useState} from "react";
import "./ViewUser.css";
import UserInfo from "../../components/UserInfo";
import UserInfoTeacher from "../../components/UserInfoTeacher";
import ConferenceInfo from "../../components/ConferenceInfo";
import WorkshopChoices from "../../components/WorkshopChoices";

import {getCookie, signedIn} from "../../modules/cookies";
import {httpReq, baseURL} from "../../modules/http_requests";
import SettingsPanel from "../../components/SettingsPanel";
import AccountIcon from "../../images/account.svg";
import StudentCodes from "../../components/StudentCodes";

const getImageLink = (imageLink) => {
    return baseURL + "/images/" + imageLink;
}

const ViewUser = () => {
    const [dataPulled, setDataPulled] = useState(false);
    const [userData, setUserData] = useState({
        email: getCookie("email"),
        studentInfo: (getCookie("user_type") === "student"),
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
        workshop_choices: "",
        teacher: false
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
        let json = await httpReq("/api/user/?username=" + getCookie("username"), "GET")
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            setUserData({
                ...userData,
                username: getCookie("username"),
                fname: response.objects.fname,
                lname: response.objects.lname,
                image_approved: response.objects.image_approved,
                account_enabled: response.objects.account_enabled,
                school: response.objects.school || "",
                city: response.objects.city || "",
                grade: response.objects.grade || "",
                instagram: response.objects.instagram || "",
                bio: response.objects.bio || "",
                diet: response.objects.diet || "",
                emergency_contact: response.objects.emergency_contact || "",
                additional_info: response.objects.additional_info || "",
                image_link: response.objects.image_link ? getImageLink(response.objects.image_link) : AccountIcon,
                public: response.objects.public,
                password_set: response.objects.password_set,
                email_confirmed: response.objects.email_confirmed,
                workshop_choices: response.objects.workshop_choices,
                teacher: response.objects.teacher
            })
        } else if (response.errors.length > 0) {
            alert(response.errors)
        }
        setDataPulled(true);
    }
    if (!dataPulled) getUserData();
    if (!signedIn()) window.location.href = "/account";


    return (
        <main>
            <div className="userTop">
                <h1>Welcome to {userData.fname}'s page!</h1>
            </div>
            <div className="userGreen">
                <div className="viewUserTopBlurb">
                <p>
                {userData.bio} <br/><br/>
                School: {userData.school} <br/><br/>
                Instagram: {userData.instagram}
                </p>            
                </div>
            </div>
        </main>
    );
}

export default ViewUser;