import {
    Box,
    Flex,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    MenuGroup,
    MenuDivider,
    IconButton,
    Image,
    useMediaQuery
    } from "@chakra-ui/react";
import { RxExit } from "react-icons/rx";
import { SlMenu } from "react-icons/sl";
import Header from "../Header/Header";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import logo from "../../images/wisetrack-logo-250-50.png";

const RootLayout = ({children}) => {

    const {user, signOut} = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const path = location.pathname;

    const handleLogOut = () => {
        signOut();
        localStorage.removeItem("selectedObject");
        localStorage.removeItem("selectedObjectId");
        navigate("/login");
    };

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const header = isMobile
    ?
    (
    <Flex h="90px" justifyContent="space-between" alignItems="center" bg="gray.50" >
        <Box maxH="90px" maxW="150px" ml={8}>
            <Image
            src={logo}
            alt="WiseTrack logo"
            />
        </Box>
        <Menu placement="bottom-end">
            <MenuButton
                as={IconButton}
                aria-label="mobile-menu"
                icon={<SlMenu/>}
                variant="solid"
                mr="10px"
                bg="gray.50"
            />
            <MenuList minW="0">
            <MenuGroup title="Пользователь:">
                <MenuItem isDisabled>
                    {user && user.email}
                </MenuItem>
            </MenuGroup>
                <MenuDivider />
                <MenuItem icon={<RxExit fontSize="16px" color="red.500"/>} onClick={handleLogOut}>
                Выйти
                </MenuItem>
            </MenuList>
        </Menu>
    </Flex>
    )
    :
    (
    <Header h="40px"/>
    );

    return(
        <>
            {path === "/" || path === "/history" || path === "/statistics"
            ?
            header
            :
            null
            }
            <main>
                {children}
            </main>
            {
            isMobile
            ?
            <NavigationMenu w="100%" pos="fixed" bottom="0" zIndex={2}/>
            :
            null
            }
        </>
    );
};

export default RootLayout;