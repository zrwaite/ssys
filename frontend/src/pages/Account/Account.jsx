
import {Link, Navigate} from "react-router-dom";
import {deleteCookie, getCookie} from "../../modules/cookies";
import "./Account.css";

function Account() {

    if (getCookie("email") && getCookie("token") && getCookie("user_type")) {
        return <Navigate to='/user'/>;
    } else {
        deleteCookie("email");
        deleteCookie("token");
        deleteCookie("user_type");
    }

    return (
        <main>
            <div className="top">
                <h1>REGISTER/SIGN IN</h1>
                <div className="accBlurb">
                    <p>Make sure you don't miss out on this incredible opportunity! Register now before it's too late!</p>
                </div>
            </div>
            <p><br/></p>
            <div className="acc">
              <div className="accReg">
                         <Link to="/register" className="accButton">
                           <span>Register</span>
                        </Link>
                </div>
                <div className="accSign">
                        <Link to="/signin" className="accButton">
                            <span>Sign In</span>
                        </Link> 
                </div>
            </div>
        </main>
    );
}

export default Account;