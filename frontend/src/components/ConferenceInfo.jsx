import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/info_panel.css";
import editIcon from "../images/edit.svg"
import closeIcon from "../images/close.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

const ConferenceInfo = (props) => {
    let [state, setState] = useState({
        editMode: false
    });

    const sendStudentForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            diet: props.diet,
            shirt_size: props.shirt_size,
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
            email: getCookie("email"),
            diet: props.diet,
            shirt_size: props.shirt_size,
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
    return (
        <div className={"conferenceInfoPanel"}>
            <div className={"infoHeader"}>
                <h2>Conference Info</h2>
                <img style={viewDisplay} src={editIcon} onClick={() => setState({...state, editMode: true})}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => setState({...state, editMode: false})}
                     alt={"close icon"}/>
            </div>
            <div className={"infoBody"}>
                <div className={"infoRow"}>
                    <h4>Dietary Restrictions:</h4>
                    <div>
                        <p style={viewDisplay}>{props.diet}</p>
                        <textarea style={editDisplay} name="diet" rows="5" cols="10" value={props.diet}
                                  onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>Shirt Size:</h4>
                    <div>
                        <p style={viewDisplay}>{props.shirt_size}</p>
                        <select style={editDisplay} name={"shirt_size"} value={props.shirt_size}
                                onChange={props.parentHandleInputChange}>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                </div>
                <div className={"infoRow"} style={studentDisplay}>
                    <h4>Emergency Contact:</h4>
                    <div>
                        <p style={viewDisplay}>{props.emergency_contact}</p>
                        <input style={editDisplay} type={"text"} name={"emergency_contact"}
                               value={props.emergency_contact} onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>Additional Info:</h4>
                    <div>
                        <p style={viewDisplay}>{props.additional_info}</p>
                        <textarea style={editDisplay} name="additional_info" rows="5" cols="10"
                                  value={props.additional_info} onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div style={editDisplay}>
                    <button onClick={sendForm}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ConferenceInfo;