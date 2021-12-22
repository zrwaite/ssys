import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom";
import "../styles/student_registration.css";

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
        let json = await httpReq("/api/student/", "POST", {
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
            window.location.assign("/account");
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
            <div class="student_register">
            <div class="firstname">
                <label htmlFor={"fname"}>First Name: </label>
                <input type={"text"} name={"fname"} value={state.fname} onChange={handleInputChange}/>
                </div>
                <div class="lastname">
                <label htmlFor={"lname"}>Last Name: </label>
                <input type={"text"} name={"lname"} value={state.lname} onChange={handleInputChange}/>
                </div>
                <div class="mail">
                <label htmlFor={"email"}>Email: </label>
                <input type={"text"} name={"email"} value={state.email} onChange={handleInputChange}/>
                </div>
                <div class="pword">
                <label htmlFor={"password"}>Password: </label>
                <input type={"password"} name={"password"} value={state.password} onChange={handleInputChange}/>
                </div>
                <div class="temail">
                <label htmlFor={"teacher_email"}>Teacher Email: </label>
                <input type={"text"} name={"teacher_email"} value={state.teacher_email} onChange={handleInputChange}/>
                </div>
                <div class="tid">
                <label htmlFor={"teacher_id"}>Teacher Id: </label>
                <input type={"text"} name={"teacher_id"} value={state.teacher_id} onChange={handleInputChange}/>
                </div>
                <div class="submit">
                <button onClick={sendForm}>Submit</button>
                </div>
            </div>
            <div id={"studentRegistrationResult"}>

            </div>
        </div>
    )
}

export default StudentRegister;