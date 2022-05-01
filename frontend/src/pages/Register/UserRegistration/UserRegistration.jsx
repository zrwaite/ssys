import React, {useState} from "react";
import {httpReq} from "../../../modules/http_requests";
import {createCookie} from "../../../modules/cookies";
import {Navigate} from "react-router-dom";
import "../Registration.css";
import {Link} from "react-router-dom";

function UserRegister(props) {
    let displayStyle = props.display ? {display: "block"} : {display: "none"};
    let teacherMode = props.display === "teacher";
    let [state, setState] = useState({
        code: "",
        password: "",
        fname: "",
        lname: "",
        username: "",
        redirect: false
    });
    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {
            ...state,
            redirect: false
        };
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/api/user/", "POST", {
            fname: state.fname,
            lname: state.lname,
            username: state.username,
            password: state.password,
            teacher: teacherMode,
            code: state.code
        })
        let response = JSON.parse(json);
        console.log(response);
        if (response.success && response.objects) {
            createCookie("username", state.username);
            createCookie("user_type", props.display);
            createCookie("token", response.objects.token);
            window.location.href = "/account"
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response.errors));
        }
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <div style={displayStyle}>
            <div className="registerTop">
                <h1>{props.display === "student" ? "STUDENT" : "TEACHER"} REGISTRATION</h1>
                <div className="registerBlurb">
                    <p>PLEASE ENTER YOUR INFORMATION BELOW. THIS ACCOUNT YOU WILL BE CREATING WILL BE YOUR ACCOUNT FOR
                        THE SUMMIT!</p>
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
                    <div className="registrationRight">
                        <label htmlFor={"password"}>Password</label>
                        <input className="registerBox" placeholder="PASSWORD" type={"password"} name={"password"}
                               value={state.password} onChange={handleInputChange}/>
                    </div>
                    <div className="registrationLeft">
                        <label htmlFor={"code"}>Code </label>
                        <input className="registerBox" placeholder="CODE" type={"text"} name={"code"}
                               value={state.code} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="registrationBackground2">
                <div className="registerCenter">
                        <label htmlFor={"username"}>Username </label>
                        <input className="registerBox" placeholder="USERNAME" type={"text"} name={"username"}
                               value={state.username} onChange={handleInputChange}/>
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
        </div>
    )
}

export default UserRegister;