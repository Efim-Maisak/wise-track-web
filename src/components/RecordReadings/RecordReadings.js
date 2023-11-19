import React from "react";

import { Box, Flex, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { ImMeter } from "react-icons/im";
import RecordReadingsModal from "../RecordReadingsModal/RecordReadingsModal";

const RecordReadings = ({devices, indicationsIsAdded, setIndicationsIsAdded}) => {

    const { isOpen: isOpenRecordReadingsModal, onOpen: onOpenRecordReadingsModal, onClose: onCloseRecordReadingsModal } = useDisclosure();


 return (
    <>
        <Box as="section" my="8" w="620px">
            <Flex justifyContent="center">
                <Button
                w="100%"
                size="md"
                colorScheme='teal'
                display={!devices || devices.length === 0 ? "none" : "block"}
                onClick={onOpenRecordReadingsModal}>
                    <HStack justify="center">
                        <ImMeter fontSize={'20px'}/>
                        <Text verticalAlign="center" fontSize="16px">Записать показания</Text>
                    </HStack>
                </Button>
            </Flex>
        </Box>
        <RecordReadingsModal
        isOpen={isOpenRecordReadingsModal}
        onClose={onCloseRecordReadingsModal}
        devices={devices}
        indicationsIsAdded={indicationsIsAdded}
        setIndicationsIsAdded={setIndicationsIsAdded}
        />
    </>
 )
};

export default RecordReadings;