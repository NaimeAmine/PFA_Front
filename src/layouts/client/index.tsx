import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin";
// Layout components
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "routes";
import HomePage from "views/client/homepage";

// Custom Chakra theme
export default function ClientHome(props: { [x: string]: any }) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const location = useLocation(); // Get current location

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
      if (route.layout === "/client") {
        return <Route path={route.path} element={route.element} key={key} />;
      } else {
        return null;
      }
    });
  };

  const { onOpen } = useDisclosure();

  return (
    <Box>
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
          w={{ base: "100%" }}
          maxWidth={{ base: "100%" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" minH="100vh">
            <Routes>{renderRoutes(routes)}</Routes>
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
