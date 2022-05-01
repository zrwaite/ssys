import React, {useState} from "react";
import "./Navbar.css";
import logo from "../../components/SSYS.png";
import {Link} from "react-router-dom";



function Navbar() {
    const [active, setActive] = useState("nav_menu");
    const [toggleIcon, setToggleIcon] = useState("nav_toggler");

    const navToggle = () => {
        active==="nav_menu" ? setActive("nav_menu nav_active") : setActive("nav_menu");

        toggleIcon==="nav_toggler"?setToggleIcon("nav_toggler toggle"):setToggleIcon("nav_toggler");
    }


    return (
        <nav className="nav">
            <ul className={active}>
                <li className="nav_item">
                    <a href="/">
                    <img className="navImage"src={logo} alt="SSYS"/>
                    </a>
                </li>
                <li className="nav_item"> 
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </li>
                <li className="nav_item"> 
                    <Link to="/info">
                        <span>Info</span>
                    </Link>
                </li>
                <li className="nav_item"> 
                    <Link to="/account">
                        <span>Account</span>
                    </Link>
                </li>
                <li className="nav_item"> 
                    <Link to="/contact">
                        <span>Contact</span>
                    </Link>
                </li>
            </ul>
            <div onClick = {navToggle} className={toggleIcon}>
                <div className="navMenu">☰</div>
            </div>
        </nav>
    );
}
export default Navbar;
