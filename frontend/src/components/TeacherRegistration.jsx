import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom";

function TeacherRegister(props) {
    let teacherStyle;
    if (props.display === "teacher") {
        teacherStyle = {display: "block"};
    } else teacherStyle = {display: "none"};

    let [state, setState] = useState({
        email: "",
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
            redirect: false
        };
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        console.log(state);
        let json = await httpReq("/api/teacher/", "POST", {
            email: state.email,
            password: state.password,
            fname: state.fname,
            lname: state.lname
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
        ReactDOM.render(elements, document.getElementById('teacherRegistrationResult'));
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <div style={teacherStyle}>
            <p>Teacher Registration</p>
            <div>
                <label htmlFor={"email"}>Email: </label>
                <input type={"text"} name={"email"} value={state.email} onChange={handleInputChange}/>
                <br/>
                <label htmlFor={"password"}>Password: </label>
                <input type={"password"} name={"password"} value={state.password} onChange={handleInputChange}/>
                <br/>
                <label htmlFor={"fname"}>First Name: </label>
                <input type={"text"} name={"fname"} value={state.fname} onChange={handleInputChange}/>
                <br/>
                <label htmlFor={"lname"}>Last Name: </label>
                <input type={"text"} name={"lname"} value={state.lname} onChange={handleInputChange}/>
                <br/>
                <button onClick={sendForm}>Submit</button>
            </div>
            <div id={"teacherRegistrationResult"}>

            </div>
        </div>
    )
}

export default TeacherRegister;