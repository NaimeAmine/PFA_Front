// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin";
// Layout components
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";

// Custom Chakra theme
export default function ClientHome(props: { [x: string]: any }) {
    const { ...rest } = props;
    // states and functions
    const [fixed] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    // functions for changing the states from components
    const getRoute = () => {
        return window.location.pathname !== "/client/full-screen-maps";
    };
    // const getActiveRoute = (routes) => {
    //     let activeRoute = "Default Brand Text";
    //     for (let i = 0; i < routes.length; i++) {
    //         if (
    //             window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
    //         ) {
    //             return routes[i].name;
    //         }
    //     }
    //     return activeRoute;
    // };
    // const getActiveNavbar = (routes) => {
    //     let activeNavbar = false;
    //     for (let i = 0; i < routes.length; i++) {
    //         if (
    //             window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
    //         ) {
    //             return routes[i].secondary;
    //         }
    //     }
    //     return activeNavbar;
    // };
    // const getActiveNavbarText = (routes) => {
    //     let activeNavbar = false;
    //     for (let i = 0; i < routes.length; i++) {
    //         if (
    //             window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
    //         ) {
    //             return routes[i].name;
    //         }
    //     }
    //     return activeNavbar;
    // };
    const getRoutes = (routes: any) => {
        return routes.map((route: any, key: any) => {
            if (route.layout === "/client") {
                return (
                    <Route
                        path={route.layout + route.path}
                        element={route.element}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    document.documentElement.dir = "ltr";
    const { onOpen } = useDisclosure();
    return (
        <Box>
            {localStorage.getItem("clientId") ? (
                <SidebarContext.Provider
                    value={{
                        toggleSidebar,
                        setToggleSidebar,
                    }}
                >
                    <Box
                        float="right"
                        minHeight="100vh"
                        height="100%"
                        overflow="auto"
                        position="relative"
                        maxHeight="100%"
                        w={{
                            base: "100%"
                        }}
                        maxWidth={{ base: "100%" }}
                        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                        transitionDuration=".2s, .2s, .35s"
                        transitionProperty="top, bottom, width"
                        transitionTimingFunction="linear, linear, ease"
                    >


                        {getRoute() ? (
                            <Box
                                mx="auto"
                                p={{ base: "20px", md: "30px" }}
                                pe="20px"
                                minH="100vh"
                                pt="50px"
                            >
                                <Routes>
                                    {getRoutes(routes)}

                                    <Route path="/" element={<Navigate to="/client/home" />} />
                                </Routes>
                            </Box>
                        ) : null}

                    </Box>
                </SidebarContext.Provider>
            ) : (
                <Navigate to="/auth/sign-in" />
            )}
        </Box>
    );
}
