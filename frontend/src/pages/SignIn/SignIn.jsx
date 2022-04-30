import React, {useState} from "react";
import {httpReq} from "../../modules/http_requests";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";
import "./SignIn.css";


import {createCookie} from "../../modules/cookies";

function SignIn() {
    let [state, setState] = useState({
        email: "",
        password: "",
        redirect: false
    });
    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {
            email: state.email,
            password: state.password,
            redirect: false
        };
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);
    const sendForm = async () => {
        let json = await httpReq("/auth/", "POST", {
            email: state.email,
            password: state.password,
            type: "signIn"
        })
        let response = JSON.parse(json);
        if (response.success) {
            createCookie("email", state.email);
            createCookie("user_type", response.objects.user_type);
            createCookie("token", response.objects.token);
            setState({
                email: state.email,
                password: state.password,
                redirect: true
            });
            // ReactDOM.render(<Link to="/user" >Go to user page</Link>, document.getElementById('signUpResult'));
        } else if (response.errors.length > 0) {
            let elements = [];
            for (let i = 0; i < response.errors.length; i++) {
                elements.push(<p key={i}>{response.errors[i]}</p>);
            }
            ReactDOM.render(elements, document.getElementById('signUpResult'));
        }
    }

    if (state.redirect) {
        return <Navigate to='/user'/>;
    }

    return (
        <main className="registerBackColour">
            {/*<Navigate to="/user" />*/}
            <div className="signInTop">
                <h1>SIGN IN</h1>
                <div className="signInBlurb">
                    <p>ALREADY HAVE AN ACCOUNT? SIGN IN HERE!</p>
                </div>
            </div>
            <div className="signInGrid">
                <div>
                    <label htmlFor={"email"}></label>
                     <input type={"text"} className="signInBox" name={"email"} placeholder="EMAIL@SCDSB.ON.CA" value={state.email} onChange={handleInputChange}/>
                </div>
                <div>
                     <label htmlFor={"password"}></label>
                      <input type={"password"} className="signInBox" placeholder="PASSWORD" name={"password"} value={state.password} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="signInBackground">
                <div className="signInCenter">
                    <button className="submitSignIn" onClick={sendForm}>Log In</button>
                </div>
            </div>
                <Link to="/register">
                        <span>Haven't yet signed up? Click here<br/></span>
                    </Link>
                    <Link to="/contact">
                        <span>Forgot your credentials? Click here</span>
                    </Link>
            <div id={"signUpResult"}>

            </div>
        </main>
    );
}

export default SignIn;