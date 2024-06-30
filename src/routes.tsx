import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/auth/signUp";
import Equipments from "views/admin/equipments";
import { FaBox, FaHome } from "react-icons/fa";
import HomePage from "views/client/homepage";
import { FcHome } from "react-icons/fc";

const routes = [
  {
    name: "Salles",
    layout: "/admin",
    path: "/services",
    icon: (
      <Icon
        as={FaHome}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    element: <NFTMarketplace />,
    secondary: true,
    role: "admin",
  },
  {
    name: "Home",
    layout: "/client",
    icon: <Icon as={FcHome} width="20px" height="20px" color="inherit" />,
    path: "/home",
    element: <HomePage />,
    role: "client",
  },
  {
    name: "Reservations",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    element: <DataTables />,
    role: "all",
  },
  {
    name: "Equipments",
    layout: "/admin",
    icon: <Icon as={FaBox} width="20px" height="20px" color="inherit" />,
    path: "/equipments",
    element: <Equipments />,
    role: "admin",
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    element: <SignInCentered />,
    role: "all",
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    element: <SignUpCentered />,
    role: "all",
  },
];

export default routes;
