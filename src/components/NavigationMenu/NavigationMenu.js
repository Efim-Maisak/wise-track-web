import React from "react";
import { Flex, HStack } from "@chakra-ui/react";
import { ImStatsBars, ImBook, ImHome3 } from "react-icons/im";
import NavigationLink from "../NavigationLink/NavigationLink";


const NavigationMenu = (props) => {
    return (
        <Flex h="70px" justifyContent="center" bg="gray.50" {...props}>
            <HStack as="nav" spacing="50px">
                <HStack w="40px">
                    <NavigationLink to="/" label="Главная" icon={<ImHome3/>} arialabel="Главная страница"/>
                </HStack>
                <HStack w="40px">
                    <NavigationLink to="history" label="История" icon={<ImBook/>} arialabel="История показаний"/>
                </HStack>
                <HStack w="40px">
                    <NavigationLink to="statistics" label="Статистика" icon={<ImStatsBars/>} arialabel="Статистика"/>
                </HStack>
            </HStack>
        </Flex>
    );
};

export default NavigationMenu;