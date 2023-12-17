import React, { useState, useEffect } from "react";
import { Box,
        Heading,
        Flex,
        Text,
        Accordion,
        AccordionItem,
        AccordionButton,
        AccordionIcon,
        AccordionPanel,
        Table,
        Thead,
        Tbody,
        Tr,
        Th,
        Td,
        TableContainer
        } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { formatDate } from "../../utils/formatDate";
import supabaseService from "../../services/supabaseService";
import "./lastIndications.css";


const LastIndications = ({selectedObjectId, indicationsIsAdded}) => {

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const dateOptions = {
        day: 'numeric',
        month: "long",
        year: "numeric"
      };

    const { getLastIndication, getLastBillingPeriod } = supabaseService();
    const [lastIndications, setLastIndications] = useState([]);
    const [lastIndicationDate, setlastIndicationDate] = useState(null);


    const fetchLastIndication = async (ObjectId) => {
        if(ObjectId) {
            try {
                await getLastBillingPeriod(ObjectId).then(async res => {
                    if(res.error?.message) {
                        throw new Error(res.error.message);
                    }
                    if(res.last_indication.length > 0) {
                        const lastPeriod = res.last_indication[0].billing_period;
                        const lastInd = await getLastIndication(ObjectId, lastPeriod);
                        setlastIndicationDate(formatDate(res.last_indication[0].created_at, dateOptions));
                        setLastIndications(lastInd.indication);
                    } else {
                        setLastIndications([]);
                        setlastIndicationDate("Записи отсутствуют");
                    }
                });
            } catch(e) {
                throw new Error(e.message);
            }
        } else {
            setlastIndicationDate("Записи отсутствуют");
        }
    };

    useEffect( () => {
        fetchLastIndication(selectedObjectId);
    }, [selectedObjectId, indicationsIsAdded]);


    return (
        <>
            <Box
            as="section"
            mt={8}
            p={{ base: "4px", sm: "8px", md: "16px"}}
            maxW="620px"
            w="100%"
            boxShadow="lg"
            borderRadius="8px"
            bg="white"
            >
                <Heading as="h3" pb={4} size={{ base: "sm", sm: "sm", md: "md"}}>Последние переданные показания</Heading>
                <Flex>
                    {lastIndications.length === 0
                    ?
                    <Text color="gray.400">{lastIndicationDate}</Text>
                    :
                    <Accordion minW="100%" allowToggle>
                        <AccordionItem border="none">
                            <h2>
                            <AccordionButton px="0" _hover={{}}>
                                <Box as="span" flex='1' pl="6px" textAlign="left">
                                {lastIndicationDate}
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel px="0">
                                <Box>
                                    <TableContainer>
                                        <Table size={{base: "sm", sm: "sm", md: "md"}} className="table-tiny">
                                            <Thead>
                                            <Tr>
                                                <Th>Прибор учета</Th>
                                                <Th>{isMobile ? "Показ." : "Показания"}</Th>
                                                <Th>{isMobile ? "За мес." : "За месяц"}</Th>
                                                <Th>Ед. изм</Th>
                                            </Tr>
                                            </Thead>
                                            <Tbody>
                                                {lastIndications && lastIndications.map( indication =>
                                                    ((<Tr key={indication.id}>
                                                        <Td>{indication.device_id.device_name}</Td>
                                                        <Td>{indication.value}</Td>
                                                        <Td>{indication.monthly_change}</Td>
                                                        <Td>{indication.device_id.device_type_id.units}</Td>
                                                    </Tr>))
                                                )}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    }
                </Flex>
            </Box>
        </>
    );
};

export default LastIndications;