
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
} from "@chakra-ui/react";

import bgMastercard from 'assets/img/dashboards/client-home.jpg';
import Cookies from 'js-cookie';

import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import 'assets/css/MiniCalendar.css';
export default function HomePage() {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Explicitly type the value as Date | [Date, Date]
    const [value, setValue] = useState<Date | [Date, Date]>(new Date());
    const [room, setRoom] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        Cookies.set("startDate", startDate.toString());
        if (endDate != null) {
            Cookies.set("endDate", endDate?.toString());
        }

        window.location.href = "/auth/sign-in";
    };

    const handleCalendarChange = (value: Date | [Date, Date]) => {
        setValue(value);
        if (Array.isArray(value)) {
            setStartDate(value[0]);
            setEndDate(value[1]);
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

                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    height="calc(100vh - 80px)"
                    bg="rgba(0, 0, 0, 0.5)"
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


                        <Button type="submit" colorScheme="blue" width={"100%"}>
                            Rechercher
                        </Button>
                    </Box>
                </Flex>
            </Box >
        </ChakraProvider >
    );
}
