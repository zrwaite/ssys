import React, {useState} from "react";
import "./StudentCodes.css";
import {httpReq} from "../../modules/http_requests";
import {getCookie} from "../../modules/cookies";

const StudentCodes = () => {
    let [state, setState] = useState({
        editMode: false,
        numCodes: "",
    });
    let [codes, setCodes] = useState([]);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let partialState = {...state};
        partialState[name] = value;
        setState(partialState);
    }

    const getCodes = async () => {
        let json = await httpReq("/api/codes/", "POST", {
            username: getCookie("username"),
            num_codes: state.numCodes,
            teacher: false
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            setCodes([...codes, ...response.objects])
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response.errors));
        }
    }
    return (
        <div className={"conferenceInfoPanel userPagePanel"}>
            <div className={"infoHeader"}>
                <h2>Get Student Access Codes</h2>
            </div>
            <div className={"infoBody"}>
                <input type={"text"} value={state.numCodes} name={"numCodes"} onChange={handleInputChange}/>
                <ul>
                    {
                        codes.map((code, i) => {
                            return (<li key={i}>{code}</li>)
                        })
                    }
                </ul>
                <div>
                    <button className={"blackButton"} onClick={getCodes}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default StudentCodes;