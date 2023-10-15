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
import supabaseService from "../../services/supabaseService";


const LastIndications = ({selectedObjectId}) => {

    const { getLastIndication, getLastBillingPeriod } = supabaseService();

    const [lastIndications, setLastIndications] = useState([]);
    const [lastIndicationDate, setlastIndicationDate] = useState(null);


    const formatDate = (dateString) => {
        const options = {
            day: 'numeric',
            month: "long",
            year: "numeric"
          };

        const timestamp = Date.parse(dateString);
        const date = new Date(timestamp);
        setlastIndicationDate(date.toLocaleString("ru", options));
    };

    const fetchLastIndication = async (ObjectId) => {
        try {
            await getLastBillingPeriod(ObjectId).then(async res => {
                if(res.error?.message) {
                    throw new Error(res.error.message);
                }
                if(res.last_indication.length > 0) {
                    const lastPeriod = res.last_indication[0].billing_period;
                    const lastInd = await getLastIndication(ObjectId, lastPeriod);
                    formatDate(res.last_indication[0].created_at);
                    setLastIndications(lastInd.indication);
                } else {
                    setLastIndications([]);
                    setlastIndicationDate("Записи отсутствуют");
                }
            });
        } catch(e) {
            throw new Error(e.message);
        }
    };

    useEffect(() => {
        fetchLastIndication(selectedObjectId);
    }, [selectedObjectId]);

    return (
        <>
            <Box as="section" mt="4" p="4" w="620px" boxShadow="base" borderRadius="8px">
                <Heading as="h3" pb={4} size="md">Последние переданные показания</Heading>
                <Flex>
                    {lastIndications.length === 0
                    ?
                    <Text color="gray.400">{lastIndicationDate}</Text>
                    :
                    <Accordion minW="100%" allowToggle>
                        <AccordionItem border="none">
                            <h2>
                            <AccordionButton px="0" _hover={{}}>
                                <Box as="span" flex='1' textAlign='left'>
                                {lastIndicationDate}
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel px="0">
                                <Box>
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
                                                {lastIndications && lastIndications.map( indication =>
                                                    ((<Tr key={indication.id}>
                                                        <Td>{indication.device_id.device_name}</Td>
                                                        <Td isNumeric>{indication.value}</Td>
                                                        <Td isNumeric>{indication.monthly_change}</Td>
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