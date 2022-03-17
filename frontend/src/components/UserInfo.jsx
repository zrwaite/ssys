import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/info_panel.css";
import editIcon from "../images/edit.svg"
import closeIcon from "../images/close.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";
import KeyValueEdit from "./KeyValueEdit"

function UserInfo(props) {
    let [state, setState] = useState({
        studentInfo: true,
        editMode: false
    });
    
    const sendStudentForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            school: props.school,
            city: props.city,
            grade: props.grade,
            instagram: props.instagram,
            bio: props.bio
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            console.log(response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
        }
    }

    const sendTeacherForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            school: props.school,
            city: props.city,
            bio: props.bio
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            console.log("teacher:", response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
        }
    }

    const sendForm = async () => {
        let user_type = getCookie("user_type");
        if (user_type === "student" || user_type === "individual") await sendStudentForm();
        else if (user_type === "teacher") await sendTeacherForm();
        setState({...state, editMode: false});
    }

    let studentDisplay = {display: "none"};
    let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (state.studentInfo) studentDisplay.display = "grid";
    if (state.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }
    return (
        <div className={"userInfoPanel"}>
            <div className={"infoHeader"}>
                <h2>User Info</h2>
                <img style={viewDisplay} src={editIcon} onClick={() => setState({...state, editMode: true})}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => setState({...state, editMode: false})}
                     alt={"close icon"}/>
            </div>
            <div className={"infoBody"}>
                {
                    [
                        {displayName: "School", name: "school", inputType: "text"},
                        {displayName: "City", name: "city", inputType: "text"},
                        {displayName: "Grade", name: "grade", inputType: "text"},
                        {displayName: "Instagram", name: "instagram", inputType: "text"},
                        {displayName: "Bio", name: "bio", inputType: "textarea"}
                    ].map((keyValueData, i) => {
                        return (
                            <KeyValueEdit key={i} value={props[keyValueData.name]} {...keyValueData} editMode={state.editMode} onChange={props.parentHandleInputChange} />
                        )
                    })
                }
                <div style={editDisplay}>
                    <button className={"blackButton"} onClick={sendForm}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;