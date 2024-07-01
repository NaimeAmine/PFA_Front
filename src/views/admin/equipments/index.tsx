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

import React, { useContext, useEffect, useRef, useState } from "react";

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
import EquipmentCard from "components/card/EquipmentCard";

function Equipments({ fetchAds }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({
        name: false,
        price: false,
        brand: false,
        quantity: false,
        description: false,
        file: false,
    });

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validate fields
        const newErrors = {
            name: !name,
            price: !price,
            brand: !brand,
            quantity: !quantity,
            description: !description,
            file: !file,
        };
        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error);
        if (hasErrors) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("brand", brand);
        formData.append("quantity", quantity);
        formData.append("description", description);
        formData.append("img", file);

        try {
            const response = await fetch(
                `http://localhost:8080/api/company/equipment/add/${localStorage.getItem("clientId")}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (response.ok) {
                onClose();

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Equipment added successfully',
                });
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
        {localStorage.getItem("userType") === "COMPANY" && (


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
        )}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un equipment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Nom de l'equipment</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Nom de l'equipment"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors.brand}>
                            <FormLabel>Marque</FormLabel>
                            <Input
                                placeholder="Marque"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors.quantity}>
                            <FormLabel>Quantite</FormLabel>
                            <Input
                                placeholder="Quantite"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors.price}>
                            <FormLabel>Prix</FormLabel>
                            <Input
                                placeholder="Prix"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors.description}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors.file}>
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

    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [bookings, setBookings] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [file, setFile] = useState(null);
    const clientId = localStorage.getItem("clientId");
    const { searchValue } = useContext(SearchContext);
    const [loading, setLoading] = useState(false);
    const [ads, setAds] = useState([]);
    const [editableId, setEditableId] = useState("");
    const [userType, setUserType] = useState("");

    useEffect(() => {
        if (localStorage.getItem("userType") === "COMPANY") {
            setUserType("company");
        } else {
            setUserType("user");
        }
    }, []);

    useEffect(() => {
        if (searchValue === "") {
            fetchAds();
        } else {
            const filteredAds = ads.filter((ad) =>
                ad.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setAds(filteredAds);
        }
    }, [searchValue]);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const fetchAds = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/company/equipment/byUser/${clientId}`,
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                const data = await response.json();
                setAds(data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Erreur lors de la récupération des annonces.',
                });
            }
        } catch (error) {
            console.error("Error fetching ads:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la récupération des annonces.',
            });
        }
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const handleUpdate = (adId: any) => {
        onOpen();
        const ad = ads.find((ad) => ad.id === adId);
        if (ad) {
            setName(ad.name);
            setPrice(ad.price);
            setQuantity(ad.quantity);
            setBrand(ad.brand);
            setDescription(ad.description);
            setEditableId(adId);
        }
    };

    const validateInputs = () => {
        if (!name || !price || !quantity || !description || !brand) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Tous les champs doivent être remplis.',
            });
            return false;
        }
        return true;
    };

    const handleUpdateSubmit = async () => {
        if (!validateInputs()) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("description", description);
        if (file) formData.append("img", file);

        try {
            const response = await fetch(
                `http://localhost:8080/api/company/equipment/update/${editableId}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            if (response.ok) {
                onClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Équipement mis à jour avec succès.',
                });

                fetchAds();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Erreur lors de la mise à jour de l\'équipement.',
                });
            }
        } catch (error) {
            console.error("Error updating service:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la mise à jour de l\'équipement.',
            });
        }
    };

    const deleteAd = async (adId: any) => {
        try {
            const result = await Swal.fire({
                title: 'Êtes-vous sûr ?',
                text: "Vous ne pourrez pas revenir en arrière !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimez-le !',
                cancelButtonText: 'Annuler'
            });

            if (result.isConfirmed) {
                const response = await fetch(
                    `http://localhost:8080/api/company/equipment/delete/${adId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    fetchAds();
                    Swal.fire({
                        icon: 'success',
                        title: 'Supprimé !',
                        text: 'Équipement supprimé avec succès.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Échec de la suppression de l\'équipement.',
                    });
                }
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'équipement :", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur s\'est produite lors de la suppression de l\'équipement.',
            });
        }
    };

    const textColor = useColorModeValue("secondaryGray.900", "white");

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
                    <ModalHeader>Ajouter un équipement</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Nom de l'équipement</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Nom de l'équipement"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Marque</FormLabel>
                            <Input
                                placeholder="Marque"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Quantité</FormLabel>
                            <Input
                                placeholder="Quantité"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Prix</FormLabel>
                            <Input
                                placeholder="Prix"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Image</FormLabel>
                            <input type="file" onChange={handleFileChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
                            Modifier
                        </Button>
                        <Button onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Grid mb="20px" gap={{ base: "20px", xl: "20px" }} display={{ base: "block", xl: "grid" }}>
                <Flex flexDirection="column" gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
                    <Flex direction="column">
                        <Flex
                            mt="45px"
                            mb="20px"
                            justifyContent="space-between"
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "start", md: "center" }}
                        >
                            <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                                Équipements
                            </Text>
                            <Equipments fetchAds={fetchAds} />
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                            {ads.map((ad) => (
                                <EquipmentCard
                                    key={ad.id}
                                    name={ad.name}
                                    author={ad.brand}
                                    price={ad.price}
                                    quantity={ad.quantity}
                                    image={ad.returnedImg}
                                    download="#"
                                    onDelete={(e) => {
                                        e.preventDefault();
                                        deleteAd(ad.id);
                                    }}
                                    onUpdate={(e) => {
                                        e.preventDefault();
                                        handleUpdate(ad.id);
                                    }}
                                />
                            ))}
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    );
}