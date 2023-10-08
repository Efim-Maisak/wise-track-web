import React, { useState } from 'react'

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
    useToast
  } from '@chakra-ui/react'

  import supabaseService from '../../services/supabaseService';

  const AddObjectModal = ({isOpen, onClose, objectIsAdded, setObjectIsAdded}) => {

    const [objectInput, setObjectInput] = useState("");
    const [inputError, setInputError] = useState(false);

    const toast = useToast();

    const { postObjects } = supabaseService();

    const userId = "c8ab3e1f-9ee1-43fc-9db0-0cf77878e5f8"; // временное решение

    const postUserObject = (objectName, userId) => {
      try {
          if(objectInput !== "") {
            postObjects(objectName, userId)
            .then( res => {
              if(res.error?.message) {
                toast({
                  description: `Ошибка: ${res.error.message}`,
                  status: 'error',
                  duration: 5000,
                  isClosable: true
                  });
              } else {
                toast({
                  description: "Новый объект добавлен",
                  status: 'success',
                  duration: 5000,
                  isClosable: true
                });
              }
            });
          }
        } catch(e) {
        throw new Error(e.message);

      }
        setObjectInput("");
        setInputError(false);
        setObjectIsAdded(!objectIsAdded);
    };

    const onObjectInputChange = (e) => {
      setObjectInput(e.target.value);

      if(e.target.value === "") {
        setInputError(true);
      } else {
        setInputError(false);
      };
    };

    return (
      <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Добавить объект</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl isInvalid={inputError}>
              <FormLabel>Название объекта</FormLabel>
              <Input type="text" value={objectInput} onChange={onObjectInputChange}/>
              {!inputError ? (
                <FormHelperText>
                  Введите условное название объекта. Например: "Квартира на ул. Садовой"
                </FormHelperText>
              ) : (
                <FormErrorMessage pb="19px">Поле не должно быть пустым</FormErrorMessage>
              )}
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
              colorScheme='blue'
              isDisabled={!objectInput}
              onClick={() => {
                onClose();
                postUserObject(objectInput, userId);
                }}>
                Добавить
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default AddObjectModal;