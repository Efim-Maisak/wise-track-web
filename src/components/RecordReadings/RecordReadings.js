import React from "react";

import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { ImMeter } from "react-icons/im";
import RecordReadingsModal from "../RecordReadingsModal/RecordReadingsModal";

const RecordReadings = ({devices}) => {

    const { isOpen: isOpenRecordReadingsModal, onOpen: onOpenRecordReadingsModal, onClose: onCloseRecordReadingsModal } = useDisclosure();


 return (
    <>
    <Box as="section" mt="8" w="620px">
        <Flex justifyContent="center">
        <Button w="100%" leftIcon={<ImMeter size={20}/>} size="md" colorScheme='teal' isDisabled={!devices.length > 0} onClick={onOpenRecordReadingsModal}>Записать показания</Button>
        </Flex>
    </Box>
    <RecordReadingsModal isOpen={isOpenRecordReadingsModal} devices={devices} onClose={onCloseRecordReadingsModal}/>
    </>
 )
};

export default RecordReadings;