import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/notification_panel.css";
import Notification from "./Notification";
import closeIcon from "../images/close.svg"
import notificationIcon from '../images/notifications.svg';

function NotificationPanel() {
    let [state, setState] = useState({
        display: false
    });
    let changeState = (name, value) => {
        let partialState = {
            display: state.display
        };
        partialState[name] = value;
        setState(partialState);
    }
    let notificationDisplay = {display: "none"};
    if (state.display) notificationDisplay.display = "block";
    return (
        <div>
            <img className={"notificationIcon"} src={notificationIcon} alt={"notifications icon"}
                 onClick={() => changeState("display", true)}/>
            <div style={notificationDisplay} className={"notificationPanel"}>
                <div className={"notificationPanelHeader"}>
                    <h1>Notifications</h1>
                    <img src={closeIcon} alt={"close"} onClick={() => changeState("display", false)}/>
                </div>
                <Notification icon={"warning"} message={"testing"}/>
                <Notification default={true} name={"email_confirmed"}/>
            </div>
        </div>
    );
}

export default NotificationPanel;