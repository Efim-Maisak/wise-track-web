import React from "react"
import { Box, Heading, Flex } from "@chakra-ui/react";

const Devices = () => {

    return (
        <Box as="section" mt="4" p="4" w="620px" boxShadow="base" borderRadius="8px">
            <Heading as="h3" size="md">Мои приборы учета</Heading>
            <Flex mt="4" w="100%" border="1px solid gray" p="4" gap="2" flexWrap="nowrap" overflowX="auto">
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
                <Box w="100px" h="100px" border="1px solid gray" flex="0 0 auto"></Box>
            </Flex>

        </Box>
    );
};

export default Devices;