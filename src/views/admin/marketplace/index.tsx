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
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card";

import CompanyCard from "components/card/CompanyCard";
import { SearchContext } from "context/SearchContext";
import Swal from 'sweetalert2';
import { FaPlus } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);
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
            adId: adId,
            companyId: companyId,
            userId: parseInt(clientId),
            serviceName: serviceName,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: `Service ${serviceName} booked successfully`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchAds();
      } else if (response.status === 403) {
        Swal.fire({
          title: 'Error',
          text: 'You have already reserved this article',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error booking service',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error booking service:", error);
      Swal.fire({
        title: 'Error',
        text: 'Error booking service',
        icon: 'error',
        confirmButtonText: 'OK'
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
      {loading && (
        <>
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.6)"
            style={{ backdropFilter: 'blur(5px)' }}
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
              justifyContent="end"
              alignItems={"end"}
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >

              <InitialFocus />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              <>
              {localStorage.getItem("userType") === "COMPANY" && (
 

<Card 
width={"300px"}
height={"300px"}
justifyContent="center"
onClick={onOpen}
cursor="pointer"
style={{borderRadius: "20px",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 20px 4px"
  
}}
>
  <Flex justifyContent="center">
      <FaPlus size="20px" color="brand.500" />
  </Flex>
 
</Card>
       

      // <Button
      //   variant="darkBrand"
      //   color="white"
      //   fontSize="sm"
      //   fontWeight="500"
      //   borderRadius="70px"
      //   px="24px"
      //   py="5px"
      //   onClick={onOpen}
      // >
      //   Ajouter
      // </Button>
    )}</>
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
