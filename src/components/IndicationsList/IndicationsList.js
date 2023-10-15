import React, {useState} from "react";
import {Box,
        Stack,
        Flex,
        Text,
        Icon,
        StackDivider,
        useDisclosure
        } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa6";
import IndicationModal from "../IndicationModal/IndicationModal";


const IndicationsList = ({indications}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [indication, setIndication] = useState(null);

    const pickIndicationForModal = (indicationsArr, index) => {
        const indicationItem = indicationsArr[index]
        setIndication(indicationItem);
    };

    const handleOpenIndicationModal = (e) => {
        const element = e.currentTarget;
        const clickedElementIndex = element.getAttribute("data-id");
        pickIndicationForModal(indications, clickedElementIndex);
        onOpen();
    };

    return(
        <>
            {indications && indications.length === 0
            ?
            <Text w="100%" mt={16} textAlign="center">Записи отсутствуют</Text>
            :
            <Box as="section" mt={8} w="620px" border="1px" borderColor="gray.200" borderRadius={8}>
                <Stack
                divider={<StackDivider borderColor="gray.200"/>}
                spacing="0"
                align="stretch"
                >
                    {indications && indications.map((ind, i) => ((
                    <Box
                    p={4}
                    h="60px"
                    cursor="pointer"
                    _hover={{ bg: "#ebedf0" }}
                    key={i}
                    data-id={i}
                    onClick={handleOpenIndicationModal}
                    >
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text>{Object.keys(ind)[0]}</Text>
                            <Icon as={FaAngleRight}></Icon>
                        </Flex>
                    </Box>
                    )))}
                </Stack>
            </Box>
            }
            <IndicationModal isOpen={isOpen} onClose={onClose} indication={indication}/>
        </>
    );
};

export default IndicationsList;