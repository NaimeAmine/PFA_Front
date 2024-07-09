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
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
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

interface Equipment {
  id: string;
  returnedImg: string;
  name: string;
  description: string;
  price: number;
  quantity: number; // Ensure quantity is included in the interface
}

interface EquipmentListProps {
  companiesEqs: Equipment[];
  onSelectedEqsChange: (selectedEqs: Set<any>) => void;
  onQuantityChange: (id: string, quantity: number) => void; // Add this prop to handle quantity changes
}

const EquipmentList: React.FC<EquipmentListProps> = ({
  companiesEqs,
  onSelectedEqsChange,
  onQuantityChange,
}) => {
  const [selectedEqs, setSelectedEqs] = useState<Set<any>>(new Set());

  const handleCheckboxChange = (id: any) => {
    setSelectedEqs((prevSelectedEqs) => {
      const newSelectedEqs = new Set(prevSelectedEqs);
      if (newSelectedEqs.has(id)) {
        newSelectedEqs.delete(id);
      } else {
        newSelectedEqs.add(id);
      }
      return newSelectedEqs;
    });
  };

  // Use useEffect to call the onSelectedEqsChange callback whenever selectedEqs changes
  useEffect(() => {
    onSelectedEqsChange(selectedEqs);
  }, [selectedEqs, onSelectedEqsChange]);

  return (
    <>
      {companiesEqs.map((eq) => {
        const totalPrice = eq.price * eq.quantity;

        return (
          <Box
            width={"100%"}
            key={eq.id}
            p={4}
            alignItems={"center"}
            mb={4}
            bg="gray.100"
            borderRadius="md"
            justifyContent="start"
          >
            <Flex
              direction={"row"}
              width={"100%"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Flex direction={"row"} alignItems={"center"} width="100%">
                <Checkbox
                  isChecked={selectedEqs.has(eq)}
                  onChange={() => handleCheckboxChange(eq)}
                  mr={4}
                />
                <Image
                  objectFit={"cover"}
                  src={`data:image/jpeg;base64,${eq.returnedImg}`}
                  width="150px"
                  height="100px"
                  borderRadius="5px"
                  mr={4}
                />
                <Flex direction={"column"}>
                  <Heading size="lg">{eq.name}</Heading>
                  <Text fontWeight={"light"}>{eq.description}</Text>
                </Flex>
              </Flex>

              <Flex alignItems={"center"}>
                <Box fontWeight={"bold"} width="100%" fontSize="20px" mr={4}>
                  <Text fontSize="sm">
                    À partir de
                    <Text fontSize={"22px"} fontWeight={"bold"}>
                      {totalPrice} DH
                    </Text>
                  </Text>
                  <NumberInput
                    size="md"
                    maxW={24}
                    defaultValue={1}
                    onChange={(valueString) =>
                      onQuantityChange(eq.id, parseInt(valueString) || 1)
                    }
                    min={1}
                  >
                    <NumberInputField background={"white"} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

interface DateRange {
  start: Date;
  end: Date;
}
export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddClose, setIsAddClose] = useState(false);
  const [isReservation, setIsReservation] = useState(false);

  const initialRef = React.useRef(null);
  const [bookings, setBookings] = useState([]);
  const finalRef = React.useRef(null);
  const [allBookings, setAllBookings] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
  const [selectedEqs, setSelectedEqs] = useState<Set<any>>(new Set());
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
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCompaniesEqs((prevList: any) =>
      prevList.map((eq: any) =>
        eq.id === id ? { ...eq, quantity: newQuantity } : eq
      )
    );
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
      let bookingsResp;

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

      bookingsResp = await fetch(`http://localhost:8080/api/company/bookings`, {
        method: "GET",
      });

      if (bookingsResp.ok) {
        const data = await bookingsResp.json();
        setAllBookings(data);
      } else {
        // Handle non-OK response
        alert("Error fetching bookings");
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
    onClose();

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
            bookDate: startDate || new Date(),
            endDate: endDate || startDate,
            adId: adId,
            companyId: companyId,
            userId: parseInt(clientId),
            serviceName: serviceName,
            equipment: Array.from(selectedEqs),
          }),
        }
      );

      if (response.ok) {
        setSteps(0);
        Swal.fire({
          title: "Success!",
          text: `Service ${serviceName} booked successfully`,
          icon: "success",
          confirmButtonText: "OK",
          showCancelButton: true,
          cancelButtonText: "Print Receipt",
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            printReceipt(
              adId,
              companyId,
              serviceName,
              startDate,
              endDate,
              selectedEqs,
              clientId
            );
          }
          window.location.reload();
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
      fetchAds();
    }
  };
  const printReceipt = (
    adId: string,
    companyId: string,
    serviceName: string,
    startDate: Date | null,
    endDate: Date | null,
    selectedEqs: Set<{
      id: number;
      name: string;
      description: string;
      img: string | null;
      returnedImg: string;
      price: number;
      quantity: number;
      category: string | null;
      brand: string;
    }>,
    clientId: string
  ) => {
    const bookingDate = new Date().toLocaleString();
    // Convert binary image data to Base64
    const convertToBase64 = (binaryData: string) => {
      const byteCharacters = atob(binaryData);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      return URL.createObjectURL(blob);
    };

    // Generate equipment list HTML
    const equipmentListHTML = Array.from(selectedEqs)
      .map(
        (eq) => `
    <tr>
      <td>${eq.id}</td>
      <td>${eq.name}</td>
      <td>${eq.description}</td>
      <td>${
        eq.returnedImg
          ? `<img src="${convertToBase64(eq.returnedImg)}" alt="${
              eq.name
            }" width="50" height="50">`
          : "No Image"
      }</td>
      <td>${eq.price}</td>
      <td>${eq.quantity}</td>
      <td>${eq.category ? eq.category : "N/A"}</td>
      <td>${eq.brand}</td>
    </tr>
  `
      )
      .join("");
    // Create a receipt content with styles
    const receiptContent = `
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            color: #4CAF50;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          img {
            max-width: 50px;
            max-height: 50px;
          }
        </style>
      </head>
      <body>
        <h1>Receipt</h1>
        <p><strong>Service Name:</strong> ${serviceName}</p>
        <p><strong>Booking Date:</strong> ${bookingDate}</p>
        <p><strong>Start Date:</strong> ${
          startDate ? startDate.toLocaleString() : new Date().toLocaleString()
        }</p>
        <p><strong>End Date:</strong> ${
          endDate ? endDate.toLocaleString() : startDate?.toLocaleString()
        }</p>
        <table>
          <tr>
            <th>Details</th>
            <th>Information</th>
          </tr>
          <tr>
            <td>Ad ID</td>
            <td>${adId}</td>
          </tr>
          <tr>
            <td>Company ID</td>
            <td>${companyId}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td>${parseInt(clientId)}</td>
          </tr>
        </table>
        <h2>Equipment</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Brand</th>
          </tr>
          ${equipmentListHTML}
        </table>
      </body>
      </html>
    `;

    // Open a new window to print the receipt
    const printWindow = window.open("", "", "height=800,width=1000");
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.print();
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
        onClose();
        Swal.fire({
          title: "Success!",
          text: "Service updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchAds();
        setEditableId("");
        setName("");
        setPrice("");
        setDescription("");
      } else {
        Swal.fire({
          title: "Error",
          text: "Error updating service",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };
  const onCloseAdd = () => {
    setIsAddOpen(false);
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
        Swal.fire({
          title: "Success!",
          text: "Service deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchAds();
      } else {
        Swal.fire({
          title: "Error",
          text: "Error deleting service",
          icon: "error",
          confirmButtonText: "OK",
        });
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

  const disabledRanges: DateRange[] = allBookings.map((ad) => {
    if (ad.adId === selectedAdId) {
      return { start: ad.bookDate, end: ad.endDate };
    } else {
      return { start: new Date(), end: new Date() };
    }
  });
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
        onCloseAdd();
        Swal.fire({
          title: "Success!",
          text: "Service added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setEditableId("");
        setName("");
        setPrice("");
        setDescription("");
        fetchAds();
      } else {
        // Handle error
        alert("Error adding service");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSelectedEqsChange = (newSelectedEqs: Set<string>) => {
    setSelectedEqs(newSelectedEqs);
  };
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
      <Modal isOpen={isAddOpen} onClose={onCloseAdd}>
        <ModalContent>
          <ModalHeader>Ajouter un service</ModalHeader>
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
            <Button onClick={onCloseAdd}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={"700px"} width="100%">
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
                            if (e[0] && e[1]) {
                              setStartDate(e[0]);
                              setEndDate(e[1]);
                            } else if (e[0]) {
                              setStartDate(e[0]);
                            }
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
                    <EquipmentList
                      companiesEqs={companiesEqs}
                      onSelectedEqsChange={handleSelectedEqsChange}
                      onQuantityChange={handleQuantityChange}
                    />
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
                        onDelete={() =>
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, keep it",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteAd(ad.id);
                            }
                          })
                        }
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
                      }}
                    />
                  ))}
              {localStorage.getItem("userType") === "COMPANY" && (
                <Card
                  width={"290px"}
                  height={"100px"}
                  justifyContent="center"
                  onClick={() => setIsAddOpen(true)}
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
