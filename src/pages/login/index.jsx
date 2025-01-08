import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Box,
	Button,
	Card,
	CardBody,
	Center,
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
	FormErrorMessage,
} from "@chakra-ui/react";

function Login() {
	const { colorMode } = useColorMode();
	const baseUrl = "http://localhost:3000";
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();

	const showToastMessage = ({ title, description, status, duration, isClosable }) => {
		toast({
			title,
			description,
			status,
			duration,
			isClosable,
		});
	};

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
				navigate("/home");
			} else {
				showToastMessage({
					title: "Erro ao logar",
					description: `Não foi possivel realizar o login. Motivo: ${xhr.responseText}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
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

		const isUserNameInvalid = nameSignup === "";
		const isEmailInvalid = emailSignup === "";
		const isPasswordInvalid = passwordSignup === "";

		const signupHandler = async (event) => {
			event.preventDefault();
			const body = JSON.stringify({ userName: nameSignup, email: emailSignup, password: passwordSignup });
			await doSignup(body);
		};

		const doSignup = async (body) => {
			const xhr = new XMLHttpRequest();
			xhr.open("post", `${baseUrl}/api/users/signup`);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onload = function () {
				if (xhr.status === 201) {
					const { userName } = JSON.parse(xhr.responseText);
					showToastMessage({
						title: "Usuário criado com sucesso!",
						description: `Usuário ${userName} foi criado com sucesso!`,
						status: "success",
						duration: 5000,
						isClosable: true,
					});

					onClose();
				} else {
					showToastMessage({
						title: "Erro no cadastro",
						description: `Não foi possível realizar o cadastro. Motivo: ${xhr.responseText}`,
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
								<FormControl isInvalid={isUserNameInvalid}>
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
									{!isUserNameInvalid ? (
										<></>
									) : (
										<FormErrorMessage>Campo nome do usuário é obrigatório.</FormErrorMessage>
									)}
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
									{!isEmailInvalid ? <></> : <FormErrorMessage>Campo e-mail é obrigatório.</FormErrorMessage>}
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
									{!isPasswordInvalid ? <></> : <FormErrorMessage>Campo senha é obrigatório.</FormErrorMessage>}
								</FormControl>
								<ModalFooter align="left">
									{/* <Stack spacing="1" display="inline" align="left"> */}
									<Button size="sm" onClick={signupHandler} colorScheme="green" mr="5%">
										{"Cadastrar"}
									</Button>
									<Button size="sm" onClick={onClose} variant="ghost" mr="-7%">
										{"Fechar"}
									</Button>
									{/* </Stack> */}
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
							<Card variant="elevated" borderColor="#d8dee4" w="308px" size="lg" boxShadow="lg" padding="9%">
								<CardBody>
									<form onSubmit={submitHandler}>
										<Stack spacing="4">
											<FormControl isRequired>
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
													placeholder="Email"
												/>
											</FormControl>
											<FormControl isRequired>
												<HStack justify="space-between">
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
													placeholder="Senha"
												/>
											</FormControl>

											<Button type="submit" colorScheme="green" size="sm" borderRadius="6px">
												{isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Logar"}
											</Button>
										</Stack>
									</form>
									<SignupModal />

									<br></br>
									<Stack spacing="4">
										<Button size="sm" onClick={onOpen} variant="ghost">
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
