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
        studentInfo: true,
        fname: "",
        lname: "",
        image_link:"",
        public_view: false
    });
    let [inputImage, setInputImage] = useState(null);

    React.useEffect(() => {
        props.renderData.current = renderData
    })
    
    const renderData = (fname, lname, image_link, public_view) => {
        setState({
            ...state,
            fname:fname,
            lname:lname,
            image_link:image_link,
            public_view:public_view
        });
    }

    let settingsDisplay = {display: "none"};
    if (state.display) settingsDisplay.display = "block";

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {...state};
        partialState[name] = value;
        setState(partialState);
    }
//todo reduce to one form sfunction
    const sendStudentForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            email: getCookie("email"),
            fname: state.fname,
            lname: state.lname,
            public: state.public_view
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

    if (!state.display && state.editMode) setState({...state, editMode: false});


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

    return (
        <div>
            <img className={"settingsIcon"} src={settingsIcon} alt={"settings icon"}
                 onClick={() => setState({...state, display:true})}/>
            <div style={settingsDisplay} className={"settingsPanel"}>
                <div className={"settingsPanelHeader"}>
                    <h1>Settings</h1>
                    <img style={viewDisplay} src={editIcon} alt={"edit"} onClick={() => setState({...state, editMode: true})}/>
                    <img style={editDisplay} src={checkIcon} onClick={() => setState({...state, editMode: false})}
                         alt={"check icon"}/>
                    <img src={closeIcon} alt={"close"} onClick={() => setState({...state, display: false})}/>


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
                            <p style={viewDisplay}>{state.public_view?"Public":"Private"}</p>
                            <select style={editDisplay} name={"public_view"} value={state.public_view}
                                    onChange={handleInputChange}>
                                <option value={true}>Public</option>
                                <option value={false}>Private</option>
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