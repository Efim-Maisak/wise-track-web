import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

const NotFoundPage = () => {
    return (
        <Box w="100%">
            <Flex h="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                <Heading as="h2" textAlign="center" size="xl" color="#494d4e">404: Страница не найдена</Heading>
            </Flex>
        </Box>
    )
}

export default NotFoundPage;