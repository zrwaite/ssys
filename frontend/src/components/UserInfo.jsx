import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/info_panel.css";
import editIcon from "../images/edit.svg"
import closeIcon from "../images/close.svg"
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";

function UserInfo(props) {
    let [state, setState] = useState({
        school: "",
        city: "",
        grade: "",
        instagram: "",
        bio: "",
        studentInfo: true,
        editMode: false
    });

    React.useEffect(() => {
        props.renderData.current = renderData
    })
    
    const renderData = (school, city, grade, instagram, bio, studentInfo) => {
        setState({
            ...state,
            school:school,
            city:city,
            grade:grade,
            instagram:instagram,
            bio: bio,
            studentInfo: studentInfo
        });
    }

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {...state};
        partialState[name] = value;
        setState(partialState);
    }

    const sendStudentForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            school: state.school,
            city: state.city,
            grade: state.grade,
            instagram: state.instagram,
            bio: state.bio
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
            school: state.school,
            city: state.city,
            bio: state.bio
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
                        <p style={viewDisplay}>{state.school}</p>
                        <input style={editDisplay} type={"text"} name={"school"} value={state.school}
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>City:</h4>
                    <div>
                        <p style={viewDisplay}>{state.city}</p>
                        <input style={editDisplay} type={"text"} name={"city"} value={state.city}
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"} style={studentDisplay}>
                    <h4>Grade:</h4>
                    <div>
                        <p style={viewDisplay}>{state.grade}</p>
                        <input style={editDisplay} type={"text"} name={"grade"} value={state.grade}
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"} style={studentDisplay}>
                    <h4>Instagram:</h4>
                    <div>
                        <p style={viewDisplay}>{state.instagram}</p>
                        <input style={editDisplay} type={"text"} name={"instagram"} value={state.instagram}
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={"infoRow"}>
                    <h4>Bio:</h4>
                    <div>
                        <p style={viewDisplay}>{state.bio}</p>
                        <textarea style={editDisplay} name="bio" rows="10" cols="30" value={state.bio}
                                  onChange={handleInputChange}/>
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