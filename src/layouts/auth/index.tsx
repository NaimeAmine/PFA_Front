import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";

// Chakra imports
import { Box, useColorModeValue } from "@chakra-ui/react";

// Layout components
import { SidebarContext } from "contexts/SidebarContext";

// Custom Chakra theme
export default function Auth() {
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const getRoutes = (routes: any) => {
    return routes.map((route: any, key: any) => {
      if (route.layout === "/auth") {
        console.log(route.layout + route.path)
        return (
          <Route
            path={route.layout + route.path}
            element={route.element} // Use route.element directly
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const authBg = useColorModeValue("white", "navy.900");
  document.documentElement.dir = "ltr";

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" minH="100vh">
            <Routes>
              {getRoutes(routes)}
              <Route path="/auth" element={<Navigate to="/auth/sign-in" />} />
            </Routes>
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
