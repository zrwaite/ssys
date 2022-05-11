import React, {useState} from "react";
import "./ViewUser.css";

import {signedIn} from "../../modules/cookies";
import {httpReq, baseURL} from "../../modules/http_requests";
import AccountIcon from "../../images/account.svg";
import {useParams} from "react-router-dom";

const getImageLink = (imageLink) => {
    return baseURL + "/images/" + imageLink;
}

const ViewUser = () => {
    const {userId} = useParams();
    const [dataPulled, setDataPulled] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
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

    const getUserData = async () => {
        let json = await httpReq("/api/user/?id=" + userId, "GET")
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            setUserData({
                ...userData,
                username: response.objects.username,
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
        } else if (response.status === 404) {
            setNotFound(true);
        } else if (response.status === 403) {
            alert("Private account");
        } else if (response.errors.length > 0) {
            alert(response.errors)
        }
    }
    if (notFound) {
        window.location.href="/UserNotFound";
    } else {
        if (!dataPulled) {
            if (userId) getUserData();
            else setNotFound(true);
            setDataPulled(true);
        }
    }
    if (!signedIn()) window.location.href = "/account";

    console.log(userData);
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