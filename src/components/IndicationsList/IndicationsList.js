import React, {useState} from "react";
import {Box,
        Stack,
        Flex,
        Text,
        Icon,
        StackDivider,
        useDisclosure,
        useMediaQuery,
        Fade
        } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa6";
import IndicationModal from "../IndicationModal/IndicationModal";


const IndicationsList = ({indications}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

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
            <Text mt={16} fontWeight="500" color="gray.600" textAlign="center">Записи отсутствуют</Text>
            :
            <Box
            as="section"
            maxW="620px"
            w="100%"
            boxShadow="lg"
            borderRadius={8}
            bg="white"
            mt={isMobile ? "32px" : "64px"}
            mb="90px"
            >
                <Stack
                divider={<StackDivider borderColor="gray.200"/>}
                spacing="0"
                align="stretch"
                >
                        {indications && indications.map((ind, i) => ((
                        <Fade
                        in={indications}
                        transition={{exit: {duration: 0.3}, enter: {duration: 0.3}}}
                        key={i}
                        >
                            <Box
                            p={4}
                            w="100%"
                            h="60px"
                            cursor="pointer"
                            _hover={{ bg: "#ebedf0" }}
                            data-id={i}
                            onClick={handleOpenIndicationModal}
                            >
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Text fontWeight="500" color="gray.600">{Object.keys(ind)[0]}</Text>
                                    <Icon as={FaAngleRight}></Icon>
                                </Flex>
                            </Box>
                        </Fade>
                        )))}
                </Stack>
            </Box>
            }
            <IndicationModal isOpen={isOpen} onClose={onClose} indication={indication}/>
        </>
    );
};

export default IndicationsList;