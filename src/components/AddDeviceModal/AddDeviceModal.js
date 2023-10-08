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
    Select,
    Input,
    useToast
  } from '@chakra-ui/react'

  import supabaseService from "../../services/supabaseService";


const AddDeviceModal = ({isOpen, onClose, selectedObjectId, deviceIsAdded, setDeviceIsAdded}) => {

    const [types, setTypes] = useState([]);
    const [deviceTypeSelect, setDeviceTypeSelect] = useState("");
    const [deviceNameInput, setDeviceNameInput] = useState("");
    const [inputError, setInputError] = useState(false);

    const { getDevicesTypes, postDevices } = supabaseService();
    const toast = useToast();

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
                          description: `Ошибка: ${res.error.message}`,
                          status: 'error',
                          duration: 5000,
                          isClosable: true
                          });
                      } else {
                        toast({
                          description: "Новый прибор учета добавлен",
                          status: 'success',
                          duration: 5000,
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
                <Select mt={4} maxW="320px"size="md" variant="outline" defaultValue={"default"} onChange={onChangeSеlectValue}>
                    <option value="default" disabled>Выберите тип прибора</option>
                    {types && types.map(
                        tp => ((<option
                                    key={tp.id}
                                    value={tp.id}
                                    >
                                    {tp.type_name}
                                </option>))
                        )}
                </Select>
                <FormControl isInvalid={inputError}>
                    <FormLabel mt={4}>Название прибора</FormLabel>
                    <Input type="text" value={deviceNameInput} onChange={handleDeviceInput}/>
                    {!inputError ? (
                    <FormHelperText>
                    Введите условное название прибора учета
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Поле не должно быть пустым</FormErrorMessage>
                )}
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
              colorScheme='blue'
              isDisabled={!deviceNameInput || !deviceTypeSelect}
              onClick={() => {
                onClose();
                addUserDevice(selectedObjectId, deviceTypeSelect, deviceNameInput);
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