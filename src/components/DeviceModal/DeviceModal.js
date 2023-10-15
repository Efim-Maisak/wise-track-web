import React from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Flex,
    Button,
    Box,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useToast
  } from '@chakra-ui/react';

  import { BsThreeDotsVertical } from "react-icons/bs";
  import { DeleteIcon } from '@chakra-ui/icons';
  import supabaseService from "../../services/supabaseService";


const DeviceModal = ({isOpen, onClose, deviceIsDeleted, setDeviceIsDeleted, device}) => {

    const { deleteDevice } = supabaseService();
    const toast = useToast();

    const deleteUserDevice = async (deviceId) => {
        try {
            await deleteDevice(deviceId)
            .then(res => {
                if(res.error?.message) {
                    toast({
                        description: `Ошибка: ${res.error.message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                        });
                } else {
                    toast({
                        description: `Прибор "${device.device_name}" удален`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                      });

                    setDeviceIsDeleted(!deviceIsDeleted);
                    }
                });
            }catch(e) {
                throw new Error(e.message);
            };
    };

    const handleDeleteDevice = () => {
        deleteUserDevice(device.id);
        onClose();
    }


    if (!device) return null

    return (
        <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text>{device.device_name}</Text>
                        <Menu placement="bottom-end">
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<BsThreeDotsVertical fontSize='20px'/>}
                                variant="ghost"
                            />
                            <MenuList>
                                <MenuItem fontSize="16px" icon={<DeleteIcon fontSize="16px" color="red.500"/>} onClick={handleDeleteDevice}>
                                Удалить прибор
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </ModalHeader>
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