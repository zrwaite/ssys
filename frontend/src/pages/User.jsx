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

class User extends React.Component {
    constructor() {
        super();
        this.renderUserInfoData = React.createRef();
        this.renderConferenceInfoData = React.createRef();
        this.state = {
            email: getCookie("email"),
            studentInfo: (getCookie("user_type") === "student" || getCookie("user_type") === "individual"),
            fname: "",
            lname: "",
            image_link: "",
            password_set: false,
            image_approved: false,
            email_confirmed: false,
            video_approved: false,
            account_enabled: true,
            public: false,
            video_link: ""
        };
    }   

    async componentDidMount() {
        let json = await httpReq("/api/user/?email=" + getCookie("email"), "GET")
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            const studentInfo = (getCookie("user_type") === "student" || getCookie("user_type") === "individual")
            alert(studentInfo)
            this.renderUserInfoData.current(
                response.objects.school||"",
                response.objects.city||"",
                response.objects.grade||"", 
                response.objects.instagram||"", 
                response.objects.bio||"", 
                studentInfo
            )
            this.renderConferenceInfoData.current(
                response.objects.diet||"",
                response.objects.shirt_size||"", 
                response.objects.emergency_contact||"", 
                response.objects.additional_info||"", 
                studentInfo
            )
            this.setState({
                email: getCookie("email"),
                fname: response.objects.fname,
                lname: response.objects.lname,
                image_link: getImageLink(response.objects.image_link),
                password_set: response.objects.password_set,
                image_approved: response.objects.image_approved,
                email_confirmed: response.objects.email_confirmed,
                video_approved: response.objects.video_approved,
                account_enabled: response.objects.account_enabled,
                public: response.objects.public,
                video_link: response.objects.video_link,
                workshop_choices: response.objects.workshop_choices,
                loaded: true,
            })
        } else if (response.errors.length > 0) {
            alert(response.errors)
        }
    }

    render() {
        if (!(getCookie("email") && getCookie("token") && getCookie("user_type"))) return <Navigate to='/account'/>;
        return (
            <main>
                <header className={"userHeader"}>
                    <img className={"userImage"} src={this.state.image_link} alt={this.state.image_link}/>
                    <div>
                        <h3>{this.state.fname}</h3>
                        <h3>{this.state.lname}</h3>
                    </div>
                    <SettingsPanel 
                        loaded={this.state.loaded} 
                        fname={this.state.fname} 
                        lname={this.state.lname}
                        image_link={this.state.image_link} 
                        public={this.state.public}/>
                    <NotificationPanel 
                        email_confirmed={this.state.email_confirmed} 
                        password_set={this.state.password_set}/>
                </header>
                <section className={"userBody"}>
                    <UserInfo renderData={this.renderUserInfoData}/>
                    <ConferenceInfo renderData={this.renderConferenceInfoData}/>
                </section>
                <p>Email = {getCookie("email")}</p>
                <p>Token = {getCookie("token")}</p>
                <p>Account Type = {getCookie("user_type")}</p>
            </main>
        );
    }
}

export default User;