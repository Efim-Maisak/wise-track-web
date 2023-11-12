import React, {useState} from "react";
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
    useToast
  } from "@chakra-ui/react"
  import { useNavigate } from "react-router-dom";
  import supabase from "../../config/supabaseClient";


const ChangePasswordPage = () => {

    const toast = useToast();
    const navigate =  useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmed, setNewPasswordConfirmed] = useState("");
    const [loading, setLoading] = useState(false);

    // требуется валидация совпадения двух паролей

    const handleNewPassInput = (e) => {
        setNewPassword(e.target.value);
    };

    const handleNewPassConfirmedInput = (e) => {
        setNewPasswordConfirmed(e.target.value);
    };

    const handlePasswordChange = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({
                password: newPassword
              })
              if(error?.message) {
                toast({
                    description: `Ошибка: ${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                    });
              }
        } catch(e) {
            throw new Error(e.message);
        } finally {
            setLoading(false);
            setNewPassword("");
            setNewPasswordConfirmed("");
            navigate("/login");
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
                    p={8}>
                    <Stack spacing={4}>
                        <Text color="gray.400">Придумайте новый пароль</Text>
                        <FormControl mt={4} id="password" isRequired>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                        type="text"
                        value={newPassword}
                        onChange={handleNewPassInput}
                        />
                        </FormControl>
                        <FormControl id="password_confirm" isRequired>
                        <FormLabel>Подтверждение пароля</FormLabel>
                            <Input
                            type="text"
                            value={newPasswordConfirmed}
                            onChange={handleNewPassConfirmedInput}
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