import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes.tsx";
import { ChakraBaseProvider, extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";

const { Button, Input } = chakraTheme.components;

const theme = extendBaseTheme({
	components: {
		Button,
		Input,
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraBaseProvider theme={theme}>
		<BrowserRouter>
			<MainRoutes />
		</BrowserRouter>
	</ChakraBaseProvider>
);
