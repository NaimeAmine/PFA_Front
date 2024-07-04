import React, { useContext, useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  CircularProgress,
  ChakraProvider,
  Heading,
  Image,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";

import bgMastercard from "assets/img/dashboards/client-home.jpg";
import Cookies from "js-cookie";

import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  // Explicitly type the value as Date | [Date, Date]
  const [value, setValue] = useState<Date | [Date, Date]>(new Date());
  const [room, setRoom] = useState<any>([]);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    Cookies.set("startDate", startDate.toString());
    if (endDate != null) {
      Cookies.set("endDate", endDate?.toString());
    }

    window.location.href = "/auth/sign-in";
  };

  const handleCalendarChange = async (value: Date | [Date, Date]) => {
    setLoading(true);
    setValue(value);
    if (Array.isArray(value)) {
      setStartDate(value[0]);
      setEndDate(value[1]);
      const response = await fetch(
        `http://localhost:8080/api/client/available-ads?startDate=${
          value[0].toISOString().split("T")[0]
        }&endDate=${value[1].toISOString().split("T")[0]}`
      );
      const data = await response.json();
      if (data.length === 0) {
        setNoData(true);
        setLoading(false);
      }

      setLoading(false);
      console.log(data);
      setRoom(data);
    } else {
      setStartDate(value);
      setEndDate(null);
      const response = await fetch(
        `http://localhost:8080/api/client/available-ads?startDate=${
          value.toISOString().split("T")[0]
        }`
      );
      const data = await response.json();
      if (data.length === 0) {
        setNoData(true);
        setLoading(false);
      }

      setLoading(false);
      console.log(data);
      setRoom(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/client/available-ads?startDate=${
          new Date().toISOString().split("T")[0]
        }`
      );
      const data = await response.json();
      if (data.length === 0) {
        setNoData(true);
        setLoading(false);
      }

      setLoading(false);
      console.log(data);
      setRoom(data);
    };
    fetchData();
  }, []);

  return (
    <Box
      height="100vh"
      padding={0}
      backgroundImage={`url(${bgMastercard})`}
      backgroundSize="cover"
      style={{ backdropFilter: "blur(5px)", padding: "0px !important" }}
      backgroundPosition="center"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem"
        position="relative"
        zIndex="2"
        bg="rgba(0, 0, 0, 0.7)"
        color="white"
      >
        <Box>
          <Heading size="md">EasyDesk</Heading>
        </Box>
        {localStorage.getItem("clientId") ? (
          <Box>
            <Button
              mr={4}
              colorScheme="teal"
              onClick={() => {
                navigate("/admin/services");
              }}
            >
              Tableau de bord
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                localStorage.removeItem("clientId");
                navigate("/");
              }}
            >
              Se déconnecter
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              colorScheme="violet"
              mr={4}
              onClick={() => {
                navigate("/auth/sign-in");
              }}
            >
              Connecter-vous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/auth/sign-up");
              }}
            >
              S'inscrire
            </Button>
          </Box>
        )}
      </Flex>
      <Flex
        direction={"row"}
        justifyContent={"space-evenly"}
        align="baseline"
        height="calc(100vh - 80px)"
        bg="rgba(0, 0, 0, 0.5)"
      >
        <Flex
          direction="row"
          align="center"
          justify="center"
          width={"100%"}
          height="calc(100vh - 80px)"
        >
          <Flex
            as="form"
            bg="white"
            p={8}
            borderRadius="md"
            boxShadow="md"
            width="100%"
            maxWidth="1200px"
            justifyContent={"right"}
            alignItems={"right"}
            onSubmit={handleSubmit}
          >
            <FormControl mb={4} maxWidth="400px">
              <FormLabel>Date de reservation</FormLabel>
              <Calendar
                onChange={handleCalendarChange}
                value={value}
                selectRange
              />
            </FormControl>
            <Center height="400px">
              <Divider orientation="vertical" />
            </Center>

            <Box p={8} width="100%" maxWidth="800px">
              <Heading size="md" mb={4}>
                Salle disponible{" "}
                {startDate && `de ${startDate.toLocaleDateString()}`}{" "}
                {endDate && `a ${endDate?.toLocaleDateString()}`}{" "}
                {!value && "aujourd'hui"}
              </Heading>
              <Box justifyContent={"center"} alignItems={"center"} mb={4}>
                {loading && (
                  <CircularProgress isIndeterminate color="green.300" />
                )}
              </Box>
              {noData && <Box>Aucune salle disponible</Box>}
              {room.length > 0 && (
                <Flex direction={"column"}>
                  {room.map((item: any) => (
                    <Box
                      width={"100%"}
                      key={item.id}
                      p={4}
                      alignItems={"center"}
                      mb={4}
                      bg="gray.200"
                      borderRadius="md"
                      justifyContent="start"
                    >
                      <Flex
                        direction={"row"}
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <Flex
                          direction={"row"}
                          alignItems={"center"}
                          width="100%"
                        >
                          <Image
                            objectFit={"cover"}
                            src={`data:image/jpeg;base64,${item.returnedImg}`}
                            width="150px"
                            height="100px"
                            borderRadius="5px"
                            mr={4}
                          />
                          <Flex direction={"column"} flex="1">
                            <Heading size="lg">{item.serviceName}</Heading>
                            <Box>
                              <Box fontWeight={"light"}>{item.description}</Box>
                            </Box>
                          </Flex>
                        </Flex>

                        <Flex alignItems={"center"}>
                          <Box
                            fontWeight={"bold"}
                            width="100%"
                            fontSize="20px"
                            mr={4}
                          >
                            <Text fontSize="sm">
                              À partir de
                              <Text fontSize={"22px"} fontWeight={"bold"}>
                                {item.price} DH
                              </Text>
                            </Text>
                            <Button
                              variant={"darkBrand"}
                              color="white"
                              fontSize="sm"
                              fontWeight="500"
                              borderRadius="70px"
                              px="34px"
                              py="5px"
                              mt="5px"
                              onClick={() => {
                                navigate(`/admin/services`);
                              }}
                            >
                              Réserver
                            </Button>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
