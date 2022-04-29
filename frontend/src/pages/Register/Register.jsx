import React, {useState} from "react";
import StudentRegistration from "../../components/Registration/StudentRegistration";
// import IndividualRegistration from "../components/Registration/IndividualRegistration";
import TeacherRegistration from "../../components/Registration/TeacherRegistration";
import "./Register.css";

function Register() {
    let [registerDisplay, setRegisterDisplay] = useState(null);
    return (
        <main>
            <div className="topReg">
                    <h1>Register</h1>
                    <div className="regBlurb">
                        <p>Congratulations! You're one step closer to joining us for a day of fun, interactive workshops and impactful speeches from experts in the environmental field!</p>
                        </div>                
                </div>
            <div className="bodyOption">
             <div className="register_options">
                 <div className="regBodyBox1">
                        <button className="regOne" onClick={() => setRegisterDisplay("student")}>Student</button>
                </div>
                <div className="regBodyBox2">
                        <button className="regTwo" onClick={() => setRegisterDisplay("teacher")}>Teacher</button>
                </div>
             </div>
            </div>
            <StudentRegistration display={registerDisplay}/>
            {/* <IndividualRegistration display={registerDisplay}/> */}
            <TeacherRegistration display={registerDisplay}/>
        </main>
    );
}

export default Register;