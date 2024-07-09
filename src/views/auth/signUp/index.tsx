import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState("user");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [companyAddress, setCompanyAddress] = React.useState("");

  const handleClick = () => setShow(!show);

  const handleRoleSelect = (role: "user" | "company") => {
    setSelectedRole(role);
  };

  const handleSignUp = () => {
    if (selectedRole === "company" && (!companyName || !companyAddress)) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (!name || !lastName || !email || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    let BASE_USER_URL = "";
    if (selectedRole === "company") {
      BASE_USER_URL = "http://localhost:8080/company/sign-up";
    } else {
      BASE_USER_URL = "http://localhost:8080/client/sign-up";
    }
    fetch(BASE_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastname: lastName,
        email: email,
        password: password,

        // companyName: selectedRole === "company" ? companyName : null,
        // adress: selectedRole === "company" ? companyAddress : null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("clientId", data.userId);
        localStorage.setItem("userType", data.role);
        localStorage.setItem("username", data.username);
        localStorage.setItem("remember", "true");
        window.location.href = "/admin/services";
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            S'inscrire
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Entrez vos informations pour créer un compte
          </Text>
        </Box>

        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Prénom<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Prénom"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Nom<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Nom"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Mot de passe<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 caractères"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Confirmer le mot de passe<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 caractères"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex mb="24px">
              <Box
                flex="1"
                p="20px"
                borderRadius="15px"
                borderWidth="1px"
                borderColor={
                  selectedRole === "user" ? textColorBrand : textColorSecondary
                }
                bg={selectedRole === "user" ? "gray.100" : "transparent"}
                textAlign="center"
                mr="10px"
                cursor="pointer"
                onClick={() => handleRoleSelect("user")}
              >
                <Text
                  fontSize="xl"
                  fontWeight="500"
                  color={selectedRole === "user" ? textColorBrand : textColor}
                >
                  Utilisateur
                </Text>
              </Box>
              <Box
                flex="1"
                p="20px"
                borderRadius="15px"
                borderWidth="1px"
                borderColor={
                  selectedRole === "company"
                    ? textColorBrand
                    : textColorSecondary
                }
                bg={selectedRole === "company" ? "gray.100" : "transparent"}
                textAlign="center"
                ml="10px"
                cursor="pointer"
                onClick={() => handleRoleSelect("company")}
              >
                <Text
                  fontSize="xl"
                  fontWeight="500"
                  color={
                    selectedRole === "company" ? textColorBrand : textColor
                  }
                >
                  Entreprise
                </Text>
              </Box>
            </Flex>
            {selectedRole === "company" && (
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Nom de l'entreprise<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Nom de l'entreprise"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />

                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Addresse de l'entreprise<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Addresse de l'entreprise"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </FormControl>
            )}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleSignUp}
            >
              S'inscrire
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Vous avez déjà un compte ?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Se connecter
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
