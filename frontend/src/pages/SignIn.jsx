import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";
import {Navigate} from "react-router-dom";
import "../styles/signin.css";


import {createCookie} from "../modules/cookies";

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
            createCookie("registrant_type", response.objects.registrant_type);
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
        <main class="signinhead">
            {/*<Navigate to="/user" />*/}
            <header>
                <h1>Sign In Page</h1>
            </header>
            <div class="signin">
                <div class="signinmail">
                    <label htmlFor={"email"}>Email: </label>
                     <input type={"text"} name={"email"} value={state.email} onChange={handleInputChange}/>
                </div>
                <div class="signinpword">
                     <label htmlFor={"password"}>Password: </label>
                      <input type={"password"} name={"password"} value={state.password} onChange={handleInputChange}/>
                </div>
            </div>
            <div class="center">
                <p><br/><br/><br/></p>
                <button class="signinsubmit" onClick={sendForm}>Submit</button>
            </div>
            <div id={"signUpResult"}>

            </div>
        </main>
    );
}

export default SignIn;