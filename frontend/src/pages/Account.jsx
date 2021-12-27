import "../styles/styles.css";
import {Link, Navigate} from "react-router-dom";
import {deleteCookie, getCookie} from "../modules/cookies";
import "../styles/account.css";

function Account() {

    if (getCookie("email") && getCookie("token") && getCookie("registrant_type")) {
        return <Navigate to='/user'/>;
    } else {
        deleteCookie("email");
        deleteCookie("token");
        deleteCookie("registrant_type");
    }

    return (
        <main>
            <h1>Account Page</h1>
            <div class="acc">
             <div class="sign">
                    <h3>Do you have an account? Then Sign In here:</h3>
                        <Link to="/signin" className="signbutton">
                            <span className="signtext">Sign In</span>
                        </Link> 
                </div>
                <div class="reg">
                    <h3>Don't have an account? Then Register here:</h3>
                         <Link to="/register" className="regbutton">
                           <span className="regtext">Register</span>
                        </Link>
                </div>
            </div>
        </main>
    );
}

export default Account;