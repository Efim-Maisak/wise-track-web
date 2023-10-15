import React, {useState} from "react";
import {
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


const IndicationModal = ({isOpen, onClose, indication}) => {

    //const [indicationDate, setIndicationDate] = useState(null);


    const formatDate = (dateString) => {
        const options = {
            day: 'numeric',
            month: "numeric",
            year: "numeric"
          };

        const timestamp = Date.parse(dateString);
        const date = new Date(timestamp);

        return date.toLocaleString("ru", options);
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
                        <Badge
                        m={4}
                        variant="solid"
                        colorScheme="teal"
                        fontSize="14px"
                        >
                        {formatDate(Object.values(indication)[0][0].created_at)}
                        </Badge>
                        <TableContainer>
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