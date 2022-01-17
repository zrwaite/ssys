import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import {createCookie, getCookie} from "../modules/cookies";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom";
import "../styles/student_registration.css";
import {Link} from "react-router-dom";

function StudentRegister(props) {
    let studentStyle
    if (props.display === "student") {
        studentStyle = {display: "block"};
    } else studentStyle = {display: "none"};

    let [state, setState] = useState({
        email: "",
        password: "",
        fname: "",
        lname: "",
        teacher_email: "",
        teacher_id: "",
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
        let json = await httpReq("/ssys/backend/api/student/", "POST", {
            email: state.email,
            password: state.password,
            fname: state.fname,
            lname: state.lname,
            teacher_email: state.teacher_email,
            teacher_id: state.teacher_id,
            registrant_type: "student"
        })
        let response = JSON.parse(json);
        let elements = [];
        console.log(response);
        if (response.success && response.objects) {
            createCookie("email", state.email);
            createCookie("registrant_type", "student");
            createCookie("token", response.objects.token);
            elements.push(<p>Email: {getCookie("email")}</p>);
            elements.push(<p>Account Type: {getCookie("registrant_type")}</p>);
            elements.push(<p>Token: {getCookie("token")}</p>);
        } else if (response.errors.length > 0) {
            for (let i = 0; i < response.errors.length; i++) {
                elements.push(<p key={i}>{response.errors[i]}</p>);
            }
        }
        ReactDOM.render(elements, document.getElementById('studentRegistrationResult'));
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <div style={studentStyle}>
            <p class="studentregistration">Student Registration</p>
            <div class="studentGrid">
            <div class="registrationPageInfo">
                <h2>blah blah blah blah</h2>
                <h3>blah blah blah blah</h3>
            </div>
            <div>
                <div class="student_register">
                    <div class="registerBlurb">
                        <h2>Sign up today!</h2>
                    </div>
                    <div>
                        <label htmlFor={"fname"}></label>
                        <input class="registerBox" placeholder="First Name" type={"text"} name={"fname"} value={state.fname} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"lname"}></label>
                        <input class="registerBox" placeholder="Last Name" type={"text"} name={"lname"} value={state.lname} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"email"}></label>
                        <input class="registerBox" placeholder="email" type={"text"} name={"email"} value={state.email} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"password"}></label>
                        <input class="registerBox" placeholder="password" type={"password"} name={"password"} value={state.password} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"teacher_email"}></label>
                        <input class="registerBox" placeholder="Teacher Email" type={"text"} name={"teacher_email"} value={state.teacher_email} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"teacher_id"}></label>
                        <input class="registerBox" placeholder="Teacher ID" type={"text"} name={"teacher_id"} value={state.teacher_id} onChange={handleInputChange}/>
                    </div>
                    <div class="center">
                        <button class="submit" onClick={sendForm}>Submit</button>
                    </div>
                    <div>
                    <Link to="/signin">
                        <span class="signedUp">Already Signed Up? Click Here<br/></span>
                    </Link>
                    </div>
                </div>
            </div>
            </div>
            <div 
                id={"studentRegistrationResult"}>
            </div>
        </div>
    )
}

export default StudentRegister;