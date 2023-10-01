import React, { useEffect, useState } from "react";

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
    Input,
    Flex,
    HStack,
    Text,
    useToast,
  } from '@chakra-ui/react'

  import supabaseService from "../../services/supabaseService";


  const RecordReadingsModal = ({isOpen, onClose, devices}) => {

    const [inputError, setInputError] = useState(false);
    const [inputs, setInputs] = useState(null);
    const [monthInput, setMonthInput] = useState("");

    const { postIndications } = supabaseService();
    const toast = useToast();

    function createStateObj(devicesArr) {

        let state = {};

        for(let i = 0; i < devicesArr.length; i++) {
            state[devicesArr[i]?.device_name] = { value: "", id: devicesArr[i].id};
            }

        return state;
    }


    const handleInputChange = (e, deviceName) => {

        if(e.target.value === "") {
            setInputError(true);
        }
        if(inputs) {
            setInputs((prevInputs) => ({...prevInputs, [deviceName]: { value: e.target.value }}));
        }
    };

    const handleMonthInputChange = (e) => {
        setMonthInput(e.target.value);
    };

    useEffect(() => {
        setInputs(createStateObj(devices));
    }, [devices]);

    const sendIndications = async (indicationsArr) => {
        await postIndications(indicationsArr).then(res => {
            if(res.error?.message) {
                toast({
                  description: `Ошибка: ${res.error.message}`,
                  status: 'error',
                  duration: 5000,
                  isClosable: true
                  });
              } else {
                toast({
                  description: "Показания записаны",
                  status: 'success',
                  duration: 5000,
                  isClosable: true
                });
              }
            });
            // очистить inputs value
            setInputError(false);
        }

    return (
        <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
            <ModalContent>
                <ModalHeader>Записать показания приборов учета</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Flex justifyContent="space-between" alignItems="center">
                <FormLabel>Платежный период:</FormLabel>
                <Input w="240px" type="month" value={monthInput} onChange={handleMonthInputChange}></Input>
                </Flex>
                {console.log(inputs)}
                {console.log(monthInput)}
                {devices && devices.map( device => (
                    <FormControl mt={4} key={device.device_name} isInvalid={inputError}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <FormLabel>{device.device_name}</FormLabel>
                        <HStack w="160px">
                        <Input w="100px" type="number" value={inputs?.[device.device_name]?.value || ""} onChange={(e) => handleInputChange(e, device.device_name)}/>
                        <Text w="60px">{device.device_type_id.units}</Text>
                        </HStack>
                    </Flex>
                </FormControl>
                        ))}
                </ModalBody>
                <ModalFooter mt={4}>
                <Button
                colorScheme='blue'
                isDisabled={inputError}
                onClick={() => {
                    onClose();
                    //sendIdications(indicationsArr);
                    }}>
                    Записать
                </Button>
                </ModalFooter>
          </ModalContent>
        </Modal>
        </>
    );
  };

  export default RecordReadingsModal;