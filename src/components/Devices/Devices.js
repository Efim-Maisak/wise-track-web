import React, {useState} from "react"
import { Box,
        Button,
        Heading,
        Flex,
        Text,
        Image,
        Tooltip,
        useDisclosure
        } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DeviceModal from "../DeviceModal/DeviceModal";


const Devices = ({devices, objects, onOpenAddDeviceModal, deviceIsDeleted, setDeviceIsDeleted}) => {

    const { isOpen: isOpenDeviceModal, onOpen: onOpenDeviceModal, onClose: onCloseDeviceModal } = useDisclosure();

    const [device, setDevice] = useState(null);

    const filterDevices = (devicesArr, deviceIndex) => {
        const filteredDevice = devicesArr[deviceIndex];
        setDevice(filteredDevice);
    };

    const handleOpenDeviceModal = (e) => {
        const element = e.currentTarget;
        const clickedElementIndex = element.getAttribute("data-id");
        filterDevices(devices, clickedElementIndex);
        onOpenDeviceModal();
    };

    return (
        <>
            <Box as="section" mt={8} w="620px" boxShadow="lg" bg="white" borderRadius="8px">
                <Heading p="4" as="h3" size="md">Мои приборы учета</Heading>
                <Flex
                w="100%"
                h="190px"
                p="4"
                gap="2"
                flexWrap="nowrap"
                overflowX="auto"
                sx={{
                    '&::-webkit-scrollbar': {
                    height: "8px",
                    borderRadius: "32px",
                    backgroundColor: `rgba(0, 0, 0, 0.1)`,
                    },
                    '&::-webkit-scrollbar-track': {
                    borderRadius: "32px"
                    },
                    '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `rgba(0, 0, 0, 0.1)`,
                    borderRadius: "32px"
                    }
                    }}
                >
                    <Tooltip bg="white.500" color="gray.600" label="Добавить прибор" openDelay="500">
                        <Button
                        as="button"
                        flex="0 0 auto"
                        width="120px"
                        height="120px"
                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                        border="2px solid #a9a9a9"
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
                        isDisabled={objects && objects.length === 0}
                        onClick={onOpenAddDeviceModal}
                        >
                        <AddIcon boxSize={8} color="#a9a9a9"/>
                        </Button>
                    </Tooltip>

                    { devices && devices.map( (device, index) => ((
                        <Box
                        as="button"
                        key={device.id}
                        data-id={index}
                        flex="0 0 auto"
                        w="120px"
                        h="120px"
                        boxShadow="base"
                        borderRadius={8}
                        cursor="pointer"
                        _active={{
                            transform: "scale(0.98)",
                        }}
                        onClick={handleOpenDeviceModal}
                        >
                            <Box w="120px" h="120px">
                            <Image
                                padding="2px"
                                boxSize="120px"
                                objectFit="cover"
                                src={device.device_type_id.image_url}
                                alt="electric-meter-device"
                            />
                            </Box>
                            <Box pt="6px" w="120px" h="30px" pr="2" pl="2">
                                <Text
                                fontWeight="bold"
                                fontSize="14px"
                                lineHeight="1"
                                textAlign="center"
                                overflow="hidden"
                                textOverflow="clip"
                                color="gray.600"
                                noOfLines={2}>
                                {device.device_name}
                                </Text>
                            </Box>
                        </Box>
                    )))}
                </Flex>
            </Box>
            <DeviceModal
            isOpen={isOpenDeviceModal}
            onClose={onCloseDeviceModal}
            deviceIsDeleted={deviceIsDeleted}
            setDeviceIsDeleted={setDeviceIsDeleted}
            device={device}
            />
        </>
    );
};

export default Devices;