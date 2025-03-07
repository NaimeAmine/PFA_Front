import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin";
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "routes";

export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const location = useLocation(); // Get current location

  // functions for changing the states from components
  const getActiveRoute = (routes: any) => {
    let activeRoute = "Default Brand Text";
    routes.forEach((route: any) => {
      if (location.pathname.indexOf(route.layout + route.path) !== -1) {
        activeRoute = route.name;
      }
    });
    return activeRoute;
  };

  const getActiveNavbar = (routes: any) => {
    let activeNavbar = false;
    routes.forEach((route: any) => {
      if (location.pathname.indexOf(route.layout + route.path) !== -1) {
        activeNavbar = route.secondary;
      }
    });
    return activeNavbar;
  };

  const getActiveNavbarText = (routes: any) => {
    let activeNavbarText = "";
    routes.forEach((route: any) => {
      if (location.pathname.indexOf(route.layout + route.path) !== -1) {
        activeNavbarText = route.name;
      }
    });
    return activeNavbarText;
  };

  const renderRoutes = (routes: any) => {
    return routes.map((route: any, key: any) => {
      if (route.layout === "/admin") {
        return (
          <Route path={route.path} element={route.element} key={key} />
        );
      } else {
        return null;
      }
    });
  };

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
          <Sidebar routes={routes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: "100%", xl: "calc( 100% - 290px )" }}
            maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={"Bookify"}
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Routes>
                {renderRoutes(routes)}
              </Routes>
            </Box>

            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </Box>
  );
}
