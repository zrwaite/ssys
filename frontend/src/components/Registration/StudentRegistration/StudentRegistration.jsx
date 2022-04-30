import React, {useState} from "react";
import {httpReq} from "../../../modules/http_requests";
import {createCookie} from "../../../modules/cookies";
import {Navigate} from "react-router-dom";
import "../Registration.css";
import {Link} from "react-router-dom";

function StudentRegister(props) {
    let studentStyle
    if (props.display === "student") {
        studentStyle = {display: "block"};
    } else studentStyle = {display: "none"};

    let [state, setState] = useState({
        code: "",
        password: "",
        fname: "",
        lname: "",
        redirect: false
    });
    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {
            email: state.email,
            password: state.password,
            fname: state.fname,
            lname: state.lname,
            teacher_email: state.teacher_email,
            teacher_id: state.teacher_id,
            redirect: false
        };
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/api/user/", "POST", {
            password: state.password,
            fname: state.fname,
            lname: state.lname,
            user_type: "student"
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            createCookie("email", state.email);
            createCookie("user_type", "student");
            createCookie("token", response.objects.token);
            // elements.push(<p>Email: {getCookie("email")}</p>);
            // elements.push(<p>Account Type: {getCookie("user_type")}</p>);
            // elements.push(<p>Token: {getCookie("token")}</p>);
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response.errors));
        }
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <div style={studentStyle}>
            <div className="registerTop">
                <h1>STUDENT REGISTRATION</h1>
                <div className="registerBlurb">
                    <p>PLEASE ENTER YOUR INFORMATION BELOW. THIS ACCOUNT YOU WILL BE CREATING WILL BE YOUR ACCOUNT FOR THE SUMMIT!</p>
                </div>
            </div>
            <div>
                <div className="registrationOptions">
                    <div className="registrationRight">
                        <label htmlFor={"fname"}>First name</label>
                        <input className="registerBox" placeholder="FIRST NAME" type={"text"} name={"fname"}
                               value={state.fname} onChange={handleInputChange}/>
                    </div>
                    <div className="registrationLeft">
                        <label htmlFor={"lname"}>Last name</label>
                        <input className="registerBox" placeholder="LAST NAME" type={"text"} name={"lname"}
                               value={state.lname} onChange={handleInputChange}/>
                    </div>
                    <div className="registrationLeft">
                        <label htmlFor={"password"}>Password</label>
                        <input className="registerBox" placeholder="PASSWORD" type={"password"} name={"password"}
                               value={state.password} onChange={handleInputChange}/>
                    </div>
                    <div className="registrationLeft">
                        <label htmlFor={"code"}>Code </label>
                        <input className="registerBox" placeholder="CODE" type={"password"} name={"code"}
                               value={state.code}
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="registrationBackground">
                    <div className="registerCenter">
                        <button className="submitRegistration" onClick={sendForm}>Submit</button>
                    </div>
                </div>
            </div>
            <div>
                <Link to="/signin">
                    <span className="signedUp">Already Signed Up? Click Here<br/></span>
                </Link>
            </div>
            <div
                id={"studentRegistrationResult"}>
            </div>
        </div>
    )
}

export default StudentRegister;