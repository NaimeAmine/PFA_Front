
import React, { useContext, useEffect, useState } from "react";

// Chakra imports
import {
    Box,
    Button,
    Flex,

    FormControl,
    FormLabel,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Textarea,
    CircularProgress,
    ChakraProvider,
    Heading,
    Select,
    Image,
} from "@chakra-ui/react";

import bgMastercard from 'assets/img/dashboards/client-home.jpg';
import Cookies from 'js-cookie';

import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import 'assets/css/MiniCalendar.css';
import { useNavigate } from "react-router-dom";
export default function HomePage() {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    // Explicitly type the value as Date | [Date, Date]
    const [value, setValue] = useState<Date | [Date, Date]>(new Date());
    const [room, setRoom] = useState<any>([]);
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
                `http://localhost:8080/api/client/available-ads?startDate=${value[0].toISOString().split('T')[0]}&endDate=${value[1].toISOString().split('T')[0]}`
            );
            const data = await response.json();
            if (data.length === 0) {
                return;
            }

            setLoading(false);
            console.log(data);
            setRoom(data);
        } else {
            setStartDate(value);
            setEndDate(null);
        }
    };


    return (
        <ChakraProvider>
            <Box
                height="100vh"
                backgroundImage={`url(${bgMastercard})`}
                backgroundSize="cover"
                style={{ backdropFilter: "blur(5px)" }}
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
                        <Heading size="md">Mon Bureau</Heading>
                    </Box>
                    <Box>
                        <Button mr={4} colorScheme="teal">
                            Connecter-vous
                        </Button>
                        <Button colorScheme="teal" variant="outline">
                            S'inscrire
                        </Button>
                    </Box>
                </Flex>
                <Flex direction={"row"} justifyContent={"space-evenly"}
                    align="center"
                    height="calc(100vh - 80px)"

                    bg="rgba(0, 0, 0, 0.5)"
                >
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        height="calc(100vh - 80px)"
                    >
                        <Heading color="white" mb={6}>
                            Reserver vos besoins
                        </Heading>
                        <Box
                            as="form"
                            bg="white"
                            p={8}
                            borderRadius="md"
                            boxShadow="md"
                            width="100%"
                            maxWidth="400px"
                            justifyContent={"right"}
                            alignItems={"right"}
                            onSubmit={handleSubmit}
                        >

                            <FormControl mb={4}>
                                <FormLabel>Date de reservation</FormLabel>
                                <Calendar
                                    onChange={handleCalendarChange}
                                    value={value}
                                    selectRange
                                />
                            </FormControl>



                            {/* 
                            <FormControl mb={4} flex="1">
                                <FormLabel>Room Type</FormLabel>
                                <Select
                                    placeholder="Select room type"
                                    value={room}
                                    onChange={(e: any) => setRoom(e.target.value)}
                                >
                                    <option value="single">Single Room</option>
                                    <option value="double">Double Room</option>
                                    <option value="suite">Suite</option>
                                </Select>
                            </FormControl> */}


                            <Button type="submit"
                                variant="darkBrand"
                                color="white"
                                fontSize="sm"
                                fontWeight="500"
                                borderRadius="70px"
                                px="24px"
                                py="5px"
                            >
                                Rechercher
                            </Button>
                        </Box>
                    </Flex>

                    <Box
                        bg="white"
                        p={8}
                        borderRadius="md"
                        boxShadow="md"
                        width="100%"
                        maxWidth="700px"
                        justifyContent={"right"}
                        alignItems={"right"}
                    >
                        <Heading size="md" mb={4}>
                            Salle disponible {startDate && `de ${startDate.toLocaleDateString()}`} {endDate && `a ${endDate?.toLocaleDateString()}`} {!value && "aujourd'hui"}
                        </Heading>
                        {loading && <CircularProgress isIndeterminate color="green.300" />}
                        {room.length > 0 && (
                            <Flex direction={"column"}>
                                {room.map((item: any) => (

                                    <Button width={"100%"} key={item.id} p={10} alignItems={"center"} mb={4} bg="gray.100" borderRadius="md" cursor={"pointer"} justifyContent="start" onClick={() => {
                                        navigate(`/admin/services`);
                                    }}>
                                        <Flex direction={"row"} width={"100%"} alignItems={"center"} justifyContent="space-between">
                                            <Flex direction={"column"}>


                                                <Heading size="sm">{item.companyName}</Heading>
                                                <Box>
                                                    <Box fontWeight={"light"}>{item.description}</Box>
                                                </Box>
                                            </Flex>
                                            <Box fontWeight={"bold"} fontSize="20px">{item.price} DH</Box>
                                            <Image
                                                objectFit={"cover"}
                                                src={`data:image/jpeg;base64,${item.returnedImg}`}
                                                w={{ base: "100%", "3xl": "100%" }}
                                                h={{ base: "100%", "3xl": "100%" }}
                                                borderRadius="20px"
                                            />
                                        </Flex>
                                    </Button>
                                ))}
                            </Flex>
                        )}
                    </Box>
                </Flex>
            </Box >
        </ChakraProvider >
    );
}
