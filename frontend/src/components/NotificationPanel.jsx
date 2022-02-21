import React, {useState} from "react";
import "../styles/styles.css";
import "../styles/notification_panel.css";
import Notification from "./Notification";
import closeIcon from "../images/close.svg"
import notificationIcon from '../images/notifications.svg';

function NotificationPanel(props) {
    let [state, setState] = useState({
        display: false,
        password_set: true,
        email_confirmed: true
    });
    React.useEffect(() => {
        props.renderData.current = renderData
    })
    
    const renderData = (password_set, email_confirmed) => {
        setState({
            ...state,
            password_set: password_set,
            email_confirmed: email_confirmed
        });
    } 
    let notificationDisplay = {display: "none"};
    if (state.display) notificationDisplay.display = "block";

    let notificationsList = [];
    if (!state.email_confirmed) notificationsList.push(<Notification key={"email_confirmed"} default={true}
                                                                     name={"email_confirmed"}/>);
    if (!state.password_set) notificationsList.push(<Notification key={"password_set"} default={true}
                                                                  name={"password_set"}/>);

    return (
        <div>
            <img className={"notificationIcon"} src={notificationIcon} alt={"notifications icon"}
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