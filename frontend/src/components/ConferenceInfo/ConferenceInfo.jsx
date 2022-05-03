import React, {useState} from "react";
import "./ConferenceInfo.css";
import editIcon from "../../images/edit.svg"
import closeIcon from "../../images/close.svg"
import {httpReq} from "../../modules/http_requests";
import {getCookie} from "../../modules/cookies";
import KeyValueEdit from "../KeyValueEdit";

const ConferenceInfo = (props) => {
    let [state, setState] = useState({
        editMode: false
    });

    const sendStudentForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            username: getCookie("username"),
            diet: props.diet,
            emergency_contact: props.emergency_contact,
            additional_info: props.additional_info
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            // console.log(response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
        }
    }

    const sendTeacherForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            username: getCookie("username"),
            diet: props.diet,
            additional_info: props.additional_info
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            // console.log(response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
        }
    }

    const sendForm = async () => {
        let user_type = getCookie("user_type");
        if (user_type === "student" || user_type === "individual") await sendStudentForm();
        else if (user_type === "teacher") await sendTeacherForm();
        setState({...state, editMode:false});
    }
    let studentDisplay = {display: "none"};
    let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (props.studentInfo) studentDisplay.display = "grid";
    if (state.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }
    console.log(props.teacher);
    return (
        <div className={"conferenceInfoPanel userPagePanel"}>
            <div className={"infoHeader"}>
                <h2>Conference Info</h2>
                <img style={viewDisplay} src={editIcon} onClick={() => setState({...state, editMode: true})}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => setState({...state, editMode: false})}
                     alt={"close icon"}/>
            </div>
            <div className={"infoBody"}>
                {
                    props.teacher ? [
                        {displayName: "Dietary Restrictions", name: "diet", inputType: "textarea"},
                        {displayName: "Additional Info", name: "additional_info", inputType: "textarea"},
                    ].map((keyValueData, i) => {
                        return (
                            <KeyValueEdit key={i} value={props[keyValueData.name]} {...keyValueData}
                                          editMode={state.editMode}
                                          parentHandleInputChange={props.parentHandleInputChange}/>
                        )
                    }) : [
                        {displayName: "Dietary Restrictions", name: "diet", inputType: "textarea"},
                        {displayName: "Emergency Contact", name: "emergency_contact", inputType: "text"},
                        {displayName: "Additional Info", name: "additional_info", inputType: "textarea"},
                    ].map((keyValueData, i) => {
                        return (
                            <KeyValueEdit key={i} value={props[keyValueData.name]} {...keyValueData}
                                          editMode={state.editMode}
                                          parentHandleInputChange={props.parentHandleInputChange}/>
                        )
                    })
                }
                <div style={editDisplay}>
                    <button className={"greenButton"} onClick={sendForm}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ConferenceInfo;