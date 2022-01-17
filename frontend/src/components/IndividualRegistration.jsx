import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom";
import "../styles/student_registration.css";
import{Link} from "react-router-dom";

function IndividualRegister(props) {
    let individualStyle
    if (props.display === "individual") {
        individualStyle = {display: "block"};
    } else individualStyle = {display: "none"};

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
        let json = await httpReq("/api/student/", "POST", {
            email: state.email,
            password: state.password,
            fname: state.fname,
            lname: state.lname,
            registrant_type: "individual"
        })
        let response = JSON.parse(json);
        let elements = [];
        console.log(response);
        if (response.success && response.objects) {
            window.location.assign("/user");
        } else if (response.errors.length > 0) {
            for (let i = 0; i < response.errors.length; i++) {
                elements.push(<p key={i}>{response.errors[i]}</p>);
            }
        }
        ReactDOM.render(elements, document.getElementById('individualRegistrationResult'));
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <div style={individualStyle}>
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
        </div>
    )
}

export default IndividualRegister;