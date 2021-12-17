import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/user_info_panel.css";
import editIcon from "../images/edit.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

function UserInfo(props) {
    let [state, setState] = useState({
        school: props.school,
        city: props.city,
        grade: props.grade,
        instagram: props.instagram,
        bio: props.bio,
        studentInfo: props.studentInfo
    });

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {
            school: state.school,
            city: state.city,
            grade: state.grade,
            instagram: state.instagram,
            bio: state.bio,
            teacherInfo: state.teacherInfo
        };
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendStudentForm = async () => {
        let json = await httpReq("/ssys/backend/api/student/", "PUT", {
            email: getCookie("email"),
            school: state.school,
            city: state.city,
            grade: state.grade,
            instagram: state.instagram,
            bio: state.bio
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            //Do something
        } else if (response.errors.length > 0) {
            alert("error");
        }
    }

    const sendTeacherForm = async () => {
        let json = await httpReq("/ssys/backend/api/student/", "PUT", {
            email: getCookie("email"),
            school: state.school,
            city: state.city,
            instagram: state.instagram,
            bio: state.bio
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            //Do something
        } else if (response.errors.length > 0) {
            alert("error");
        }
    }

    const sendForm = async () => {
        let registrant_type = getCookie("registrant_type");
        if (registrant_type === "student" || registrant_type === "individual") await sendStudentForm();
        else if (registrant_type === "teacher") await sendTeacherForm();
    }

    let studentDisplay = {
        display: "none"
    };
    if (state.studentInfo) {
        studentDisplay = {
            display: "block"
        };
    }

    return (
        <div className={"userInfoPanel"}>
            <div className={"userInfoHeader"}>
                <h4>User Info</h4>
                <img src={editIcon} alt={"edit icon"}/>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>School:</td>
                    <td>{props.school}</td>
                </tr>
                <tr>
                    <td>City:</td>
                    <td>{props.city}</td>
                </tr>
                <tr style={studentDisplay}>
                    <td>Grade:</td>
                    <td>{props.grade}</td>
                </tr>
                <tr style={studentDisplay}>
                    <td>Instagram:</td>
                    <td>{props.instagram}</td>
                </tr>
                <tr>
                    <td>Bio:</td>
                    <td>{props.bio}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserInfo;