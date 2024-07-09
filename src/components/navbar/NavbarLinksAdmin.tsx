// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import routes from "routes";
import { SearchContext } from "context/SearchContext";

interface Reservation {
  id: string;
  reservationStatus: string;
  [key: string]: any; // Include other potential properties
}
export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  // useEffect(() => {
  //   const fetchReservations = async () => {
  //     try {
  //       const clientId = localStorage.getItem("clientId");
  //       if (!clientId) throw new Error("Identifiant client non trouvé");

  //       const response = await fetch(
  //         `http://localhost:8080/api/client/my-bookings/${clientId}`
  //       );
  //       if (!response.ok)
  //         throw new Error("Échec de la récupération des réservations");

  //       const newData: Reservation[] = await response.json();
  //       const storedData = localStorage.getItem("reservations");
  //       const oldData: Reservation[] = storedData ? JSON.parse(storedData) : [];

  //       checkForChanges(newData, oldData);
  //       setReservations(newData);
  //       localStorage.setItem("reservations", JSON.stringify(newData));
  //     } catch (error) {
  //       console.error("Erreur:", error);
  //     }
  //   };

  //   const intervalId = setInterval(fetchReservations, 3000);
  //   // fetchReservations();

  //   return () => clearInterval(intervalId);
  // }, []);

  const checkForChanges = (newData: Reservation[], oldData: Reservation[]) => {
    const newNotifications: string[] = [];
    newData.forEach((newElement) => {
      const oldElement = oldData.find((res) => res.id === newElement.id);
      if (
        oldElement &&
        oldElement.reservationStatus !== newElement.reservationStatus
      ) {
        newNotifications.push(
          `Le statut de la réservation ${newElement.id} a changé en ${newElement.reservationStatus}`
        );
      }
    });

    if (newNotifications.length > 0) {
      setNotifications((prev) => [...prev, ...newNotifications]);
    }
  };

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: "10px", md: "unset" };
          }
          return "unset";
        }}
        me="10px"
        borderRadius="30px"
      />

      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
          </Flex>
          <Flex flexDirection="column">
            {notifications.map((notification, index) => (
              <MenuItem
                key={index}
                _hover={{ bg: "none" }}
                _focus={{ bg: "none" }}
                px="0"
                borderRadius="8px"
                mb="10px"
              >
                <ItemContent info={notification} />
              </MenuItem>
            ))}
          </Flex>
        </MenuList>
      </Menu>

      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            name="Adela Parkson"
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey,{" "}
              {localStorage.getItem("username")
                ? localStorage.getItem("username")
                : "Admin"}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            {/* <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm">Newsletter Settings</Text>
            </MenuItem> */}
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={() => {
                localStorage.removeItem("clientId");
                window.location.href = "/auth/sign-in";
              }}
            >
              <Text fontSize="sm">Se déconnecter</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
