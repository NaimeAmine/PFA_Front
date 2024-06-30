import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import ClientHome from "./layouts/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { SearchProvider } from "context/SearchContext";
import SignIn from "views/auth/signIn";
import SignUp from "views/auth/signUp";

ReactDOM.render(
  <SearchProvider>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/client/*" element={<ClientHome />} />
            <Route path="/" element={<Navigate to="/client/home" />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </ChakraProvider>
  </SearchProvider>,
  document.getElementById("root")
);
