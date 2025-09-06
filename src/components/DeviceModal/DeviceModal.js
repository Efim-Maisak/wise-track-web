import React, { useState, useEffect } from "react";
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
    Image,
    useToast,
    Stack,
    HStack,
    useMediaQuery
  } from '@chakra-ui/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteIcon } from '@chakra-ui/icons';
import supabaseService from "../../services/supabaseService";
import NumberFlow from '@number-flow/react';


const DeviceModal = ({isOpen, onClose, deviceIsDeleted, setDeviceIsDeleted, device}) => {

    const { deleteDevice, getLastIndicationFromDevice } = supabaseService();
    const toast = useToast();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const [deviceLastValue, setDeviceLastValue] = useState("");


    const fetchDeviceLastIndication = async (deviceId) => {
        try {
            const res = await getLastIndicationFromDevice(deviceId);
            setDeviceLastValue(res.indication[0]?.value || 0);
        }catch(e) {
            throw new Error(e.message);
        }
    };

    const deleteUserDevice = async (deviceId) => {
        try {
            await deleteDevice(deviceId)
            .then(res => {
                if(res.error?.message) {
                    toast({
                        position: isMobile ? "top" : "bottom",
                        description: `Ошибка: ${res.error.message}`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                        });
                } else {
                    toast({
                        position: isMobile ? "top" : "bottom",
                        description: `Прибор "${device.device_name}" удален`,
                        status: 'success',
                        duration: 3000,
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

    useEffect(() => {
        if(device && device.hasOwnProperty("id")) {
            fetchDeviceLastIndication(device.id);
        }
    }, [device]);


    if (!device) return null

    return (
        <>
        <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
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
                    <Flex flexDirection={{base: "column", sm: "column", md: "row"}} justifyContent="space-around" alignItems="center">
                        <Image
                        boxSize={{base: "120px", sm: "140px", md: "220px"}}
                        src={device.device_type_id.image_url}
                        alt="meter-device"
                        />
                        <Box p={{base: "8px", sm: "8px", md: "16px"}}>
                            <Stack spacing={2}>
                                <Text color="gray.700" fontSize={18}>{device.device_type_id.type_name}</Text>
                                <HStack flexDirection="row" alignSelf="center">
                                    <Box border="3px solid" borderRadius="md" borderColor="black.500" py={1} px={4}>
                                        <Text as="h6" fontSize={30} fontWeight="500" color="black.500">
                                            <NumberFlow
                                            prefix="0"
                                            format={{ useGrouping: false }}
                                            value={deviceLastValue}
                                            trend={-1}
                                            />
                                        </Text>
                                    </Box>
                                    <Text color="gray.700" fontSize={18}>{device.device_type_id.units}</Text>
                                </HStack>
                            </Stack>
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter pt={8}>
                <Button
                colorScheme="teal"
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