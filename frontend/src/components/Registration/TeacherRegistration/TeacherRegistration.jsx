import React, {useState} from "react";
import {httpReq} from "../../../modules/http_requests";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom";
import "../Registration.css";
import{Link} from "react-router-dom";

function TeacherRegister(props) {
    let teacherStyle;
    if (props.display === "teacher") {
        teacherStyle = {display: "block"};
    } else teacherStyle = {display: "none"};

    let [state, setState] = useState({
        username: "",
        password: "",
        fname: "",
        lname: "",
        redirect: false
    });

    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {...state};
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/api/user/", "POST", {
            username: state.username,
            password: state.password,
            fname: state.fname,
            lname: state.lname,
            user_type: "teacher"
        })
        let response = JSON.parse(json);
        let elements = [];
        if (response.success && response.objects) {
            window.location.assign("/account");
        } else if (response.errors.length > 0) {
            for (let i = 0; i < response.errors.length; i++) {
                elements.push(<p key={i}>{response.errors[i]}</p>);
            }
        }
        ReactDOM.render(elements, document.getElementById('teacherRegistrationResult'));
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <div style={teacherStyle}>
            <div className="registerTop">
                <h1>TEACHER REGISTRATION</h1>
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
                    <div className="registrationRight">
                        <label htmlFor={"username"}>Username</label>
                        <input className="registerBox" placeholder="USERNAME" type={"text"} name={"username"}
                               value={state.username} onChange={handleInputChange}/>
                    </div>
                    <div className="registrationLeft">
                        <label htmlFor={"password"}>Password</label>
                        <input className="registerBox" placeholder="PASSWORD" type={"password"} name={"password"}
                               value={state.password} onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
            <div className="registrationBackground">
                <div className="registerCenter">
                    <button className="submitRegistration" onClick={sendForm}>Submit</button>
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

export default TeacherRegister;