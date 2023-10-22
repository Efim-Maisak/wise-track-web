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
    Box,
    Flex,
    Text,
    IconButton,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    useToast
  } from '@chakra-ui/react';

  import { DeleteIcon } from '@chakra-ui/icons';
  import supabaseService from "../../services/supabaseService";


const DeleteObjectModal = ({isOpen, onClose, objects, objectIsDeleted, setObjectIsDeteted}) => {

    const toast = useToast();
    const { deleteObject } = supabaseService();

    const removeObject = async (objectId) => {
        try {
            await deleteObject(objectId)
            .then(res => {
                if(res.error?.message) {
                    toast({
                        description: `Ошибка: ${res.error.message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                        });
                }
                setObjectIsDeteted(!objectIsDeleted);
            });
        } catch(e) {
            throw new Error(e.message);
        }
    };

    return (
        <>
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Удалить объект</ModalHeader>
            <ModalCloseButton />
            <ModalBody
            maxH="300px"
            overflowY="auto"
            sx={{
                '&::-webkit-scrollbar': {
                width: "8px",
                borderRadius: "32px",
                backgroundColor: `rgba(0, 0, 0, 0.1)`,
                },
                '&::-webkit-scrollbar-track': {
                borderRadius: "32px"
                },
                '&::-webkit-scrollbar-thumb': {
                backgroundColor: `rgba(0, 0, 0, 0.1)`,
                borderRadius: "32px",
                }
                }}
            >
            {!objects ? <Text textAlign="center">Объекты отсутствуют</Text> : null }
            {objects && objects.map(obj => ((
                <Box key={obj.id} w="100%" mt="4" p="2" boxShadow="base" borderRadius={6}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text w="380px" noOfLines={1}>{obj.object_name}</Text>
                        <Popover placement="left" variant="responsive">
                            <PopoverTrigger>
                                <IconButton colorScheme='red' aria-label='delete object' isRound="true" variant="outline" icon={<DeleteIcon />}/>
                            </PopoverTrigger>
                            <Portal>
                                <Box sx={{"& .chakra-popover__popper": {zIndex: "popover"}}}>
                                    <PopoverContent bg="gray.200">
                                        <PopoverArrow bg="gray.200"/>
                                        <PopoverBody>
                                            <Flex justifyContent="space-between" alignItems="center">
                                                <Text pr={4} fontWeight="bold">Удалить безвозвратно?</Text>
                                                <Button size="sm" colorScheme='red' onClick={() => {removeObject(obj.id)}}>Да</Button>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Box>
                            </Portal>
                        </Popover>
                    </Flex>
                </Box>
            )))}
            </ModalBody>
            <ModalFooter mt="4">
              <Button
              colorScheme="teal"
              onClick={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default DeleteObjectModal;