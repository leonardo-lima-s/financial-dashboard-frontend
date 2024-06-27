import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Box,
	Button,
	Card,
	CardBody,
	Center,
	Alert,
	AlertIcon,
	AlertTitle,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	VStack,
	useColorMode,
	CircularProgress,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

function Login() {
	const { colorMode } = useColorMode();
	const baseUrl = "http://localhost:3000";
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const body = JSON.stringify({ email, password });
		await doLogin(body);
	};

	const doLogin = async (body) => {
		const xhr = new XMLHttpRequest();
		xhr.open("post", `${baseUrl}/api/users/login`);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = function () {
			if (xhr.status === 200) {
				setSuccess("Login realizado com sucesso");
				setIsLoading(false);
				setIsLoggedIn(true);
				navigate("/home");
			} else {
				setError("Invalid username or password");
				setIsLoading(false);
			}
		};

		xhr.send(body);
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const SignupModal = () => {
		const [nameSignup, setNameSignup] = useState("");
		const [emailSignup, setEmailSignup] = useState("");
		const [passwordSignup, setPasswordSignup] = useState("");
		const toast = useToast();

		const signupHandler = async (event) => {
			event.preventDefault();
			const body = JSON.stringify({ userName: nameSignup, email: emailSignup, password: passwordSignup });
			await doSignup(body);
			onClose();
		};

		const doSignup = async (body) => {
			const xhr = new XMLHttpRequest();
			xhr.open("post", `${baseUrl}/api/users/signup`);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onload = function () {
				if (xhr.status === 201) {
					const { userName } = JSON.parse(xhr.responseText);
					toast({
						title: "Usuário criado com sucesso!",
						description: `Usuário ${userName} foi criado com sucesso!`,
						status: "success",
						duration: 1500,
						isClosable: true,
					});
				} else {
					toast({
						title: "Erro no cadastro",
						description: "Não foi possível realizar o cadastro",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				}
			};

			xhr.send(body);
		};
		return (
			<>
				<Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Cadastrar</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<form>
								<FormControl isRequired>
									<FormLabel>Nome</FormLabel>
									<Input
										type="text"
										bg="white"
										borderColor="#d8dee4"
										size="sm"
										borderRadius="6px"
										color={colorMode === "dark" ? "black" : "black"}
										value={nameSignup}
										onChange={(e) => {
											setNameSignup(e.target.value);
										}}
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel>Email</FormLabel>
									<Input
										type="text"
										bg="white"
										borderColor="#d8dee4"
										size="sm"
										borderRadius="6px"
										color={colorMode === "dark" ? "black" : "black"}
										value={emailSignup}
										onChange={(e) => {
											setEmailSignup(e.target.value);
										}}
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel>Senha</FormLabel>
									<Input
										type="password"
										bg="white"
										borderColor="#d8dee4"
										size="sm"
										borderRadius="6px"
										color={colorMode === "dark" ? "black" : "black"}
										value={passwordSignup}
										onChange={(e) => {
											setPasswordSignup(e.target.value);
										}}
									/>
								</FormControl>
								<ModalFooter>
									<Button
										bg="#2da44e"
										color="white"
										size="sm"
										_hover={{ bg: "#2c974b" }}
										_active={{ bg: "#298e46" }}
										onClick={signupHandler}
									>
										{"Cadastrar"}
									</Button>
									<Button
										bg="#2da44e"
										color="white"
										size="sm"
										_hover={{ bg: "#2c974b" }}
										_active={{ bg: "#298e46" }}
										onClick={onClose}
									>
										{"Fechar"}
									</Button>
								</ModalFooter>
							</form>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		);
	};

	return (
		<>
			<Box>
				<Flex justify="center" align="center" height="80vh">
					<Center>
						<Stack spacing="4">
							<VStack spacing="6">
								<Heading fontWeight="500" fontSize="30px" letterSpacing="-0.5px">
									Login
								</Heading>
							</VStack>
							<Card
								bg="#f6f8fa"
								variant="outline"
								borderColor="#d8dee4"
								w="308px"
								size="lg"
								borderRadius={8}
								boxShadow="lg"
							>
								<CardBody>
									<form onSubmit={submitHandler}>
										{error && !isLoggedIn && (
											<Alert status="error" variant="solid">
												<AlertIcon />
												<AlertTitle>{error}</AlertTitle>
											</Alert>
										)}
										{isLoggedIn && (
											<Alert status="success" variant="solid">
												<AlertIcon />
												<AlertTitle>{success}</AlertTitle>
											</Alert>
										)}

										<Stack spacing="4">
											<FormControl isRequired>
												<FormLabel size="sm" color={colorMode === "dark" ? "black" : "black"}>
													E-mail
												</FormLabel>
												<Input
													type="text"
													bg="white"
													borderColor="#d8dee4"
													size="sm"
													borderRadius="6px"
													color={colorMode === "dark" ? "black" : "black"}
													value={email}
													onChange={(e) => {
														setEmail(e.target.value);
													}}
												/>
											</FormControl>
											<FormControl isRequired>
												<HStack justify="space-between">
													<FormLabel size="sm" color={colorMode === "dark" ? "black" : "black"}>
														Senha
													</FormLabel>
													<Button as="a" href="#" variant="link" size="xs" color="#0969da" fontWeight="500">
														Esqueceu sua senha?
													</Button>
												</HStack>
												<Input
													type="password"
													bg="white"
													borderColor="#d8dee4"
													size="sm"
													borderRadius="6px"
													color={colorMode === "dark" ? "black" : "black"}
													value={password}
													onChange={(e) => {
														setPassword(e.target.value);
													}}
												/>
											</FormControl>

											<Button
												type="submit"
												bg="#2da44e"
												color="white"
												size="sm"
												_hover={{ bg: "#2c974b" }}
												_active={{ bg: "#298e46" }}
											>
												{isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Logar"}
											</Button>
										</Stack>
									</form>
									<SignupModal />

									<br></br>
									<Stack spacing="4">
										<Button
											type="submit"
											bg="#2da44e"
											color="white"
											size="sm"
											_hover={{ bg: "#2c974b" }}
											_active={{ bg: "#298e46" }}
											onClick={onOpen}
										>
											{"Cadastrar"}
										</Button>
									</Stack>
								</CardBody>
							</Card>
						</Stack>
					</Center>
				</Flex>
			</Box>
		</>
	);
}

export default Login;
