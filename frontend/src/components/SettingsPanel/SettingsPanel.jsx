import React, {useState} from "react";
import "./SettingsPanel.css";
import closeIcon from "../../images/close.svg"
import checkIcon from "../../images/check.svg"
import editIcon from "../../images/edit.svg"
import settingsIcon from '../../images/settings.svg';
import {baseURL, httpReq, imagePostReq} from "../../modules/http_requests";
import {deleteCookie, getCookie} from "../../modules/cookies";

const getImageLink = (imageLink) => {
    return baseURL + "/images/" + imageLink;
}

const SettingsPanel = (props) => {
    let [state, setState] = useState({
        display: false,
        editMode: false,
    });
    let [inputImage, setInputImage] = useState("");

    let settingsDisplay = {display: "none"};
    if (state.display) settingsDisplay.display = "block";

    const sendPutForm = async () => {
        let json = await httpReq("/api/user/", "PUT", {
            username: getCookie("username"),
            fname: props.fname,
            lname: props.lname,
            public: props.public === "1" ? 1 : "private"
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            console.log(response);
            return {
                success: true,
                fname: response.objects.fname,
                lname: response.objects.lname
            }
        } else return {
            success: false,
            fname: props.fname,
            lname: props.lname
        }
    }

    const sendForm = async () => {
        let formResponse;
        let imageResponse = props.image_link;
        formResponse = await sendPutForm();
        if (inputImage) {
            let json = await imagePostReq("/api/image/", inputImage, getCookie("username"));
            let response = JSON.parse(json);
            if (response.success && response.objects) {
                imageResponse = getImageLink(response.objects);
            } else imageResponse = props.image_link;
        }
        if (formResponse) {
            if (formResponse.success) {
                //Success
            } else {
                alert("error");
            }
        }
    }

    if (!state.display && state.editMode) setState({...state, editMode: false});


    let studentDisplay = {display: "none"};
    let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (props.studentInfo) studentDisplay.display = "grid";
    if (state.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }

    const logout = () => {
        deleteCookie("token");
        deleteCookie("username");
        deleteCookie("user_type");
        window.location.assign("/account");
    }

    return (
        <div>
            <img className={"icon"} src={settingsIcon} alt={"settings icon"}
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
                            <p style={viewDisplay}>{props.fname}</p>
                            <input className="settingsGreen" style={editDisplay} type={"text"} name={"fname"} value={props.fname}
                                   onChange={props.parentHandleInputChange}/>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <h4>Last Name:</h4>
                        <div>
                            <p style={viewDisplay}>{props.lname}</p>
                            <input className="settingsGreen" style={editDisplay} type={"text"} name={"lname"}
                                   value={props.lname}
                                   onChange={props.parentHandleInputChange}/>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <h4>Public:</h4>
                        <div>
                            <p style={viewDisplay}>{props.public === "1" ? "Yes, Public" : "No, Private"}</p>
                            <select className="settingsYellow" style={editDisplay} name={"public"} value={props.public}
                                    onChange={props.parentHandleInputChange}>
                                <option value={1}>Public</option>
                                <option value={0}>Private</option>
                            </select>
                        </div>
                    </div>
                    {/*<div className={"infoRow"}>*/}
                    {/*    <h4>Image:</h4>*/}
                    {/*    <div>*/}
                    {/*        <img style={viewDisplay} className={"userImage"} src={props.image_link}*/}
                    {/*             alt={props.image_link}/>*/}
                    {/*        <input style={editDisplay} type={"file"} accept={"image/*"}*/}
                    {/*               onChange={(e) => setInputImage(e.target.files[0])}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <button className={"logoutButton"} onClick={logout}>Logout</button>
                    <div style={editDisplay}>
                        <button className="settingsSubmit" onClick={sendForm}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPanel;