import React from "react";
import { Flex, Heading, Spacer, HStack, Text, Button } from "@chakra-ui/react";
import { ImStatsBars, ImBook, ImHome3 } from "react-icons/im";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";


const Header = () => {

    const {user, signOut} = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut();
        localStorage.removeItem("selectedObject");
        localStorage.removeItem("selectedObjectId");
        navigate("/login");
    };

    return (
        <>
            <Flex p="20px" justifyContent="space-around" alignItems="center">
                <Heading as="h1" size="lg" color="#494d4e">WiseTrack</Heading>
                <Spacer/>
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
                <Spacer/>
                <HStack spacing="20px">
                    <Text color="gray.700" fontWeight="500">{user?.email || ""}</Text>
                    <Button
                    colorScheme="teal"
                    onClick={handleLogOut}
                    >Выйти</Button>
                </HStack>
            </Flex>
        </>

    );
};

export default Header;
