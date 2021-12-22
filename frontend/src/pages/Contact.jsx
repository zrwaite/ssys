import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";

function Contact() {
    let [state, setState] = useState({
        email: "",
        to: "tech",
        message: "",
        submitted: false
    });
    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {
            email: state.email,
            to: state.to,
            message: state.message,
            submitted: false
        };
        partialState[name] = value;
        setState(partialState);
    }
    handleInputChange = handleInputChange.bind(this);

    const sendForm = async () => {
        let json = await httpReq("/api/contact/", "POST", {
            email: state.email,
            to: state.to,
            message: state.message
        })
        let response = JSON.parse(json);
        if (response.success) {
            setState({
                email: "",
                to: "",
                message: "",
                submitted: true
            });
            let element = (
                <p>Thank you for filling out the form!</p>
            )
            ReactDOM.render(element, document.getElementById('contactResult'));

        } else if (response.errors.length > 0) {
            let elements = [];
            for (let i = 0; i < response.errors.length; i++) {
                elements.push(<p key={i}>{response.errors[i]}</p>);
            }
            ReactDOM.render(elements, document.getElementById('contactResult'));
        }
    }

    return (
        <main>
            <header>
                <h1>Contact Page</h1>
            </header>
            <div>
                <label htmlFor={"email"}>Email: </label>
                <input type={"text"} name={"email"} value={state.email} onChange={handleInputChange}/>
                <br/>
                <label htmlFor={"to"}>To:</label>
                <select id={"to"} name={"to"} value={state.to} onChange={handleInputChange}>
                    <option value="tech">Tech Support</option>
                    <option value="organizer">Conference Information</option>
                </select>
                <br/>
                <label htmlFor={"message"}>Message: </label>
                <br/>
                <textarea name="message" rows="10" cols="30" value={state.message} onChange={handleInputChange}/>
                <br/>
                <button onClick={sendForm}>Submit</button>
            </div>
            <div id={"contactResult"}>

            </div>
        </main>
    );
}

export default Contact;