import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes.tsx";
import { ChakraBaseProvider, extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";
import React from "react";

const { Button, Input, Modal, Toast, Alert } = chakraTheme.components;

const theme = extendBaseTheme({
	components: {
		Button,
		Input,
		Modal,
		Toast,
		Alert,
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraBaseProvider theme={theme}>
			<BrowserRouter>
				<MainRoutes />
			</BrowserRouter>
		</ChakraBaseProvider>
	</React.StrictMode>
);
