import {Link} from "react-router-dom";
import {signedIn} from "../../modules/cookies";
import "./Account.css";

function Account() {

    if (signedIn()) window.location.href = "/user";

    return (
        <main>
            <div className="accTop">
                <h1>REGISTER/SIGN IN</h1>
                <div className="accBlurb">
                    <p>Make sure you don't miss out on this incredible opportunity! Register now before it's too late!</p>
                </div>
            </div>
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