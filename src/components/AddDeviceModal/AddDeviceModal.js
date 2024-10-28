import React, {useState, useEffect} from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    useToast,
    useMediaQuery,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text
  } from '@chakra-ui/react';
  import { ChevronDownIcon } from '@chakra-ui/icons';
  import supabaseService from "../../services/supabaseService";


const AddDeviceModal = ({isOpen, onClose, selectedObjectId, selectedObject, deviceIsAdded, setDeviceIsAdded}) => {

    const [types, setTypes] = useState([]);
    const [deviceTypeSelect, setDeviceTypeSelect] = useState("");
    const [deviceNameSelected, setDeviceNameSelected] = useState("");
    const [deviceNameInput, setDeviceNameInput] = useState("");
    const [inputError, setInputError] = useState(false);

    const { getDevicesTypes, postDevices } = supabaseService();
    const toast = useToast();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const fetchDevicesTypes = async () => {
        try {
            const res = await getDevicesTypes();
            if(res.devices_types) {
                setTypes(res.devices_types);
            }
            if(res.error) {
                throw new Error(res.error.message);
            }
        } catch(e) {
            throw new Error(e.message);
        }
    };

    const onChangeSеlectValue = (e) => {
        setDeviceTypeSelect(e.target.value);
        setDeviceNameSelected(e.target.dataset.name);
    }

    const handleDeviceInput = (e) => {
        setDeviceNameInput(e.target.value);
        if(e.target.value === "") {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const addUserDevice = async (objectId, deviceTypeId, deviceName) => {
        try {
            if (deviceNameInput) {
                await postDevices(objectId, deviceTypeId, deviceName).then(res => {
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
                          description: "Новый прибор учета добавлен",
                          status: 'success',
                          duration: 3000,
                          isClosable: true
                        });
                      }
                      setDeviceTypeSelect("");
                      setDeviceNameInput("");
                      setInputError(false);
                      setDeviceIsAdded(!deviceIsAdded);
                });
            }
        } catch(e) {
            throw new Error(e.message);
        }
    }

    useEffect(() => {
        fetchDevicesTypes();
    }, []);

    return (
        <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Добавить прибор учета</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Menu matchWidth>
                    <MenuButton
                    as={Button}
                    w="100%"
                    h="40px"
                    variant="outline"
                    bg="white"
                    _hover={{ bg: "gray.200" }}
                    _expanded={{ bg: "gray.200" }}
                    rightIcon={<ChevronDownIcon />}
                    textAlign="left"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                        <Text fontWeight="400" noOfLines={1}>
                            {deviceNameSelected || "Выберите тип прибора"}
                        </Text>
                    </MenuButton>
                    <MenuList>
                        {types && types.map(
                            tp => ((
                            <MenuItem
                                key={tp.id}
                                backgroundColor={deviceTypeSelect === tp.id ? "gray.100" : "transparent"}
                                _hover={{ backgroundColor: "gray.300" }}
                                onClick={ () => onChangeSеlectValue({
                                    target: {
                                        value: tp.id,
                                        dataset: {
                                            name: tp.type_name
                                        }
                                    }
                                })}
                            >
                                <Text noOfLines={1}>
                                    {tp.type_name}
                                </Text>
                            </MenuItem>
                            ))
                                )}
                    </MenuList>
                </Menu>
                <FormControl isInvalid={inputError}>
                    <FormLabel mt={4}>Название прибора</FormLabel>
                    <Input
                    type="text"
                    placeholder="Введите условное название прибора учета"
                    _placeholder={{ opacity: 0.6, color: "gray.500"}}
                    focusBorderColor="teal.600"
                    value={deviceNameInput}
                    onChange={handleDeviceInput}
                    />
                    {!inputError ? (
                    <FormHelperText>
                    Добавить прибор к объекту: {selectedObject}
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Поле не должно быть пустым</FormErrorMessage>
                )}
                </FormControl>
            </ModalBody>
            <ModalFooter pt={8}>
              <Button
              colorScheme="teal"
              isDisabled={!deviceNameInput || !deviceTypeSelect}
              onClick={() => {
                onClose();
                addUserDevice(selectedObjectId, deviceTypeSelect, deviceNameInput);
                setDeviceNameSelected("");
                }}>
                Добавить
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
    );
};

export default AddDeviceModal;