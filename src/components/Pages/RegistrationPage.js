import React, {useState, useRef} from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Image,
    Link as ChackraLink,
    Divider,
    AbsoluteCenter,
    useToast,
    useMediaQuery
  } from "@chakra-ui/react"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FcGoogle } from "react-icons/fc";
import supabase from "../../config/supabaseClient";
import { mailValidation } from "../../utils/mailValidation";
import { passwordValidation } from "../../utils/passwordValidation";
import logo from "../../images/wisetrack-logo-250-50.png";


const RegistrationPage = () => {

    const toast = useToast();
    const navigate = useNavigate();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    let emailRef = useRef(null);
    let passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState();


    const handleSignUp = async () => {
        setLoading(true);

        let errorsMsg = {};

        if (!mailValidation(emailRef.current.value)) {
            errorsMsg = { ...errorsMsg, email: "Ошибка в адресе электронной почты" };
        }

        if (!passwordValidation(passwordRef.current.value)) {
            errorsMsg = { ...errorsMsg, password: "Пароль должен быть не менее 6 символов" };
        }

        if(Object.keys(errorsMsg).length === 0) {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                  });

                  if (error?.message) {
                    setLoading(false);
                    toast({
                        description: `Ошибка: ${error.message}`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                        });
                  } else {
                    toast({
                        description: `Письмо для подтверждения регистрации отправлено на почту ${emailRef.current.value}`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                      });
                    setLoading(false);
                    const { user } = data;
                    if(user) navigate("/login");
                  }
            } catch(e) {
                setLoading(false);
            }
        } else {
            setLoading(false);
            toast({
                description: Object.values(errorsMsg).join(", "),
                status: 'error',
                duration: 3000,
                isClosable: true
                });
            errorsMsg = {};
            passwordRef.current.value = "";
        }
    };

    const handleLoginWithGoogle = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
              });
              if(error?.message) {
                toast({
                    description: `Ошибка: ${error.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                    });
                }
        } catch(e) {
            throw new Error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg="gray.50"
            >
                <Flex
                flexDirection={isMobile ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                >
                <Box
                px={isMobile ? 0 : 8 }
                maxW={isMobile ? "sm" : "md"}
                display="flex"
                alignItems="center"
                >
                    <Image
                    src={logo}
                    objectFit="contain"
                    my="30px"
                    />
                    </Box>
                    <Stack
                    spacing={8}
                    mx="auto"
                    w={isMobile ? "xs" : "md"}
                    py={12} px={isMobile ? 4 : 6 }
                    my={isMobile ? "0" : "30px"}
                    >
                        <Stack align={'center'}>
                        <Heading fontSize={isMobile ? "2xl" : "4xl"} textAlign={'center'}>
                            Регистрация
                        </Heading>
                        </Stack>
                        <Box
                        rounded={'lg'}
                        bg="white"
                        boxShadow={'lg'}
                        p={isMobile ? 6 : 8 }
                        >
                        <Stack spacing={4}>
                            <Button
                                isLoading={loading}
                                variant='outline'
                                size="lg"
                                color={'blue.500'}
                                iconSpacing="16px"
                                leftIcon={<FcGoogle pr="16px" fontSize="26px"/>}
                                onClick={handleLoginWithGoogle}
                                >
                                Войти через Google
                            </Button>
                            <Box position='relative' pt="20px">
                            <Divider />
                            <AbsoluteCenter bg='white'pt="16px" pr="8px" pl="8px">
                                <Text color="gray.400">Или</Text>
                            </AbsoluteCenter>
                            </Box>
                            <FormControl mt={4} id="email" isRequired>
                            <FormLabel>Электронная почта</FormLabel>
                            <Input
                            type="email"
                            ref={emailRef}
                            />
                            </FormControl>
                            <FormControl id="password" isRequired>
                            <FormLabel>Пароль</FormLabel>
                            <InputGroup>
                                <Input
                                type={showPassword ? 'text' : 'password'}
                                ref={passwordRef}
                                />
                                <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                                </InputRightElement>
                            </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={loading}
                                loadingText="Вхожу"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                bg: 'blue.500',
                                }}
                                onClick={handleSignUp}
                                >
                                Регистрация
                            </Button>
                            </Stack>
                            <Stack pt={6}>
                            <Text align={'center'}>
                                Уже зарегистрированы? <ChackraLink as={ReactRouterLink} color={'blue.400'} to="/login">Войти</ChackraLink>
                            </Text>
                            </Stack>
                        </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </Flex>
        </>
    );
};

export default RegistrationPage;