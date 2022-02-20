import React, {useState} from "react";
import "../styles/styles.css";
import StudentRegistration from "../components/StudentRegistration";
import IndividualRegistration from "../components/IndividualRegistration";
import TeacherRegistration from "../components/TeacherRegistration";
import "../styles/register.css";

function Register() {
    let [registerDisplay, setRegisterDisplay] = useState(null);
    return (
        <main className="registerBackColour">
            <header>
                <h1>Register Page</h1>
            </header>
            <div>
                    <h3 className="one">Register as:</h3>                
                </div>
            <div className="register_options">
                <div>
                        <button className="two" onClick={() => setRegisterDisplay("student")}>Student</button>
                </div>
                <div>
                        <button className="three" onClick={() => setRegisterDisplay("individual")}>Individual</button>
                </div>
                <div>
                        <button className="four" onClick={() => setRegisterDisplay("teacher")}>Teacher</button>
                </div>
            </div>
            <StudentRegistration display={registerDisplay}/>
            <IndividualRegistration display={registerDisplay}/>
            <TeacherRegistration display={registerDisplay}/>
        </main>
    );
}

export default Register;