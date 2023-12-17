import React, { useState, useEffect} from "react";
import {
    Box,
    HStack,
    Select,
    InputGroup,
    InputLeftElement,
    Input,
    } from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons"


const IndicationsFilter = ({setFilteredIndications, indications, filteredIndications, yearOptions}) => {

    const [searchInput, setSearchInput] = useState("");
    const [yearSelect, setYearSelect] = useState("");
    const [filteredByYear, setFilteredByYear] = useState(null);


    const filterIndicationsBySeach = (indicationsArr, filteredArr) => {

        if(yearSelect) {
            if(filteredArr) {
                if(searchInput.length === 0) {
                    setFilteredIndications(filteredByYear);
                } else {
                    const result = filteredArr.filter(item => {
                        if(Object.keys(item)[0].toLowerCase().includes(searchInput)) return item;
                    });
                    setFilteredIndications(result);
                }
            }
        } else {
            if(indicationsArr) {
                if(searchInput.length === 0) {
                    setFilteredIndications(indicationsArr);
                } else {
                    const result = indicationsArr.filter(item => {
                        if(Object.keys(item)[0].toLowerCase().includes(searchInput)) return item;
                    });
                    setFilteredIndications(result);
                };
            }
        }
    }

    const filterIndicationsByYear = (indicationsArr) => {
        if(indicationsArr) {
            if(yearSelect) {
                const result = indicationsArr.filter(item => {
                    if(Object.keys(item)[0].toLowerCase().includes(yearSelect)) return item;
                });
                setFilteredIndications(result);
                setFilteredByYear(result);
            } else {
                setFilteredIndications(indicationsArr);
            }
        }
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleYearSelect = (e) => {
        setYearSelect(e.target.value);
    }

    useEffect(() => {
        filterIndicationsBySeach(indications, filteredIndications);
    }, [searchInput]);

    useEffect(() => {
        filterIndicationsByYear(indications);
    }, [yearSelect]);


    return (
        <>
            <Box
            as="section"
            maxW="620px"
            w="100%"
            boxShadow="lg"
            borderRadius={8}
            bg="white"
            >
                <HStack p={4} flexDirection={{ base: "column", sm: "column", md: "row"}}>
                    <InputGroup  w="100%">
                        <InputLeftElement pointerEvents='none'>
                        <Search2Icon color='gray.400'/>
                        </InputLeftElement>
                        <Input
                        type="text"
                        bg="#f0f2f5"
                        _placeholder={{opacity: 0.6, color: "#3b4a54", fontSize: "15px"}}
                        _hover={{bg: "#f0f2f5"}}
                        _focus={{bg: "#f0f2f5", borderColor: "teal"}}
                        variant="filled"
                        placeholder="Поиск"
                        value={searchInput}
                        onChange={handleSearchInput}
                        />
                    </InputGroup>
                    <Select
                    w={{ base: "100%", sm: "100%", md: "200px"}}
                    size="md"
                    variant="outline"
                    focusBorderColor="teal.600"
                    placeholder="За все годы"
                    value={yearSelect}
                    onChange={handleYearSelect}
                    >
                        {yearOptions.map( year => ((
                            <option key={year} value={year}>{year}</option>
                        )))}
                    </Select>
                </HStack>
            </Box>
        </>
    );
};

export default IndicationsFilter;