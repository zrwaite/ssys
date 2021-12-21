import "../styles/styles.css";
import {Link, Navigate} from "react-router-dom";
import {createCookie, deleteCookie, getCookie} from "../modules/cookies";

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
            <div>
                <h3>Do you have an account? Then Sign In here:</h3>
                <button>
                    <Link to="/signin">
                        <span className="link-text">Sign In</span>
                    </Link>
                </button>
            </div>
            <div>
                <h3>Don't have an account? Then Register here:</h3>
                <button>
                    <Link to="/register">
                        <span className="link-text">Register</span>
                    </Link>
                </button>
            </div>
        </main>
    );
}

export default Account;