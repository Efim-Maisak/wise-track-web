import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Tooltip, IconButton } from "@chakra-ui/react";

const NavigationLink = ({to, label, icon, arialabel, ...props}) => {

    const match = useMatch(to);

    return (
        <NavLink
             to={to}
             {...props}
        >
            <Tooltip
                bg="teal"
                closeDelay={200}
                label={label}
            >
                <IconButton
                    fontSize="20px"
                    variant="ghost"
                    colorScheme="teal"
                    aria-label={arialabel}
                    icon={icon}
                    isActive={match ? true : false}
                />
            </Tooltip>
        </NavLink>
    );
};

export default NavigationLink;