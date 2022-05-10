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
import Navbar from "./components/Navbar";
import Workshop from "./pages/Workshop";
import TeacherCode from "./pages/TeacherCode";
import ViewUser from "./pages/ViewUser";
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
				<Navbar/>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/info" element={<Info/>}/>
					<Route path="/account" element={<Account/>}/>
					<Route path="/contact" element={<Contact/>}/>
					<Route path="/register" element={<Register/>}/>
					<Route path="/signin" element={<SignIn/>}/>
					<Route path="/user" element={<User/>}/>
					<Route path="/Workshop" element={<Workshop/>}/>
					<Route path="/TeacherCode" element={<TeacherCode/>}/>
					<Route path="/ViewUser/:userId" element={<ViewUser/>}/>
					<Route path="*" element={<>Page Not found</>}/>
				</Routes>
			</Router>
		</MobileContext.Provider>
	);
}

export default App;
export {MobileContext};
