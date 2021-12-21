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
            <p class="blurb">asdfasdfasdfasdf<br/>asdfasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/></p>
            <div>
                    <h3 class="one">Register as:</h3>                
                </div>
            <div class="register_options">
                <div>
                        <button class="two" onClick={() => setRegisterDisplay("student")}>Student</button>
                </div>
                <div>
                        <button class="three" onClick={() => setRegisterDisplay("individual")}>Individual</button>
                </div>
                <div>
                        <button class="four" onClick={() => setRegisterDisplay("teacher")}>Teacher</button>
                </div>
            </div>
            <StudentRegistration display={registerDisplay}/>
            <IndividualRegistration display={registerDisplay}/>
            <TeacherRegistration display={registerDisplay}/>
        </main>
    );
}

export default Register;