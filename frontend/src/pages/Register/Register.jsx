import React, {useState} from "react";
import "./Register.css";
import UserRegister from "./UserRegistration";

function Register() {
    let [registerDisplay, setRegisterDisplay] = useState(null);
    return (
        <main>
            <div className="topReg">
                <h1>Register</h1>
                <div className="regBlurb">
                    <p>Congratulations! You're one step closer to joining us for a day of fun, interactive workshops and
                        impactful speeches from experts in the environmental field!<br/><br/>*Please not the summit is
                        not open for individual registration</p>
                </div>
            </div>
            <div className="bodyOption">
                <div className="register_options">
                    <div className="regBodyBox1">
                        <button className="regButton" onClick={() => setRegisterDisplay("student")}>Student</button>
                    </div>
                    <div className="regBodyBox2">
                        <button className="regButton" onClick={() => setRegisterDisplay("teacher")}>Teacher</button>
                    </div>
                </div>
            </div>
            <UserRegister display={registerDisplay}/>
        </main>
    );
}

export default Register;