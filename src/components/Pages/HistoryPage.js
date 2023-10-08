import React, { useEffect, useState } from "react";
import { Container, Flex } from "@chakra-ui/react";
import IndicationsList from "../IndicationsList/IndicationsList";
import supabaseService from "../../services/supabaseService";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const HistoryPage = () => {

    const [ objectIdFromStorage, setObjectIdFromStorage ] = useLocalStorage("", "selectedObjectId");

    const [objId, setObjId] = useState(objectIdFromStorage);
    const [composedIndications, setComposedIndications] = useState(null);


    const { getIndications } = supabaseService();

    const fetchIndications = async (objectId) => {
        try {
            const res = await getIndications(objectId);
            if(res.indications) {
                setComposedIndications(composeIndicationsData(res.indications));
            }

        } catch(e) {
            throw new Error(e.message);
        }
    }

    const formatDate = (inputDate)  => {
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
            const period = formatDate(item.billing_period);

            if (!groupedData[period]) {
            groupedData[period] = [];
            }

            groupedData[period].push(item);
        });

        return Object.entries(groupedData).map(([period, group]) => ({
            [period]: group
        }));
    };

    useEffect(() => {
        fetchIndications(objId);
    }, []);


    return (
        <>
        <Container maxW='4xl' as="div" p="0">
            <Flex minH="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                <IndicationsList indications={composedIndications}/>
            </Flex>
        </Container>
        </>
    );
};

export default HistoryPage;