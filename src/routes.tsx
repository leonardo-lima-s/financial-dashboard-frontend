import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Login />}></Route>
		</Routes>
	);
}

export default MainRoutes;
