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
        let partialState = {...state};
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/api/user/", "POST", {
            email: state.email,
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
            <p className="studentregistration">Student Registration</p>
            <div className="studentGrid">
            <div className="registrationPageInfo">
                <h2>blah blah blah blah</h2>
                <h3>blah blah blah blah</h3>
            </div>
            <div>
                <div className="student_register">
                    <div className="registerBlurb">
                        <h2>Sign up today!</h2>
                    </div>
                    <div>
                        <label htmlFor={"fname"}></label>
                        <input className="registerBox" placeholder="First Name" type={"text"} name={"fname"} value={state.fname} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"lname"}></label>
                        <input className="registerBox" placeholder="Last Name" type={"text"} name={"lname"} value={state.lname} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"email"}></label>
                        <input className="registerBox" placeholder="email" type={"text"} name={"email"} value={state.email} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor={"password"}></label>
                        <input className="registerBox" placeholder="password" type={"password"} name={"password"} value={state.password} onChange={handleInputChange}/>
                    </div>
                    <div className="center">
                        <button className="submit" onClick={sendForm}>Submit</button>
                    </div>
                    <div>
                    <Link to="/signin">
                        <span className="signedUp">Already Signed Up? Click Here<br/></span>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TeacherRegister;