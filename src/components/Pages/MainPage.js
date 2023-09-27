import React from "react";
import { Container, Box, Flex } from '@chakra-ui/react';
import Objects from "../Objects/Objects";
import Devices from "../Devices/Devices";

const MainPage = ()=> {
    return (
        <>
        <Box as="div" h="100%" w="100%">
            <Container maxW='4xl' as="div" p="0">
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Objects/>
                    <Devices/>
                </Flex>
            </Container>
        </Box>
        </>
    );
};

export default MainPage;