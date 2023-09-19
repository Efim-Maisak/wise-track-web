import React from "react";
import { Container, Box, Flex, Input, Button } from '@chakra-ui/react';

const MainPage = ()=> {
    return (
        <>
        <Box as="div" h="100%" w="100%">
            <Container maxW='4xl' as="div" py="4">
            <Box bg="white" as="div" p="4" boxShadow='base' borderRadius="8px">
                <Flex justifyContent="space-between" alignItems="center">
                    <Input focusBorderColor="primary" errorBorderColor="danger" placeholder='Введите текст' w="50%" size="md"/>
                    <Button color="white" bg="primary" w="20%" _hover={{ bg: '#0B979B' }}>Тест</Button>
                </Flex>
            </Box>
            <Box as="div" bg="white" mt="4" p="4" boxShadow='base' borderRadius="8px">
                <Flex justifyContent="space-between" alignItems="center">
                    <Input placeholder='Введите текст' focusBorderColor="primary" w="50%" size="md"/>
                    <Button bg="secondary" w="20%">Тест</Button>
                </Flex>
            </Box>
            </Container>
        </Box>
        </>
    );
};

export default MainPage;