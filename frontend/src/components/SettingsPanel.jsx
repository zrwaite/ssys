import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/settings_panel.css";
import closeIcon from "../images/close.svg"
import editIcon from "../images/edit.svg"
import settingsIcon from '../images/settings.svg';

function SettingsPanel(props) {
    let [state, setState] = useState({
        display: false,
        editMode: false,
        studentInfo: props.studentInfo || "",
        initialLoad: false
    });

    if (!props.loaded) return <></>;
    else if (!state.initialLoad) {
        setState({
            studentInfo: props.studentInfo || "",
            display: props.display,
            editMode: state.editMode,
            initialLoad: true
        })
    }


    let changeState = (name, value) => {
        let partialState = {
            display: state.display,
            editMode: state.editMode,
            studentInfo: state.studentInfo,
            initialLoad: state.initialLoad
        };
        partialState[name] = value;
        setState(partialState);
    }
    let settingsDisplay = {display: "none"};
    if (state.display) settingsDisplay.display = "block";

    let studentDisplay = {display: "none"};
    let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (state.studentInfo) studentDisplay.display = "grid";
    if (state.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }

    return (
        <div>
            <img className={"settingsIcon"} src={settingsIcon} alt={"settings icon"}
                 onClick={() => changeState("display", true)}/>
            <div style={settingsDisplay} className={"settingsPanel"}>
                <div className={"settingsPanelHeader"}>
                    <h1>Settings</h1>
                    <img src={editIcon} alt={"edit"} onClick={() => changeState("editMode", true)}/>
                    <img src={closeIcon} alt={"close"} onClick={() => changeState("display", false)}/>
                </div>
            </div>
        </div>
    );
}

export default SettingsPanel;