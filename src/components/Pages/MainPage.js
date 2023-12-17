import React from "react";
import { Container, Box, Flex } from '@chakra-ui/react';
import Objects from "../Objects/Objects";

const MainPage = ()=> {
    return (
        <>
        <Box as="div" minH="100vh" w="100%" bg="gray.50">
            <Container maxW='4xl' as="div" p="0" px="10px">
                <Flex pt="64px" pb="70px" flexDirection="column" justifyContent="center" alignItems="center">
                    <Objects/>
                </Flex>
            </Container>
        </Box>
        </>
    );
};

export default MainPage;