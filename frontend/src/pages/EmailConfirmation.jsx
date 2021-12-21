import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";

function EmailConfirmation() {
    const queries = new URLSearchParams(window.location.search);
    let email = queries.get('email')
    if (!email) email = false;
    let [state, setState] = useState("");
    let handleInputChange = (event) => setState(event.target.value);
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/auth/", "POST", {
            confirmation_code: state,
            email: email,
            type: "confirmEmail"
        });
        let response = JSON.parse(json);
        let elements = [];
        console.log(response);
        if (response.success && response.objects) {
            elements.push(<p>Success: true</p>);
        } else if (response.errors.length > 0) {
            for (let i = 0; i < response.errors.length; i++) {
                elements.push(<p key={i}>{response.errors[i]}</p>);
            }
        }
        ReactDOM.render(elements, document.getElementById('emailConfirmationResult'));
    }

    return (
        <main>
            <header>
                <h1>Email Confirmation</h1>
                <div>
                    <h4>Email: {email}</h4>
                    <label htmlFor={"confirmation_code"}>Confirmation Code: </label>
                    <input type={"text"} name={"confirmation_code"} value={state} onChange={handleInputChange}/>
                    <br/>
                    <button onClick={sendForm}>Submit</button>
                </div>
                <div id={"emailConfirmationResult"}>

                </div>
            </header>
        </main>
    );
}

export default EmailConfirmation;