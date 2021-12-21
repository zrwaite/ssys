import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/notification_panel.css";
import Notification from "./Notification";
import closeIcon from "../images/close.svg"
import notificationIcon from '../images/notifications.svg';

function NotificationPanel(props) {
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

    let notificationsList = [];
    if (!props.email_confirmed) notificationsList.push(<Notification default={true} name={"email_confirmed"}/>);
    if (!props.password_set) notificationsList.push(<Notification default={true} name={"password_set"}/>);

    return (
        <div>
            <img className={"notificationIcon"} src={notificationIcon} alt={"notifications icon"}
                 onClick={() => changeState("display", true)}/>
            <div style={notificationDisplay} className={"notificationPanel"}>
                <div className={"notificationPanelHeader"}>
                    <h1>Notifications</h1>
                    <img src={closeIcon} alt={"close"} onClick={() => changeState("display", false)}/>
                </div>
                <div>{notificationsList}</div>
                <Notification icon={"warning"} message={"testing"}/>
            </div>
        </div>
    );
}

export default NotificationPanel;