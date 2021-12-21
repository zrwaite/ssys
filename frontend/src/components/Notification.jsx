import React from "react";
import "../styles/styles.css";
import "../styles/notification_panel.css";
import warningIcon from '../images/warning.svg';
import mailIcon from '../images/mail.svg';
import {httpReq} from "../modules/http_requests";
import {getCookie} from "../modules/cookies";


function NotificationPanel(props) {
    if (!props.default) {
        let icon = mailIcon;
        switch (props.icon) {
            case "mail":
                break;
            case "warning":
                icon = warningIcon;
                break;
        }
        return (
            <div className={"notification"}>
                <img src={icon} alt={"icon"}/>
                <div>
                    <p>{props.message}</p>
                </div>
            </div>
        );
    } else {
        switch (props.name) {
            case "email_confirmed":
                const mailConfirmation = async () => {
                    let json = await httpReq("/api/mail/", "POST", {
                        email: getCookie("email"),
                        type: "email_confirmed"
                    })
                    let response = JSON.parse(json);
                    if (response.success) {
                        alert("mail sent");
                    } else if (response.errors.length > 0) {
                        alert(JSON.stringify(response.errors));
                    }
                }
                return (
                    <div className={"notification"}>
                        <img src={warningIcon} alt={"warning icon"}/>
                        <div>
                            <p>Your email hasn’t been confirmed! Check your email or click here to send a new one:</p>
                            <button onClick={() => mailConfirmation()}>Send new code</button>
                        </div>
                    </div>
                )
            default:
                alert('error, undefined notification')
                return (<></>);
        }
    }
}

export default NotificationPanel;