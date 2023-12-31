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
    useToast,
    useMediaQuery
  } from '@chakra-ui/react'
  import supabaseService from '../../services/supabaseService';
  import { useAuth } from "../../hooks/useAuth";


  const AddObjectModal = ({isOpen,
                          onClose,
                          objectIsAdded,
                          setObjectIsAdded,
                          setSelectedObjectId,
                          setSelectedObject,
                          setObjectIdToStorage,
                          setObjectToStorage
                          }) => {

    const { user } = useAuth();
    const toast = useToast();
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const { postObjects } = supabaseService();

    const [objectInput, setObjectInput] = useState("");
    const [inputError, setInputError] = useState(false);


    const postUserObject = (objectName, userId) => {
      try {
          if(objectInput !== "") {
            postObjects(objectName, userId)
            .then( res => {
              if(res.error?.message) {
                toast({
                  position: isMobile ? "top" : "bottom",
                  description: `Ошибка: ${res.error.message}`,
                  status: 'error',
                  duration: 3000,
                  isClosable: true
                  });
              } else {
                setSelectedObjectId(res.object[0].id);
                setSelectedObject(res.object[0].object_name);
                setObjectIdToStorage(res.object[0].id);
                setObjectToStorage(res.object[0].object_name);
                setObjectIsAdded(!objectIsAdded);
                toast({
                  position: isMobile ? "top" : "bottom",
                  description: "Новый объект добавлен",
                  status: 'success',
                  duration: 3000,
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
              <Input type="text" value={objectInput} focusBorderColor="teal.600" onChange={onObjectInputChange}/>
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
              colorScheme='teal'
              isDisabled={!objectInput}
              onClick={() => {
                onClose();
                postUserObject(objectInput, user.id);
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