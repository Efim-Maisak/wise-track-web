import React, {useState, useRef} from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useToast,
    useMediaQuery
  } from "@chakra-ui/react"
  import { useNavigate } from "react-router-dom";
  import supabase from "../../config/supabaseClient";

  const ChangePasswordPage = () => {

    const toast = useToast();
    const navigate =  useNavigate();
    const [isMobile] = useMediaQuery("(max-width: 768px)");


    let passwordRef = useRef(null);
    let passwordConfirmRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async () => {

        let errorMsg = "";

        if(!passwordRef.current?.value || !passwordConfirmRef.current?.value) {
            errorMsg += "Поля не должны быть пустыми. ";
        }

        if(passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            errorMsg += "Пароли не совпадают. ";
        }

        if(!errorMsg) {
            try {
                setLoading(true);
                const { error } = await supabase.auth.updateUser({
                    password: passwordRef.current.value
                  })
                  if(error?.message) {
                    toast({
                        description: `Ошибка: ${error.message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                        });
                  } else {
                    navigate("/");
                  }
            } catch(e) {
                throw new Error(e.message);
            } finally {
                setLoading(false);
            }
        } else {
            toast({
                description: errorMsg,
                status: 'error',
                duration: 5000,
                isClosable: true
                });
            setLoading(false);
        }
    };


    return (
            <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg='gray.50'
            >
                <Stack spacing={8} mx={'auto'} w={'md'} py={12} px={6}>
                    <Stack align={'center'}>
                    <Heading fontSize={'2xl'} textAlign={'center'}>
                        Обновление пароля
                    </Heading>
                    </Stack>
                    <Box
                    rounded={'lg'}
                    bg='white'
                    boxShadow={'lg'}
                    p={isMobile ? 6 : 8 }
                    >
                    <Stack spacing={4}>
                        <Text color="gray.400">Придумайте новый пароль</Text>
                        <FormControl mt={4} id="password" isRequired>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                        type="text"
                        ref={passwordRef}
                        />
                        </FormControl>
                        <FormControl id="password_confirm" isRequired>
                        <FormLabel>Подтверждение пароля</FormLabel>
                            <Input
                            type="text"
                            ref={passwordConfirmRef}
                            />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                        <Button
                            isLoading={loading}
                            loadingText="Обновляю"
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}
                            onClick={handlePasswordChange}
                            >
                            Изменить
                        </Button>
                        </Stack>
                    </Stack>
                    </Box>
                </Stack>
            </Flex>
    );
};

export default ChangePasswordPage;