import React from "react";
import { Flex, Heading, Spacer, HStack, Text, Button, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ImStatsBars} from "react-icons/im";
import { ImBook } from "react-icons/im";
import { ImHome3 } from "react-icons/im";


const Header = () => {
    return (
        <Flex p="20px" justifyContent="space-around" alignItems="center">
            <Heading as="h1" size="lg" color="#494d4e">WiseTrack</Heading>
            <Spacer/>
            <HStack as="nav" spacing="25px">
                <HStack w="120px">
                    <Icon boxSize={5} color="secondary" as={ImHome3}/>
                    <NavLink to="/" style={({isActive}) => ({color: isActive ? "#494d4e" : "#0078D1", fontWeight: isActive ? "700" : "400"})}>Главная</NavLink>
                </HStack>
                <HStack w="120px">
                    <Icon boxSize={5} color="secondary" as={ImBook}/>
                    <NavLink to="history" style={({isActive}) => ({color: isActive ? "#494d4e" : "#0078D1", fontWeight: isActive ? "700" : "400"})}>История</NavLink>

                </HStack>
                <HStack w="120px">
                    <Icon boxSize={5} color="secondary" as={ImStatsBars}/>
                    <NavLink to="statistics" style={({isActive}) => ({color: isActive ? "#494d4e" : "#0078D1", fontWeight: isActive ? "700" : "400"})}>Статистика</NavLink>
                </HStack>
            </HStack>
            <Spacer/>
            <HStack spacing="20px">
                <Text>mail@mail.com</Text>
                <Button colorScheme="blue">Выйти</Button>
            </HStack>
        </Flex>
    );
};

export default Header;
