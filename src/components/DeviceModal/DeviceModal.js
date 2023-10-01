import React from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box
  } from '@chakra-ui/react'


const DeviceModal = ({isOpen, onClose, device}) => {

    if (!device) return null

    return (
        <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{device.device_name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box p={4}>
                        <ul>
                            <li>{device.device_type_id.type_name}</li>
                            <li>{device.device_type_id.units}</li>
                        </ul>
                    </Box>
                </ModalBody>
                <ModalFooter>
                <Button
                colorScheme='blue'
                onClick={() => {
                    onClose();
                    }}>
                    Закрыть
                </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    );
}

export default DeviceModal;