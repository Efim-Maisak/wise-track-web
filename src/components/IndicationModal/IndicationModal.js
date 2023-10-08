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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
  } from '@chakra-ui/react'


const IndicationModal = ({isOpen, onClose, indication}) => {

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
                        <TableContainer>
                            <Table size='md'>
                                <Thead>
                                <Tr>
                                    <Th>Прибор учета</Th>
                                    <Th>Показания</Th>
                                    <Th>За месяц</Th>
                                    <Th>Ед. изм</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {Object.values(indication)[0].map( (item, i) => ((
                                    <Tr key={i}>
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
                colorScheme='blue'
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