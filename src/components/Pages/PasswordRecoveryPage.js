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
  import supabase from "../../config/supabaseClient";


const PasswordRecoveryPage = () => {

    const toast = useToast();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    };

    // требуется функция по валидации почты

    const handleRecovery = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if(error?.message) {
                toast({
                    description: `Ошибка: ${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                    });
            } else {
                toast({
                    description: "Письмо для восстановления пароля отправлено",
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                  });
            }
        } catch(e) {
            throw new Error(e.message);
        } finally {
            setLoading(false);
            setEmail("");
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
                        Восстановление пароля
                    </Heading>
                    </Stack>
                    <Box
                    rounded={'lg'}
                    bg='white'
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Text color="gray.400">Введите действительный адрес электронной почты.</Text>
                        <Text color="gray.400">На почту будет направлено письмо для восстановления пароля.</Text>
                        <FormControl mt={4} id="email" isRequired>
                        <FormLabel>Почта для восстановления</FormLabel>
                        <Input
                        type="email"
                        value={email}
                        onChange={handleEmailInput}
                        />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                        <Button
                            isLoading={loading}
                            loadingText="Отправляю"
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}
                            onClick={handleRecovery}
                            >
                            Восстановить
                        </Button>
                        </Stack>
                    </Stack>
                    </Box>
                </Stack>
            </Flex>
    );
};

export default PasswordRecoveryPage;