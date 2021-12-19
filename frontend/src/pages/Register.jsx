import React, {useState} from "react";
import "../styles/styles.css";
import StudentRegistration from "../components/StudentRegistration";
import IndividualRegistration from "../components/IndividualRegistration";
import TeacherRegistration from "../components/TeacherRegistration";
import "../styles/register.css";

function Register() {
    let [registerDisplay, setRegisterDisplay] = useState(null);
    return (
        <main>
            <header>
                <h1>Register Page</h1>
            </header>
            <div class="register_options">
                <div class="one">
                    <h3>Register as:</h3>                
                </div>
                <div class="two">
                        <button onClick={() => setRegisterDisplay("student")}>Student</button>
                </div>
                <div class="three">
                        <button onClick={() => setRegisterDisplay("individual")}>Individual</button>
                </div>
                <div class="four">
                        <button onClick={() => setRegisterDisplay("teacher")}>Teacher</button>
                </div>
            </div>
            <StudentRegistration display={registerDisplay}/>
            <IndividualRegistration display={registerDisplay}/>
            <TeacherRegistration display={registerDisplay}/>
        </main>
    );
}

export default Register;