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
    useColorModeValue,
    Link,
    Divider,
    AbsoluteCenter,
    Image
  } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const RegistrationPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            >
            <Stack spacing={8} mx={'auto'} w={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Регистрация
                </Heading>
                </Stack>
                <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <Button
                        variant='outline'
                        size="lg"
                        color={'blue.500'}
                        _hover={{
                        bg: 'black.500',
                        }}
                        leftIcon={<Image src="../../images/icons/google.svg"/>}
                        >
                        Войти через Google
                    </Button>
                    <Box position='relative' pt="20px">
                    <Divider />
                    <AbsoluteCenter bg='white'pt="16px" pr="8px" pl="8px">
                        Или
                    </AbsoluteCenter>
                    </Box>
                    <FormControl mt={4} id="email" isRequired>
                    <FormLabel>Электронная почта</FormLabel>
                    <Input type="email" />
                    </FormControl>
                    <FormControl id="password" isRequired>
                    <FormLabel>Пароль</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} />
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
                        loadingText="Вхожу"
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}>
                        Регистрация
                    </Button>
                    </Stack>
                    <Stack pt={6}>
                    <Text align={'center'}>
                        Уже зарегистрированы? <Link color={'blue.400'}>Войти</Link>
                    </Text>
                    </Stack>
                </Stack>
                </Box>
            </Stack>
            </Flex>
        </>
    );
};

export default RegistrationPage;