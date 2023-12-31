import React, { useEffect, useState } from "react";
import {
    Box,
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
    Spacer,
    useMediaQuery
  } from '@chakra-ui/react'
import supabaseService from "../../services/supabaseService";


  const RecordReadingsModal = ({isOpen, onClose, indicationsIsAdded, setIndicationsIsAdded, devices}) => {

    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [inputs, setInputs] = useState(null);
    const [monthInput, setMonthInput] = useState("");
    const [inputError, setInputError] = useState({});
    const [monthInputError, setMonthInputError] = useState(true);
    const [globalInputError, setGlobalInputError] = useState(true);

    const { postIndications } = supabaseService();

    const toast = useToast();

    function createStateObj(devicesArr) {
        let state = {};

        for(let i = 0; i < devicesArr.length; i++) {
            state[devicesArr[i]?.device_name] = { value: "", device_id: devicesArr[i].id};
            }

        return state;
    }

    function createErrorInputObj(devicesArr) {
        let state = {};

        for(let i = 0; i < devicesArr.length; i++) {
            state[devicesArr[i]?.device_name] = { error: true};
            }

        return state;
    }

    const handleInputChange = (e, deviceName) => {
        setInputs((prevInputs) => ({...prevInputs, [deviceName]: { ...prevInputs[deviceName], value: e.target.value }}));
        setInputError((prevInputs) => ({...prevInputs, [deviceName]: { error: false }}));
        if(!e.target.value) {
            setInputError((prevInputs) => ({...prevInputs, [deviceName]: { error: true }}));
        };
    };

    const handleMonthInputChange = (e) => {
        setMonthInput(e.target.value);
        setMonthInputError(false);
        if(!e.target.value) {
            setMonthInputError(true);
        }
    };

    const clearInputsValues = (inputsObj) =>  {
        for (let key in inputsObj) {
            inputs[key].value = "";
        }
        setMonthInput("");
    };

    const resetInputsErrors = (errorObj) =>  {
        for (let key in errorObj) {
            inputs[key].error = true;
        }
    };

    function validateInputsValues(errorObj) {
        if(Object.values(errorObj).some(elem => {
            if(elem.error === true) {
                return true;
            }})) {
            setGlobalInputError(true);
        } else if(Object.values(errorObj).every(elem => {
            if(elem.error === false) {
                return true;
            }})) {
            setGlobalInputError(false);
        }
    };

    const composeData = (inputsObj, monthInputState) => {
        let data = [];
        const monthInputClone = JSON.parse(JSON.stringify(inputsObj));
        for (let key in monthInputClone) {
            monthInputClone[key].billing_period = monthInputState;
            data.push(monthInputClone[key]);
        }
        return data;
    };

    const sortInputsByDeviceName = (devicesArr) => {
        if (devicesArr) {
            devicesArr.sort((a, b) => {
                if (a.device_name < b.device_name) return -1;
                if (a.device_name > b.device_name) return 1;
                return 0;
            });
        };
    };

    sortInputsByDeviceName(devices);

    const sendIndications = async () => {
        if(!globalInputError && !monthInputError) {
            try {
                await postIndications(composeData(inputs, monthInput)).then(res => {
                    if(res.error?.message) {
                        toast({
                          position: isMobile ? "top" : "bottom",
                          description: `Ошибка: ${res.error.message}`,
                          status: "error",
                          duration: 3000,
                          isClosable: true
                          });
                      } else {
                        toast({
                          position: isMobile ? "top" : "bottom",
                          description: "Показания записаны",
                          status: 'success',
                          duration: 3000,
                          isClosable: true
                        });
                        setIndicationsIsAdded(!indicationsIsAdded);
                      }
                    });
            } catch(e) {
                throw new Error(e.message);
            }
            clearInputsValues(inputs);
            setMonthInputError(true);
            resetInputsErrors(inputError);
            setGlobalInputError(true);
        }
    }

    useEffect(() => {
        if(devices) {
            setInputs(createStateObj(devices));
            setInputError(createErrorInputObj(devices));
        }
    }, [devices]);

    useEffect(() => {
        validateInputsValues(inputError);
    }, [inputError]);


    return (
        <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
            <ModalContent>
                <ModalHeader><Box pr="30px">Записать показания приборов учета</Box></ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={8} px={{base: "12px", sm: "16px", md: "24px"}}>
                <Flex justifyContent="space-between" alignItems="center">
                <FormLabel>Платежный период:</FormLabel>
                <Input w="240px" type="month" value={monthInput} focusBorderColor="teal.600" onChange={handleMonthInputChange}></Input>
                </Flex>
                {devices && devices.map( device => (
                    <FormControl mt={4} key={device.device_name}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <FormLabel>{device.device_name}</FormLabel>
                        <HStack w="160px">
                        <Input
                        w="100px"
                        type="number"
                        focusBorderColor="teal.600"
                        value={inputs?.[device.device_name]?.value || ""}
                        onChange={(e) => handleInputChange(e, device.device_name)}
                        />
                        <Text w="60px">{device.device_type_id.units}</Text>
                        </HStack>
                    </Flex>
                </FormControl>
                        ))}
                </ModalBody>
                <ModalFooter mt={4}>
                        { monthInputError || globalInputError ? <Text fontSize="sm">Заполните показания</Text> : null}
                        <Spacer/>
                        <Button
                        colorScheme="teal"
                        isDisabled={ monthInputError || globalInputError }
                        onClick={() => {
                            onClose();
                            sendIndications();
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