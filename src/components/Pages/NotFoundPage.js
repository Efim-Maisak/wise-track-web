import React from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <Box w="100%">
            <Flex h="80vh" flexDirection={{base: "column", sm: "column", md: "row"}} justifyContent="center" alignContent="center">
                <Heading
                as="h2"
                pr={{base: "0", sm: "0", md: "20px"}}
                size="4xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text"
                alignSelf="center">
                    404
                </Heading>
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Text fontSize="18px" fontWeight="600" color="gray.500">Страница не найдена</Text>
                    <Button
                    mt={4}
                    colorScheme="teal"
                    bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                    color="white"
                    variant="solid"
                    onClick={() => navigate("/")}
                    >
                    На главную
                    </Button>
                </Flex>
            </Flex>
        </Box>
    )
}

export default NotFoundPage;