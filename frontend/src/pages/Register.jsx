import React, {useState} from "react";
import "../styles/styles.css";
import StudentRegistration from "../components/StudentRegistration";
import IndividualRegistration from "../components/IndividualRegistration";
import TeacherRegistration from "../components/TeacherRegistration";

function Register() {
    let [registerDisplay, setRegisterDisplay] = useState(null);
    return (
        <main>
            <header>
                <h1>Register Page</h1>
            </header>
            <h3>Register as:</h3>
            <table>
                <tbody>
                <tr>
                    <td>
                        <button onClick={() => setRegisterDisplay("student")}>Student</button>
                    </td>
                    <td>
                        <button onClick={() => setRegisterDisplay("individual")}>Individual</button>
                    </td>
                    <td>
                        <button onClick={() => setRegisterDisplay("teacher")}>Teacher</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <StudentRegistration display={registerDisplay}/>
            <IndividualRegistration display={registerDisplay}/>
            <TeacherRegistration display={registerDisplay}/>
        </main>
    );
}

export default Register;