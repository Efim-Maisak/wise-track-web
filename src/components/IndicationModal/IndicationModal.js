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
import { useMediaQuery } from "@chakra-ui/react";
import { countTotal } from "../../utils/countTotal";
import { formatDate } from "../../utils/formatDate";
import "./indicationModal.css";


const IndicationModal = ({isOpen, onClose, indication}) => {

    const [isMobile] = useMediaQuery("(max-width: 768px)");

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
                <ModalBody px={isMobile ? "8px" : null}>
                    <Box p={{base: "0", sm: "8px", md: "16px"}}>
                        <HStack flexWrap={isMobile ? "wrap" : "none"} justifyContent={isMobile ? "center" : "space-beetwen"}>
                            <Box w={isMobile ? "100%" : "180px"} h={isMobile ? "60px" : "180px"} mb={isMobile ? "10px" : null } alignSelf="center">
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
                            <Box p={4} w="180px" h={isMobile ? "120px" : "180px"} boxShadow="base" borderRadius={8}>
                                <Text mt={isMobile ? "0px" : "20px"} fontWeight="600" textAlign="center">Холодная вода (всего):</Text>
                                <HStack mt={2} justifyContent="center">
                                    <Text fontSize={isMobile ? "24px" : "32px"} fontWeight="800" color="gray.600">{countTotal(indication, "CW")[0]}</Text>
                                    <Text fontSize={isMobile ? "20px" : "28px"} fontWeight="600" color="gray.600">/</Text>
                                    <Text fontSize={isMobile ? "18px" : "26px"} fontWeight="800" color="gray.400" alignSelf="flex-end">{countTotal(indication, "CW")[1]}</Text>
                                </HStack>
                            </Box>
                            <Box p={4} w="180px" h={isMobile ? "120px" : "180px"} boxShadow="base" borderRadius={8}>
                                <Text mt={isMobile ? "0px" : "20px"} fontWeight="600" textAlign="center">Горячая вода (всего):</Text>
                                <HStack mt={2} justifyContent="center">
                                    <Text fontSize={isMobile ? "24px" : "32px"} fontWeight="800" color="gray.600">{countTotal(indication, "HW")[0]}</Text>
                                    <Text fontSize={isMobile ? "20px" : "28px"} fontWeight="600" color="gray.600">/</Text>
                                    <Text fontSize={isMobile ? "18px" : "26px"} fontWeight="800" color="gray.400" alignSelf="flex-end">{countTotal(indication, "HW")[1]}</Text>
                                </HStack>
                            </Box>
                        </HStack>
                        <TableContainer mt={8}>
                            <Table size={{base: "sm", sm: "sm", md: "md"}} className="table-tiny-modal">
                                <Thead>
                                <Tr>
                                    <Th>Прибор учета</Th>
                                    <Th>{isMobile ? "Показ." : "Показания"}</Th>
                                    <Th>{isMobile ? "За мес." : "За месяц"}</Th>
                                    <Th>Ед. изм</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {Object.values(indication)[0].map( item => ((
                                    <Tr key={item.id}>
                                         <Td>{item.device_id.device_name}</Td>
                                         <Td>{item.value}</Td>
                                         <Td>{item.monthly_change || 0 }</Td>
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