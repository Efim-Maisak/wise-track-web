import React from "react";
import { Flex, Heading, Spacer, HStack, Text, Button, IconButton, Tooltip } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ImStatsBars, ImBook, ImHome3 } from "react-icons/im";


const Header = () => {
    return (
        <Flex p="20px" justifyContent="space-around" alignItems="center">
            <Heading as="h1" size="lg" color="#494d4e">WiseTrack</Heading>
            <Spacer/>
            <HStack as="nav" spacing="50px">
                <HStack w="40px">
                    <NavLink to="/">
                        <Tooltip bg="teal" closeDelay={200} label="Главная">
                            <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Главная страница"
                            icon={<ImHome3/>}
                            isActive
                            />
                        </Tooltip>
                    </NavLink>
                </HStack>
                <HStack w="40px">
                    <NavLink to="history">
                        <Tooltip bg="teal" closeDelay={200} label="История">
                            <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="История показаний"
                            icon={<ImBook/>}
                            />
                        </Tooltip>
                    </NavLink>
                </HStack>
                <HStack w="40px">
                    <NavLink to="statistics">
                        <Tooltip bg="teal" closeDelay={200} label="Статистика">
                            <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Статистика"
                            icon={<ImStatsBars/>}
                            />
                        </Tooltip>
                    </NavLink>
                </HStack>
            </HStack>
            <Spacer/>
            <HStack spacing="20px">
                <Text>mail@mail.com</Text>
                <Button colorScheme="teal">Выйти</Button>
            </HStack>
        </Flex>
    );
};

export default Header;
