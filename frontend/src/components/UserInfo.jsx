import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/user_info_panel.css";
import editIcon from "../images/edit.svg"
import closeIcon from "../images/close.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

function UserInfo(props) {
    let [state, setState] = useState({
        school: props.school,
        city: props.city,
        grade: props.grade,
        instagram: props.instagram,
        bio: props.bio,
        studentInfo: props.studentInfo,
        editMode: false,
        initialLoad: false
    });

    if (!props.loaded) return <></>;
    else if (!state.initialLoad) {
        setState({
            school: props.school,
            city: props.city,
            grade: props.grade,
            instagram: props.instagram,
            bio: props.bio,
            studentInfo: props.studentInfo,
            editMode: state.editMode,
            initialLoad: true
        })
    }

    let changeState = (name, value) => {
        let partialState = {
            school: state.school,
            city: state.city,
            grade: state.grade,
            instagram: state.instagram,
            bio: state.bio,
            studentInfo: state.studentInfo,
            editMode: state.editMode,
            initialLoad: state.initialLoad
        };
        partialState[name] = value;
        setState(partialState);
    }

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        changeState(name, value);
    }

    const sendStudentForm = async () => {
        let json = await httpReq("/ssys/backend/api/student/", "POST", {
            email: getCookie("email"),
            // school: state.school,
            // city: state.city,
            // grade: state.grade,
            // instagram: state.instagram,
            // bio: state.bio
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            console.log(response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
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
            console.log(response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
        }
    }

    const sendForm = async () => {
        let registrant_type = getCookie("registrant_type");
        if (registrant_type === "student" || registrant_type === "individual") await sendStudentForm();
        else if (registrant_type === "teacher") await sendTeacherForm();
    }

    let studentDisplay = {display: "none"};
    let editDisplay = {display: "none"};
    let viewDisplay = {display: "block"};
    if (state.studentInfo) studentDisplay.display = "block";
    if (state.editMode) {
        editDisplay.display = "block";
        viewDisplay.display = "none";
    }

    return (
        <div className={"userInfoPanel"}>

            <div className={"userInfoHeader"}>
                <h4>User Info</h4>
                <img style={viewDisplay} src={editIcon} onClick={() => changeState("editMode", true)}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => changeState("editMode", false)}
                     alt={"close icon"}/>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>School:</td>
                    <td style={viewDisplay}>{state.school}</td>
                    <input style={editDisplay} type={"text"} name={"school"} value={state.school}
                           onChange={handleInputChange}/>
                </tr>
                <tr>
                    <td>City:</td>
                    <td style={viewDisplay}>{state.city}</td>
                    <input style={editDisplay} type={"text"} name={"city"} value={state.city}
                           onChange={handleInputChange}/>
                </tr>
                <tr style={studentDisplay}>
                    <td>Grade:</td>
                    <td style={viewDisplay}>{state.grade}</td>
                    <input style={editDisplay} type={"text"} name={"grade"} value={state.grade}
                           onChange={handleInputChange}/>
                </tr>
                <tr style={studentDisplay}>
                    <td>Instagram:</td>
                    <td style={viewDisplay}>{state.instagram}</td>
                    <input style={editDisplay} type={"text"} name={"insta"} value={state.instagram}
                           onChange={handleInputChange}/>
                </tr>
                <tr>
                    <td>Bio:</td>
                    <td style={viewDisplay}>{state.bio}</td>
                    <textarea style={editDisplay} name="bio" rows="10" cols="30" value={state.bio}
                              onChange={handleInputChange}/>
                </tr>
                <tr style={editDisplay}>
                    <td colSpan={2}>
                        <button onClick={sendForm}>Submit</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserInfo;