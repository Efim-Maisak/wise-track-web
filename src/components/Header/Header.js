import React from "react";
import { Flex, Spacer, HStack, Text, Button, Box, Image } from "@chakra-ui/react";
import { ImStatsBars, ImBook, ImHome3 } from "react-icons/im";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import logo from "../../images/wisetrack-logo-250-50.png";


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
            <Flex p="20px" justifyContent="space-around" alignItems="center" bg="gray.50">
                <Box ml={8}>
                    <Image
                    src={logo}
                    alt="WiseTrack logo"
                    />
                </Box>
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
                <HStack spacing="20px" mr={8}>
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
