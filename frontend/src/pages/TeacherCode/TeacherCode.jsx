import React, {useState} from "react";
import "./TeacherCode.css";
import {httpReq} from "../../modules/http_requests";

function TeacherCode() {
    let [state, setState] = useState({
        password: ""
    });
    let [code, setCode] = useState([]);

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
            password: state.password,
            teacher: true
        })
        let response = JSON.parse(json);
        if (response.success && response.objects) {
            setCode(response.objects)
        } else if (response.errors.length > 0) {
            alert(JSON.stringify(response.errors));
        }
    }
    return (
        <main>
            <div className="teacherCodeTop">
                <h1>Blythe's Page</h1>
                <div className="teacherCodeBlurb">
                    <p>This is a page for Blythe. If you are not Blythe, then this page is not for you.</p>
                </div>
            </div>
            <div className="teacherCodeBody">
                <div className="teacherCodeBoxBox">
                    <label>password</label>
                    <input className="teacherCodeBox" placeholder="PASSWORD" type={"text"} name={"password"}
                           onChange={handleInputChange}/>
                </div>
                <div className="teacherCodeCenter">
                    <p>Code: {code}</p>
                    <button className="teacherCodeSubmit" onClick={getCodes}>Submit</button>
                </div>
        </div>
    </main>
    );
}

export default TeacherCode;
