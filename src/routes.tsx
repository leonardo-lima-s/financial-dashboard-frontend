import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Login />}></Route>
			<Route path="/home" element={<Home />}></Route>
		</Routes>
	);
}

export default MainRoutes;
