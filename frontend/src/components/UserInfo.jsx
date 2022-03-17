import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/info_panel.css";
import editIcon from "../images/edit.svg"
import closeIcon from "../images/close.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

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
                <div className={"infoRow"}>
                    <h4>School:</h4>
                    <div>
                        <p style={viewDisplay}>{props.school}</p>
                        <input style={editDisplay} type={"text"} name={"school"} value={props.school}
                               onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>City:</h4>
                    <div>
                        <p style={viewDisplay}>{props.city}</p>
                        <input style={editDisplay} type={"text"} name={"city"} value={props.city}
                               onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"} style={studentDisplay}>
                    <h4>Grade:</h4>
                    <div>
                        <p style={viewDisplay}>{props.grade}</p>
                        <input style={editDisplay} type={"text"} name={"grade"} value={props.grade}
                               onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"} style={studentDisplay}>
                    <h4>Instagram:</h4>
                    <div>
                        <p style={viewDisplay}>{props.instagram}</p>
                        <input style={editDisplay} type={"text"} name={"instagram"} value={props.instagram}
                               onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>Bio:</h4>
                    <div>
                        <p style={viewDisplay}>{props.bio}</p>
                        <textarea style={editDisplay} name="bio" rows="10" cols="30" value={props.bio}
                                  onChange={props.parentHandleInputChange}/>
                    </div>
                </div>
                <div style={editDisplay}>
                    <button onClick={sendForm}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;