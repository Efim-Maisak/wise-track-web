import React, {useState, useEffect} from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import BarChart from "../BarChart/BarChart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import supabaseService from "../../services/supabaseService";


const StatPage = () => {

    const [ objectIdFromStorage, setObjectIdFromStorage ] = useLocalStorage("", "selectedObjectId");

    const [objectId, setObjectId] = useState(objectIdFromStorage);
    const [devices, setDevices] = useState([]);
    const [indications, setIndications] = useState([]);
    const [charts, setCharts] = useState([]);

    const { getDevices, getIndications } = supabaseService();

    const fetchIndications = async () => {
        try {
            const res = await getIndications(objectId);
            if(res.indications) {
                setIndications(composeIndicationsData(res.indications));
            }
        }catch(e){
            throw new Error(e.message);
        }
    };

    const fetchDevices = async () => {
        try {
            const res = await getDevices(objectId);
            if(res.devices) {
                setDevices(res.devices);
            }
        }catch(e){
            throw new Error(e.message);
        }
    }

    const sortDevicesByName = (devicesArr) => {
        if (devicesArr) {
            devicesArr.sort((a, b) => {
                if (a.device_name < b.device_name) return -1;
                if (a.device_name > b.device_name) return 1;
                return 0;
            });
            return devicesArr;
        };
    };

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
        console.log(groupedData);
        return Object.entries(groupedData).map(([period, group]) => ({
            [period]: group
        }));
    }

    const createChartsBundle = (devicesArr, indicationsArr) => {

        let chartsArr = [];

        if(devicesArr.length > 0 && indicationsArr.length > 0) {

            const sortedDevices = sortDevicesByName(devicesArr);

            sortedDevices.forEach( deviceItem => {

                const deviceName = deviceItem.device_name;
                const labelsArr = indicationsArr.map(item => Object.keys(item)[0].split(" ")[0])
                const valuesArr = indicationsArr.map(monthItem => {
                   return Object.values(monthItem)[0].filter(item => {
                        return item.device_id.device_name === deviceName;
                    }).map(item => item.monthly_change);
                });

                chartsArr.push({
                    labels: labelsArr,
                    datasets: [
                        {
                        label: deviceName,
                        data: valuesArr.flat(),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(255, 159, 64, 0.5)",
                            "rgba(255, 205, 86, 0.5)",
                            "rgba(75, 192, 192, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                            "rgba(231, 233, 237, 0.5)"
                            ],
                            barPercentage: 0.95,
                        }
                    ]
                });
            });

            setCharts(chartsArr);
        }
    }

    useEffect(() => {
        fetchDevices();
        fetchIndications();
    }, []);

    useEffect(() => {
        createChartsBundle(devices, indications);
    }, [devices, indications]);


    return (
        <>
        {console.log(indications)}
        {console.log(devices)}
        {console.log(charts)}
        <Container maxW='4xl' as="div" p="0">
            <Flex justifyContent="center">
                <Box as="section" mt="4" w="620px">
                    <BarChart chartData={charts}/>
                </Box>
            </Flex>
        </Container>
        </>
    );
};

export default StatPage;