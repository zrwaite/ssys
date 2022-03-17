import React, {useState} from "react";
import "../styles/styles.css";
import {httpReq} from "../modules/http_requests";
import ReactDOM from "react-dom";
import "../styles/contact.css"

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
        <div className="contactus">
            <div className="contactheader">
                <h1 className="contactuscolour">Contact Us</h1>
                <p className="contactblurb">Have any questions? Problems? Notice a bug? Please use the contact form below and we will get back to you as soon as possible!<br/></p>
                <div className="emailthing">
                    <br/>
                   <label htmlFor={"email"}>Email: </label>
                   <input type={"text"} className="emailbox" name={"email"} value={state.email} onChange={handleInputChange}/>
                   <br/>
                </div>
            </div>
            <br/>
            <div>
                <label htmlFor={"to"}>To:</label>
                <select id={"to"} name={"to"} value={state.to} onChange={handleInputChange}>
                    <option readOnly={true} value="tech">Tech Support</option>
                    <option readOnly={true} value="organizer">Conference Information</option>
                </select>
                <br/><br/>
                <label htmlFor={"message"}>Message: </label>
                <br/>
                <textarea name="message" className="messagebox" rows="10" value={state.message} onChange={handleInputChange}/>
            </div>
            <div className="bottomofgreencontact">
                  <div className="bottomofcontact">
                      <br/>
                     <button className="submit" onClick={sendForm}>Submit</button>   
                 </div>
                 <br/>
            </div>
            <div id={"contactResult"}>

            </div>
            </div>
        </main>
    );
}

export default Contact;