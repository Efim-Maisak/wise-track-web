import React from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

const NotFoundPage = () => {
    return (
        <Box w="100%">
            <Flex h="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                <Heading
                as="h2"
                display="inline-block"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text"
                textAlign="center">
                    404
                </Heading>
                <Text mt={4} fontSize="20px" color="#494d4e">Страница не найдена</Text>
                <Button
                mt={4}
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                variant="solid"
                >
                На главную
                </Button>
            </Flex>
        </Box>
    )
}

export default NotFoundPage;