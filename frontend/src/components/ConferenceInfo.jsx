import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/info_panel.css";
import editIcon from "../images/edit.svg"
import closeIcon from "../images/close.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

function ConferenceInfo(props) {
    let [state, setState] = useState({
        studentInfo: props.studentInfo || "",
        diet: props.diet || "",
        shirt_size: props.shirt_size || "",
        emergency_contact: props.emergency_contact || "",
        additional_info: props.additional_info || "",
        editMode: false,
        initialLoad: false
    });

    if (!props.loaded) return <></>;
    else if (!state.initialLoad) {
        setState({
            studentInfo: props.studentInfo || "",
            diet: props.diet || "",
            shirt_size: props.shirt_size || "",
            emergency_contact: props.emergency_contact || "",
            additional_info: props.additional_info || "",
            editMode: state.editMode,
            initialLoad: true
        })
    }


    let changeState = (name, value) => {
        let partialState = {
            studentInfo: state.studentInfo,
            diet: state.diet,
            shirt_size: state.shirt_size,
            emergency_contact: state.emergency_contact,
            additional_info: state.additional_info,
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
    handleInputChange = handleInputChange.bind(this);


    const sendStudentForm = async () => {
        let json = await httpReq("/api/student/", "PUT", {
            email: getCookie("email"),
            diet: state.diet,
            shirt_size: state.shirt_size,
            emergency_contact: state.emergency_contact,
            additional_info: state.additional_info
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            // console.log(response);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response));
        }
    }

    const sendTeacherForm = async () => {
        let json = await httpReq("/api/teacher/", "PUT", {
            email: getCookie("email"),
            diet: state.diet,
            shirt_size: state.shirt_size,
            additional_info: state.additional_info
        })
        console.log(json);
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
        changeState("editMode", false);
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
        <div className={"infoPanel"}>
            <div className={"infoHeader"}>
                <h4>Conference Info</h4>
                <img style={viewDisplay} src={editIcon} onClick={() => changeState("editMode", true)}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => changeState("editMode", false)}
                     alt={"close icon"}/>
            </div>
            <div className={"infoBody"}>
                <div className={"infoRow"}>
                    <h4>Dietary Restrictions:</h4>
                    <div>
                        <p style={viewDisplay}>{state.diet}</p>
                        <textarea style={editDisplay} name="diet" rows="5" cols="10" value={state.diet}
                                  onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>Shirt Size:</h4>
                    <div>
                        <p style={viewDisplay}>{state.shirt_size}</p>
                        <select style={editDisplay} name={"shirt_size"} value={state.shirt_size}
                                onChange={handleInputChange}>
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
                        <p style={viewDisplay}>{state.emergency_contact}</p>
                        <input style={editDisplay} type={"text"} name={"emergency_contact"}
                               value={state.emergency_contact} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>Additional Info:</h4>
                    <div>
                        <p style={viewDisplay}>{state.additional_info}</p>
                        <textarea style={editDisplay} name="additional_info" rows="5" cols="10"
                                  value={state.additional_info} onChange={handleInputChange}/>
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