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
        this.renderSettingsData = React.createRef();
        this.renderNotificationsData = React.createRef();
        this.state = {
            email: getCookie("email"),
            studentInfo: (getCookie("user_type") === "student" || getCookie("user_type") === "individual"),
            fname: "",
            lname: "",
            image_link: "",
            image_approved: false,
            video_approved: false,
            account_enabled: true,
            video_link: ""
        };
    }   

    async componentDidMount() {
        let json = await httpReq("/api/user/?email=" + getCookie("email"), "GET")
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            const studentInfo = (getCookie("user_type") === "student" || getCookie("user_type") === "individual")
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
            this.renderSettingsData.current(
                response.objects.fname, 
                response.objects.lname, 
                getImageLink(response.objects.image_link),
                response.objects.public
            )
            this.renderNotificationsData.current(
                response.objects.password_set,
                response.objects.email_confirmed
            )
            this.setState({
                ...this.state,
                fname: response.objects.fname, 
                lname: response.objects.lname, 
                image_link: getImageLink(response.objects.image_link),
                email: getCookie("email"),
                image_approved: response.objects.image_approved,
                video_approved: response.objects.video_approved,
                account_enabled: response.objects.account_enabled,
                video_link: response.objects.video_link,
                workshop_choices: response.objects.workshop_choices
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
                    <div className="horizontal">
                        <img className={"userImage"} src={this.state.image_link} alt={this.state.image_link}/>
                        <h2>{this.state.fname} {this.state.lname}</h2>
                    </div>
                    <div className={"horizontal"} >
                        <SettingsPanel renderData={this.renderSettingsData}/>
                        <NotificationPanel renderData={this.renderNotificationsData}/>
                    </div>
                </header>
                <section className={"userBody"}>
                    <UserInfo renderData={this.renderUserInfoData}/>
                    <ConferenceInfo renderData={this.renderConferenceInfoData}/>
                </section>
            </main>
        );
    }
}

export default User;