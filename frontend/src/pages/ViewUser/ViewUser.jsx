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
        additional_info: "",
        public: "",
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
    const viewUserBox = {
        padding: "0.5rem",
    }
    const whiteText = {color: "white"}
    console.log(userData);
    return (
        <main>
            <div className="viewUserTop">
                <h1>{userData.fname} {userData.lname}</h1>
            </div>
            <div className="userGreen">
                <div className="viewUserTopBlurb">
                {userData.school&&userData.school.length && <h3><span style={whiteText}>Goes to: </span>{userData.school}</h3>}
                {!userData.teacher&&userData.grade&&<h3 style={viewUserBox}><span style={whiteText}>Grade: </span> {userData.grade}</h3>}
                {!userData.teacher&&userData.instagram&&userData.instagram.length&&<h3 style={viewUserBox}><span style={whiteText}>Insta:</span> {userData.instagram}</h3>}
                <h3 style={viewUserBox}><span style={whiteText}>User Bio:</span></h3>
                <p style={viewUserBox}>{userData.bio}</p>
                </div>
            </div>
        </main>
    );
}

export default ViewUser;