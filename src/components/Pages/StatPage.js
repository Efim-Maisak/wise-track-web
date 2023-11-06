import React, {useState, useEffect} from "react";
import { Container,
        Flex,
        Box,
        Text,
        Menu,
        MenuButton,
        Button,
        MenuList,
        MenuItem,
        Spinner
        } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import BarChart from "../BarChart/BarChart";
import { sortDevicesByName } from "../../utils/sortDevicesByName";
import { sortNumbers } from "../../utils/sortNumbers";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import supabaseService from "../../services/supabaseService";


const StatPage = () => {

    const [ objectIdFromStorage, setObjectIdFromStorage ] = useLocalStorage("", "selectedObjectId");

    const [objectId, setObjectId] = useState(objectIdFromStorage);
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState([]);
    const [indications, setIndications] = useState([]);
    const [filteredIndications, setFilteredIndications] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [charts, setCharts] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    const { getDevices, getIndications } = supabaseService();


    const createYearOptions = (indicationsArr) => {
        let yearArr = [];

        if(indicationsArr) {
            indicationsArr.forEach( elem => {
                yearArr.push(Object.keys(elem)[0].slice(-4));
            });
        }
        setYearOptions(sortNumbers([...new Set(yearArr)]));
        setSelectedYear(sortNumbers([...new Set(yearArr)])[0]);
    };

    const fetchIndications = async () => {
        try {
            const res = await getIndications(objectId);
            if(res.indications) {
                setIndications(composeIndicationsData(res.indications));
                createYearOptions(composeIndicationsData(res.indications));
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

                    valuesArr.forEach(elem => {
                        if(elem.length === 0) {
                            elem.push(0);
                        }
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

    const handleSelectYear = (e) => {
        setSelectedYear(e.target.value);
    };

    const filterIndicationsByYear = (indicationsArr) => {
        if(indicationsArr) {
            if(selectedYear) {
                const result = indicationsArr.filter(item => {
                    if(Object.keys(item)[0].toLowerCase().includes(selectedYear)) return item;
                });
                setFilteredIndications(result);
            } else {
                setFilteredIndications(indicationsArr);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchDevices();
                await fetchIndications();
            } catch (e) {
                throw new Error(e.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        filterIndicationsByYear(indications);
    }, [ indications, selectedYear]);

    useEffect(() => {
        if(devices.length > 0 && indications.length > 0) {
            createChartsBundle(devices, filteredIndications);
        }
    }, [indications, selectedYear, devices, filteredIndications]);

    return (
        <>
            <Container as="div" maxW='4xl' p="0">
                <Box
                 w="620px"
                 pt={16} margin="auto"
                 display={indications.length === 0 ? "none" : "block"}
                 >
                    <Flex justifyContent="flex-end">
                        <Menu placement="bottom-end">
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {selectedYear}
                        </MenuButton>
                        <MenuList minW="0">
                            {yearOptions.map((year, i) => ((
                            <MenuItem w="90px" key={i} value={year} onClick={handleSelectYear}>{year}</MenuItem>
                            )))}
                        </MenuList>
                        </Menu>
                    </Flex>
                </Box>
                {loading
                ?
                <Flex h="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                    <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="teal.500"
                    size="xl"
                    />
                </Flex>
                :
                <>
                    {indications.length === 0
                    ?
                    <Flex h="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                        <Text fontWeight="500" color="gray.600" textAlign="center">Данные для отображения отсутствуют</Text>
                    </Flex>
                    :
                    <Flex justifyContent="center">
                        <Box as="section" mt={8} w="620px">
                            <BarChart chartData={charts} devices={devices}/>
                        </Box>
                    </Flex>
                    }
                </>
                }
            </Container>
        </>
    );
};

export default StatPage;