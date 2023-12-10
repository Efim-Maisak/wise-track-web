import React from "react";
import { Container, Box, Flex } from '@chakra-ui/react';
import Objects from "../Objects/Objects";

const MainPage = ()=> {
    return (
        <>
        <Box as="div" minH="100vh" w="100%" bg="gray.50">
            <Container maxW='4xl' as="div" p="0">
                <Flex minH="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                    <Objects/>
                </Flex>
            </Container>
        </Box>
        </>
    );
};

export default MainPage;