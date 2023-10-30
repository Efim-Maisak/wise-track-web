import React from "react";
import {
    HStack,
    Stack,
    Text,
    Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
  } from '@chakra-ui/react'
import { countTotal } from "../../utils/countTotal";
import { formatDate } from "../../utils/formatDate";


const IndicationModal = ({isOpen, onClose, indication}) => {

    const dateOptions = {
        day: 'numeric',
        month: "numeric",
        year: "numeric"
      };


    if(!indication) return null

    return (
        <>
         <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{Object.keys(indication)[0]}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box p={4}>
                        <HStack justifyContent="space-between">
                            <Box w="180px" h="180px" alignSelf="center">
                                <Stack h="100%" justifyContent="center" alignItems="center">
                                    <Text fontWeight="600" textAlign="center">Дата передачи показаний:</Text>
                                    <Badge
                                    variant="solid"
                                    colorScheme="teal"
                                    fontSize="16px"
                                    >
                                    {formatDate(Object.values(indication)[0][0].created_at, dateOptions)}
                                    </Badge>
                                </Stack>

                            </Box>
                            <Box p={4} w="180px" h="180px" boxShadow="base" borderRadius={8}>
                                <Text mt={4} fontWeight="600" textAlign="center">Холодная вода (всего):</Text>
                                <HStack mt={2} justifyContent="center">
                                    <Text fontSize="32px" fontWeight="800" color="gray.600">{countTotal(indication, "CW")[0]}</Text>
                                    <Text fontSize="28px" fontWeight="600" color="gray.600">/</Text>
                                    <Text fontSize="26px" fontWeight="800" color="gray.400" alignSelf="flex-end">{countTotal(indication, "CW")[1]}</Text>
                                </HStack>
                            </Box>
                            <Box p={4} w="180px" h="180px" boxShadow="base" borderRadius={8}>
                                <Text mt={4} fontWeight="600" textAlign="center">Горячая вода (всего):</Text>
                                <HStack mt={2} justifyContent="center">
                                    <Text fontSize="32px" fontWeight="800" color="gray.600">{countTotal(indication, "HW")[0]}</Text>
                                    <Text fontSize="28px" fontWeight="600" color="gray.600">/</Text>
                                    <Text fontSize="26px" fontWeight="800" color="gray.400" alignSelf="flex-end">{countTotal(indication, "HW")[1]}</Text>
                                </HStack>
                            </Box>
                        </HStack>
                        <TableContainer mt={8}>
                            <Table size="md">
                                <Thead>
                                <Tr>
                                    <Th>Прибор учета</Th>
                                    <Th>Показания</Th>
                                    <Th>За месяц</Th>
                                    <Th>Ед. изм</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {Object.values(indication)[0].map( item => ((
                                    <Tr key={item.id}>
                                         <Td>{item.device_id.device_name}</Td>
                                         <Td isNumeric>{item.value}</Td>
                                         <Td isNumeric>{item.monthly_change || 0 }</Td>
                                         <Td>{item.device_id.device_type_id.units}</Td>
                                     </Tr>
                                )))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </ModalBody>
                <ModalFooter pt={8}>
                <Button
                colorScheme='teal'
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
};

export default IndicationModal;