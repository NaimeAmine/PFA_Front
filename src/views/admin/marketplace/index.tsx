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
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators";
import CompanyCard from "components/card/CompanyCard";
import { SearchContext } from "context/SearchContext";

function InitialFocus() {
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
        // Handle success
        alert("Service added successfully");
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
      <Button
        variant="darkBrand"
        color="white"
        fontSize="sm"
        fontWeight="500"
        borderRadius="70px"
        px="24px"
        py="5px"
        onClick={onOpen}
      >
        Ajouter
      </Button>
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
                  if (e.target.value) {
                    setName(e.target.value);
                  }
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Prix</FormLabel>
              <Input
                placeholder="Prix"
                value={price}
                onChange={(e) => {
                  if (e.target.value) {
                    setPrice(e.target.value);
                  }
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>

              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  if (e.target.value) {
                    setDescription(e.target.value);
                  }
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
export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const [bookings, setBookings] = useState([]);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const clientId = localStorage.getItem("clientId");
  const { searchValue } = useContext(SearchContext);

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
            adId: adId,
            companyId: companyId,
            userId: parseInt(clientId),
            serviceName: serviceName,
          }),
        }
      );

      if (response.ok) {
        // Handle success
        alert(`Service ${serviceName} booked successfully`);
      } else {
        // Handle error
        alert("Error booking service");
      }
    } catch (error) {
      console.error("Error booking service:", error);
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

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isOpen} onClose={onClose}>
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
                  if (e.target.value) {
                    setName(e.target.value);
                  }
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Prix</FormLabel>
              <Input
                placeholder="Prix"
                value={price}
                onChange={(e) => {
                  if (e.target.value) {
                    setPrice(e.target.value);
                  }
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>

              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  if (e.target.value) {
                    setDescription(e.target.value);
                  }
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
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Services
              </Text>
              <InitialFocus />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
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
                      handleBooking(ad.id, ad.userId, ad.serviceName);
                    }}
                  />
                ))}
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
