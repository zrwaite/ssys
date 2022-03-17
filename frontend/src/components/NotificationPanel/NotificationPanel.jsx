import React, {useState} from "react";
import "./NotificationPanel.css";
import Notification from "./Notification";
import closeIcon from "../../images/close.svg"
import notificationIcon from '../../images/notifications.svg';

function NotificationPanel(props) {
    let [state, setState] = useState({
        display: false,
    });
    
    let notificationDisplay = {display: "none"};
    if (state.display) notificationDisplay.display = "block";

    let notificationsList = [];
    if (!props.email_confirmed) notificationsList.push(<Notification key={"email_confirmed"} default={true}
                                                                     name={"email_confirmed"}/>);
    if (!props.password_set) notificationsList.push(<Notification key={"password_set"} default={true}
                                                                  name={"password_set"}/>);

    return (
        <div>
            <img className={"icon"} src={notificationIcon} alt={"notifications icon"}
                 onClick={() => setState({...state, display:true})}/>
            <div style={notificationDisplay} className={"notificationPanel"}>
                <div className={"notificationPanelHeader"}>
                    <h1>Notifications</h1>
                    <img src={closeIcon} alt={"close"} onClick={() => setState({...state, display:false})}/>
                </div>
                <div>{notificationsList}</div>
                <Notification icon={"warning"} message={"testing"}/>
            </div>
        </div>
    );
}

export default NotificationPanel;