import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/settings_panel.css";
import closeIcon from "../images/close.svg"
import checkIcon from "../images/check.svg"
import editIcon from "../images/edit.svg"
import settingsIcon from '../images/settings.svg';
import {baseURL, httpReq, imagePostReq} from "../modules/http_requests";
import {deleteCookie, getCookie} from "../modules/cookies";

const getImageLink = (imageLink) => {
    return baseURL + "/images/" + imageLink;
}

function SettingsPanel(props) {
    let [state, setState] = useState({
        display: false,
        editMode: false,
        image: null,
        studentInfo: props.studentInfo || "",
        fname: props.fname || "",
        lname: props.lname || "",
        image_link: props.image_link || "",
        public: props.public ? "public" : "private",
        initialLoad: false
    });
    let [inputImage, setInputImage] = useState(null);

    if (!props.loaded) return <></>;
    else if (!state.initialLoad) {
        setState({
            studentInfo: props.studentInfo || "",
            display: props.display,
            editMode: state.editMode,
            fname: props.fname || "",
            lname: props.lname || "",
            image: state.image,
            image_link: props.image_link || "",
            public: props.public ? "public" : "private",
            initialLoad: true
        });
    }


    let changeState = (name, value) => {
        let partialState = {
            display: state.display,
            editMode: state.editMode,
            studentInfo: state.studentInfo,
            initialLoad: state.initialLoad,
            fname: state.fname,
            lname: state.lname,
            image: state.image,
            image_link: state.image_link,
            public: state.public
        };
        partialState[name] = value;
        setState(partialState);
    }
    let settingsDisplay = {display: "none"};
    if (state.display) settingsDisplay.display = "block";

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        changeState(name, value);
    }

    const sendStudentForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            fname: state.fname,
            lname: state.lname,
            public: state.public !== "public" ? "private" : "public"
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            return {
                success: true,
                fname: response.objects.fname,
                lname: response.objects.lname
            }
        } else return {
            success: false,
            fname: state.fname,
            lname: state.lname
        }
    }

    const sendTeacherForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            fname: state.fname,
            lname: state.lname
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            return {
                success: true,
                fname: response.objects.fname,
                lname: response.objects.lname
            }
        } else return {
            success: false,
            fname: state.fname,
            lname: state.lname
        }
    }

    const sendForm = async () => {
        let user_type = getCookie("user_type");
        let formRespose;
        let imageResponse = state.image_link;
        if (user_type === "student" || user_type === "individual") formRespose = await sendStudentForm();
        else if (user_type === "teacher") formRespose = await sendTeacherForm();
        if (inputImage) {
            console.log(inputImage);
            let json = await imagePostReq("/api/image/", inputImage, getCookie("email"));
            let response = JSON.parse(json);
            if (response.success && response.objects) {
                imageResponse = getImageLink(response.objects);
            } else imageResponse = state.image_link;
        }
        setState({
            studentInfo: state.studentInfo,
            display: state.display,
            editMode: false,
            fname: formRespose.fname || state.fname,
            lname: formRespose.lname || state.lname,
            image: null,
            image_link: imageResponse,
            initialLoad: state.initialLoad,
            public: state.public
        });
    }

    if (!state.display && state.editMode) changeState("editMode", false);


    let studentDisplay = {display: "none"};
    let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (state.studentInfo) studentDisplay.display = "grid";
    if (state.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }

    const logout = () => {
        deleteCookie("token");
        deleteCookie("email");
        deleteCookie("user_type");
        window.location.assign("/account");
    }

    console.log(props);
    console.log(state);

    return (
        <div>
            <img className={"settingsIcon"} src={settingsIcon} alt={"settings icon"}
                 onClick={() => changeState("display", true)}/>
            <div style={settingsDisplay} className={"settingsPanel"}>
                <div className={"settingsPanelHeader"}>
                    <h1>Settings</h1>
                    <img style={viewDisplay} src={editIcon} alt={"edit"} onClick={() => changeState("editMode", true)}/>
                    <img style={editDisplay} src={checkIcon} onClick={() => changeState("editMode", false)}
                         alt={"check icon"}/>


                    <img src={closeIcon} alt={"close"} onClick={() => changeState("display", false)}/>
                </div>
                <div className={"settingsBody"}>
                    <div className={"settingsRow"}>
                        <h4>First Name:</h4>
                        <div>
                            <p style={viewDisplay}>{state.fname}</p>
                            <input style={editDisplay} type={"text"} name={"fname"} value={state.fname}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <h4>Last Name:</h4>
                        <div>
                            <p style={viewDisplay}>{state.lname}</p>
                            <input style={editDisplay} type={"text"} name={"lname"} value={state.lname}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <h4>Public:</h4>
                        <div>
                            <p style={viewDisplay}>{state.public}</p>
                            <select style={editDisplay} name={"public"} value={state.public}
                                    onChange={handleInputChange}>
                                <option value={"public"}>Public</option>
                                <option value={"private"}>Private</option>
                            </select>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <h4>Image:</h4>
                        <div>
                            <img style={viewDisplay} className={"userImage"} src={state.image_link}
                                 alt={state.image_link}/>
                            <input style={editDisplay} type={"file"} accept={"image/*"}
                                   onChange={(e) => setInputImage(e.target.files[0])}/>
                        </div>
                    </div>
                    <button className={"logoutButton"} onClick={logout}>Logout</button>
                    <div style={editDisplay}>
                        <button onClick={sendForm}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPanel;