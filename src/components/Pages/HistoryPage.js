import React, { useEffect, useState } from "react";
import { Container, Flex, Spinner, Box, Text } from "@chakra-ui/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import IndicationsList from "../IndicationsList/IndicationsList";
import IndicationsFilter from "../IndicationsFilter/IndicationsFilter";

import supabaseService from "../../services/supabaseService";



const HistoryPage = () => {

    const [ objectIdFromStorage, setObjectIdFromStorage ] = useLocalStorage("", "selectedObjectId");

    const [objId, setObjId] = useState(objectIdFromStorage);
    const [composedIndications, setComposedIndications] = useState(null);
    const [filteredIndications, setFilteredIndications] = useState(null);
    const [yearOptions, setYearOptions] = useState([]);
    const [loading, setLoading] = useState(false);


    const { getIndications } = supabaseService();

    const fetchIndications = async (objectId) => {
        if(objectId) {
            try {
                setLoading(true);
                const res = await getIndications(objectId);
                if(res.indications) {
                    setComposedIndications(composeIndicationsData(res.indications));
                    setFilteredIndications(composeIndicationsData(res.indications));
                    createYearOptions(composeIndicationsData(res.indications));
                    setLoading(false);
                }

            } catch(e) {
                setLoading(false);
                throw new Error(e.message);
            }
        }
    }

    const formatDates = (inputDate)  => {
        const [year, month] = inputDate.split("-");

        const monthsArr = [
          "январь", "февраль", "март", "апрель", "май", "июнь",
          "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
        ];

        const monthName = monthsArr[parseInt(month, 10) - 1];

        return `${monthName} ${year}`;
      }

    function composeIndicationsData(indicationsArr) {
        const groupedData = {};

        indicationsArr.forEach(item => {
            const period = formatDates(item.billing_period);

            if (!groupedData[period]) {
            groupedData[period] = [];
            }

            groupedData[period].push(item);
        });

        return Object.entries(groupedData).map(([period, group]) => ({
            [period]: group
        }));
    };

    const createYearOptions = (indicationsArr) => {
        let yearArr = [];

        if(indicationsArr) {
            indicationsArr.forEach( elem => {
                yearArr.push(Object.keys(elem)[0].slice(-4));
            });
        }
        setYearOptions([...new Set(yearArr)]);
    };

    const sortIndicationsByDeviceName = (arr) => {
        if(arr) {
            arr.forEach(item => {
                Object.values(item)[0].sort((a, b) => {
                    if (a.device_id.device_name < b.device_id.device_name) return -1;
                    if (a.device_id.device_name > b.device_id.device_name) return 1;
                    return 0;
                });
            });

            return arr;
        }
    };

    useEffect(() => {
        fetchIndications(objId);
    }, []);


    return (
        <>
        <Flex w="100%" minH="100vh" bg="gray.50">
            <Container maxW='4xl' as="div" p="0">
                <Flex mt={16} justifyContent="center">
                    <IndicationsFilter
                    maxW="100%"
                    setFilteredIndications={setFilteredIndications}
                    indications={composedIndications}
                    filteredIndications={filteredIndications}
                    yearOptions={yearOptions}
                    />
                </Flex>
                <Flex flexDirection="column" justifyContent="start" alignItems="center">
                    {!loading && !composedIndications ? <Text mt={16} color="gray.600" fontWeight="500">Здесь будет отображаться история переданных показаний приборов учета</Text> : null}
                    {!loading
                    ?
                    <Box maxW="100%" mt={16}>
                        <IndicationsList
                        indications={sortIndicationsByDeviceName(filteredIndications)}
                        />
                    </Box>
                    :
                    <Spinner
                    mt={16}
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="teal.500"
                    size="xl"
                    />
                    }
                </Flex>
            </Container>
        </Flex>
        </>
    );
};

export default HistoryPage;