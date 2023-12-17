import React from "react";
import { Flex, Spacer, HStack, Text, Button, Box, Image } from "@chakra-ui/react";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
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
            <Flex
            p="20px"
            flexDirection={{base: "column", sm: "column", md: "row"}}
            justifyContent="space-around"
            alignItems="center"
            bg="gray.50"
            >
                <Box ml={8}>
                    <Image
                    src={logo}
                    alt="WiseTrack logo"
                    />
                </Box>
                <Spacer/>
                <NavigationMenu/>
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
