/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Textarea,
  CircularProgress,
  Select,
  Image,
  Heading,
  NumberInput,
  IconButton,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card";

import CompanyCard from "components/card/CompanyCard";
import { SearchContext } from "context/SearchContext";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { Calendar } from "react-calendar";
import { ArrowBackIcon } from "@chakra-ui/icons";

function InitialFocus({ fetchAds }: { fetchAds: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("serviceName", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("img", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/company/ad/${localStorage.getItem(
          "clientId"
        )}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        // Handle successalert("Service added successfully");
        Swal.fire({
          title: "Success!",
          text: "Service added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        onClose();
        fetchAds();
      } else {
        // Handle error
        alert("Error adding service");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom de service</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Nom de service"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Prix</FormLabel>
              <Input
                placeholder="Prix"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>

              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <input type="file" onChange={handleFileChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Ajouter
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

interface DateRange {
  start: Date;
  end: Date;
}
export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReservation, setIsReservation] = useState(false);

  const initialRef = React.useRef(null);
  const [bookings, setBookings] = useState([]);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const clientId = localStorage.getItem("clientId");
  const { searchValue } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedAdId, setSelectedAdId] = useState("");
  const [companiesEqs, setCompaniesEqs] = useState([]);
  const [selectedEqs, setSelectedEqs] = useState(0);
  useEffect(() => {
    if (searchValue === "") {
      fetchAds();
    } else {
      const filteredAds = ads.filter((ad) =>
        ad.serviceName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setAds(filteredAds);
    }
  }, [searchValue]);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Chakra Color Mode
  const [userType, setUserType] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userType") === "COMPANY") {
      setUserType("company");
    } else {
      setUserType("user");
    }
  });

  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      let response;

      if (localStorage.getItem("userType") === "COMPANY") {
        response = await fetch(
          `http://localhost:8080/api/company/ads/${clientId}`,
          {
            method: "GET",
          }
        );
      } else {
        response = await fetch(`http://localhost:8080/api/client/ads`, {
          method: "GET",
        });
      }

      if (response.ok) {
        const data = await response.json();
        setAds(data);
      } else {
        // Handle non-OK response
        alert("Error fetching ads");
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      let response;
      if (localStorage.getItem("userType") === "COMPANY") {
        response = await fetch(
          `http://localhost:8080/api/company/bookings/${clientId}`,
          {
            method: "GET",
          }
        );
      } else {
        response = await fetch(
          `http://localhost:8080/api/client/my-bookings/${clientId} `,
          {
            method: "GET",
          }
        );
      }
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        // Handle non-OK response
        alert("Error fetching ads");
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAds();
      fetchReservations();
    };

    // Call fetchData initially
    fetchData();

    // Set interval to call fetchData every 3 seconds
    // const intervalId = setInterval(fetchData, 3000);

    // Clean up function to clear the interval when component unmounts or when dependency array changes
    // return () => clearInterval(intervalId);
  }, []);

  localStorage.setItem("reservations", JSON.stringify(bookings));
  ads.map((ad) => {
    bookings.map((booking) => {
      if (ad.serviceName === booking.serviceName) {
        ad.booked = booking.reservationStatus;
      }
    });
  });
  const [editableId, setEditableId] = useState("");
  const handleUpdate = async (adId: string) => {
    onOpen();
    ads.map((ad) => {
      if (ad.id === adId) {
        setName(ad.serviceName);
        setPrice(ad.price);
        setDescription(ad.description);
      }
    });
    setEditableId(adId);
  };
  const handleBooking = async (
    adId: string,
    companyId: string,
    serviceName: string
  ) => {
    setLoading(true); // Set loading to true before starting the fetch request

    try {
      const response = await fetch(
        `http://localhost:8080/api/client/book-service/${clientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(clientId),
            bookDate: new Date(),
            endDate: new Date(),
            adId: adId,
            companyId: companyId,
            userId: parseInt(clientId),
            serviceName: serviceName,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: `Service ${serviceName} booked successfully`,
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchAds();
      } else if (response.status === 403) {
        Swal.fire({
          title: "Error",
          text: "You have already reserved this article",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Error booking service",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error booking service:", error);
      Swal.fire({
        title: "Error",
        text: "Error booking service",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Set loading to false after the fetch request completes
    }
  };
  const handleUpdateSubmit = async () => {
    const formData = new FormData();
    formData.append("serviceName", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("img", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/company/ad/${editableId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Handle success
        onClose();
        alert("Service updated successfully");
        fetchAds();
      } else {
        // Handle error
        alert("Error updating service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const deleteAd = async (adId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/ad/${adId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        fetchAds();
        console.log(data); // Log the fetched data
      } else {
        // Handle non-OK response
        alert("Error fetching ads");
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const handleEqsSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/equipment/byUser/${selectedCompany}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCompaniesEqs(data);
      } else {
        // Handle non-OK response
        alert("Error fetching ads");
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const disabledRanges: DateRange[] = [
    { start: new Date(2024, 6, 10), end: new Date(2024, 6, 14) },
    { start: new Date(2024, 6, 24), end: new Date(2024, 6, 29) },
  ];

  const isDateDisabled = (date: Date) => {
    return disabledRanges.some(
      (range) => date >= range.start && date <= range.end
    );
  };
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {loading && (
        <>
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.6)"
            style={{ backdropFilter: "blur(5px)" }}
            zIndex="9"
          />
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            align="center"
            justify="center"
            zIndex="10"
          >
            <CircularProgress isIndeterminate color="green.300" />
          </Flex>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"900px"}>
          {isReservation ? (
            <>
              {steps === 0 ? (
                <>
                  <ModalHeader>Resevation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormLabel mt={10}>
                      Choisir les dates de reservation
                    </FormLabel>
                    <FormControl>
                      <Flex justifyContent={"center"}>
                        <Calendar
                          selectRange
                          tileDisabled={({ date }: { date: Date }) =>
                            isDateDisabled(date)
                          }
                          onChange={(e: any) => {
                            console.log(e);
                          }}
                        />
                      </Flex>
                      <FormLabel mt={10}>
                        Decouvrir nos category d'equipements
                      </FormLabel>
                      <Select placeholder="Choisir les dates de reservation">
                        <option value="option1">Tableaux</option>
                        <option value="option2">Datashows</option>
                        <option value="option3">Ecrans</option>
                        <option value="option4">Chaises</option>
                        <option value="option5">Tables</option>
                        <option value="option6">Autres</option>
                      </Select>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        handleEqsSearch();

                        setSteps(1);
                      }}
                    >
                      Suivant
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <IconButton
                    width={"30px"}
                    mt={1}
                    ml={1}
                    aria-label=""
                    onClick={() => {
                      setSteps(0);
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <ModalHeader>Resevation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    {companiesEqs.map((eq: any) => (
                      <Box
                        width={"100%"}
                        key={eq.id}
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
                              src={`data:image/jpeg;base64,${eq.returnedImg}`}
                              width="150px"
                              height="100px"
                              borderRadius="5px"
                              mr={4}
                            />
                            <Flex direction={"column"}>
                              <Heading size="lg">{eq.serviceName}</Heading>

                              <Text fontWeight={"light"}>{eq.description}</Text>
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
                                  {eq.price} DH
                                </Text>
                              </Text>
                              <Input
                                type={"number"}
                                backgroundColor={"white"}
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() =>
                        handleBooking(selectedAdId, selectedCompany, name)
                      }
                    >
                      Reserver
                    </Button>
                    <Button onClick={onClose}>Annuler</Button>
                  </ModalFooter>
                </>
              )}
            </>
          ) : (
            <>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Nom de service</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Nom de service"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Prix</FormLabel>
                  <Input
                    placeholder="Prix"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>

                  <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Image</FormLabel>
                  <input type="file" onChange={handleFileChange} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleUpdateSubmit()}
                >
                  Modifier
                </Button>
                <Button onClick={onClose}>Annuler</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="end"
              alignItems={"end"}
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <InitialFocus fetchAds={fetchAds} />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              <></>
              {userType === "company"
                ? ads.map((ad) => (
                    <>
                      <CompanyCard
                        name={ad.serviceName}
                        author={ad.description}
                        price={ad.price}
                        image={ad.returnedImg}
                        download="#"
                        onDelete={() => deleteAd(ad.id)}
                        onUpdate={(e: any) => {
                          e.preventDefault();
                          handleUpdate(ad.id);
                        }}
                      />
                    </>
                  ))
                : ads.map((ad) => (
                    <NFT
                      name={ad.serviceName}
                      author={ad.description}
                      price={ad.price}
                      image={ad.returnedImg}
                      download="#"
                      bookedStatus={ad.booked}
                      onBook={(e: any) => {
                        e.preventDefault();
                        setIsReservation(true);
                        onOpen();
                        setSelectedAdId(ad.id);
                        setSelectedCompany(ad.userId);
                        // handleBooking(ad.id, ad.userId, ad.serviceName);
                      }}
                    />
                  ))}
              {localStorage.getItem("userType") === "COMPANY" && (
                <Card
                  width={"290px"}
                  height={"100px"}
                  justifyContent="center"
                  onClick={onOpen}
                  cursor="pointer"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 20px 4px",
                  }}
                >
                  <Flex
                    justifyContent="center"
                    direction={"column"}
                    alignItems={"center"}
                  >
                    <FaPlus size="20px" color="brand.500" />
                    Ajouter une salle
                  </Flex>
                </Card>
              )}
            </SimpleGrid>
          </Flex>
        </Flex>
        {userType === "company" ? (
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          >
            <Card px="0px" mb="20px">
              <TableTopCreators tableData={bookings} isAfficherTout={true} />
            </Card>
          </Flex>
        ) : (
          <> </>
        )}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
