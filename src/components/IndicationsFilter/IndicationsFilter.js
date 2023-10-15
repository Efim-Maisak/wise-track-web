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


const IndicationsFilter = ({setFilteredIndications, indications, yearOptions}) => {

    const [searchInput, setSearchInput] = useState("");
    const [yearSelect, setYearSelect] = useState("");


    const filterIndications = (indicationsArr) => {

        if(indicationsArr) {
            if(searchInput.length === 0) {
                setFilteredIndications(indicationsArr);
            } else {
                const result = indicationsArr.filter(item => {
                    if(Object.keys(item)[0].toLowerCase().includes(searchInput)) return item;
                });
                setFilteredIndications(result);
            };

            if(yearSelect) {
                const result = indicationsArr.filter(item => {
                    if(Object.keys(item)[0].toLowerCase().includes(yearSelect)) return item;
                });
                setFilteredIndications(result);
                setSearchInput("");
            }
        }
    }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleYearSelect = (e) => {
        setYearSelect(e.target.value)
    }

    useEffect(() => {
        filterIndications(indications);
    }, [searchInput]);

    useEffect(() => {
        filterIndications(indications);
    }, [yearSelect]);

    return (
        <>
            <Box as="section" w="620px" border="1px" borderColor="gray.200" borderRadius={8}>
                <HStack p={4}>
                    <InputGroup>
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
                    maxW="220px"
                    size="md"
                    variant="outline"
                    _focus={{borderColor: "teal"}}
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