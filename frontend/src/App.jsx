import React, {useState, useEffect} from "react";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import "./styles/styles.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import EmailConfirmation from "./pages/EmailConfirmation";
import Navbar from "./components/Navbar";
import Workshop1 from "./pages/Workshop1";
import {mobileWidth} from "./constants";

const MobileContext = React.createContext({
	mobile: false,
	setMobile: () => {},
});

function App() {
	const [mobile, setMobile] = useState(false);
	const mobileValue = {mobile, setMobile};
	function updateSizing() {
		const root = document.querySelector(":root");
		if (root) {
			if (window.innerWidth < mobileWidth) {
				root.style.setProperty("--bgcolor", "#F8F8F8");
				root.style.setProperty("--defaultTextAlign", "left");
				setMobile(true);
			} else {
				setMobile(false);
				root.style.setProperty("--bgcolor", "white");
				root.style.setProperty("--defaultTextAlign", "center");
			}
		}
	}
	useEffect(() => {
		window.addEventListener("resize", updateSizing);
		updateSizing();
	});
	return (
		<MobileContext.Provider value={mobileValue}>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/info" element={<Info />}></Route>
					<Route path="/account" element={<Account />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/signin" element={<SignIn />}></Route>
					<Route path="/user" element={<User />}></Route>
					<Route path="/confirmEmail" element={<EmailConfirmation />}></Route>
					<Route path="/Workshop1" element={<Workshop1 />}></Route>
				</Routes>
			</Router>
		</MobileContext.Provider>
	);
}

export default App;
export {MobileContext};
