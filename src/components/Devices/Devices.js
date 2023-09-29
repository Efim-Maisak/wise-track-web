import React from "react"
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Devices = ({devices, onOpenAddDeviceModal}) => {

    return (
        <Box as="section" w="620px">
            <Heading p="4" as="h3" size="md">Мои приборы учета</Heading>
            <Flex mt="4" w="100%" p="4" gap="2" flexWrap="nowrap" overflowX="auto">
                <Box
                as="button"
                flex="0 0 auto"
                width="120px"
                height="120px"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                border="2px"
                borderRadius={8}
                px="8px"
                fontSize="14px"
                bg="#f5f6f7"
                color="#4b4f56"
                _hover={{ bg: "#ebedf0" }}
                _active={{
                    bg: '#dddfe2',
                    transform: "scale(0.98)",
                }}
                _focus={{
                    boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
                onClick={onOpenAddDeviceModal}
                >
                <AddIcon boxSize={8}/>
                </Box>
                { devices && devices.map( device => ((
                    <Box key={device.id} flex="0 0 auto" w="120px" h="120px" boxShadow="base" borderRadius={8} cursor="pointer">
                        <Box w="120px" h="90px"></Box>
                        <Box w="120px" h="30px" pr="2" pl="2">
                            <Text
                            fontWeight="bold"
                            fontSize="14px"
                            lineHeight="1"
                            textAlign="center"
                            overflow="hidden"
                            textOverflow="clip"
                            noOfLines={2}>
                            {device.device_name}
                            </Text>
                        </Box>
                    </Box>
                )))}

            </Flex>
        </Box>
    );
};

export default Devices;