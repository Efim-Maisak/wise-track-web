import React, {useState} from "react";
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
    Divider,
    AbsoluteCenter,
    Link as ChackraLink,
    useToast
  } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FcGoogle } from "react-icons/fc";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";


const LoginPage = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    }

    const handleLogIn = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: emailInput,
                password: passwordInput,
              });

              if (error?.message) {
                setLoading(false);
                toast({
                    description: `Ошибка: ${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                    });
              } else {
                setLoading(false);
                navigate("/");
              }
        } catch(e) {
            setLoading(false);
            throw new Error(e.message);
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
                <Flex flexDirection="row" justifyContent="center">
                    <Box bg="gray.100" w={'md'} boxShadow={'lg'} rounded={'lg'}></Box>
                    <Stack spacing={8} mx={'auto'} w={'md'} py={12} px={6}>
                        <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Вход
                        </Heading>
                        </Stack>
                        <Box
                        rounded={'lg'}
                        bg="white"
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <Button
                                variant='outline'
                                size="lg"
                                color={'blue.500'}
                                iconSpacing="16px"
                                leftIcon={<FcGoogle pr="16px" fontSize="26px"/>}
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
                            value={emailInput}
                            onChange={handleEmailInput}
                            />
                            </FormControl>
                            <FormControl id="password" isRequired>
                            <FormLabel>Пароль</FormLabel>
                            <InputGroup>
                                <Input
                                type={showPassword ? 'text' : 'password'}
                                value={passwordInput}
                                onChange={handlePasswordInput}
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
                                onClick={handleLogIn}
                                >
                                Войти
                            </Button>
                            </Stack>
                            <Stack pt={6}>
                            <Text align={'center'}>
                                Забыли пароль? <ChackraLink as={ReactRouterLink} color={'blue.400'} to="/recovery">Восстановить</ChackraLink>
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

export default LoginPage;