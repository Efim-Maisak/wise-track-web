import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

const RootLayout = ({children}) => {

    const location = useLocation();
    const path = location.pathname;

    return(
        <>
            {path === "/" || path === "/history" || path === "/statistics"
            ?
            <Header h="40px"/>
            :
            null
            }
            <main>
                {children}
            </main>
        </>
    );
};

export default RootLayout;