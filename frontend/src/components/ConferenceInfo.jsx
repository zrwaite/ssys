import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/conference_info_panel.css";
import editIcon from "../images/edit.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

function ConferenceInfo(props) {
    let [state, setState] = useState({
        studentInfo: props.studentInfo,
        diet: props.diet,
        shirt_size: props.shirt_size,
        emergency_contact: props.emergency_contact,
        additional_info: props.additional_info,
        editMode: false
    });
    console.log(state);

    let changeState = (name, value) => {
        let partialState = {
            diet: state.diet,
            shirt_size: state.shirt_size,
            emergency_contact: state.emergency_contact,
            additional_info: state.additional_info,
            editMode: state.editMode
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
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/ssys/backend/api/student/", "PUT", {
            email: getCookie("email"),
            diet: state.diet,
            shirt_size: state.shirt_size,
            emergency_contact: state.emergency_contact,
            additional_info: state.additional_info
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            //Do something
        } else if (response.errors.length > 0) {
            alert("error");
        }
    }

    let studentDisplay = {display: "none"};
    if (state.studentInfo) {
        studentDisplay.display = "block";
    }

    let editDisplay = {display: "none"};
    let viewDisplay = {display: "block"};
    if (state.editMode) {
        editDisplay.display = "block";
        viewDisplay.display = "none";
    } else {
        editDisplay.display = "none";
        viewDisplay.display = "block";
    }

    return (
        <div className={"conferenceInfoPanel"}>
            <div className={"conferenceInfoHeader"}>
                <h4>Conference Info</h4>
                <img src={editIcon} alt={"edit icon"} onClick={() => changeState("editMode", true)}/>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>Dietary Restrictions:</td>
                    <td style={viewDisplay}>{props.diet}</td>
                </tr>
                <tr>
                    <td>Shirt Size:</td>
                    <td style={viewDisplay}>{props.shirt_size}</td>
                </tr>
                <tr style={studentDisplay}>
                    <td>Emergency Contact:</td>
                    <td style={viewDisplay}>{props.emergency_contact}</td>
                </tr>
                <tr>
                    <td>Additional Info:</td>
                    <td style={viewDisplay}>{props.additional_info}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ConferenceInfo;