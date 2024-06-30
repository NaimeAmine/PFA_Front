// Chakra imports
import {
    AvatarGroup,
    Avatar,
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
// Assets
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function EquipmentCard(props: {
    image: string;
    name: string;
    author: string;
    download: string;
    price: string;
    quantity: string;
    onUpdate: (e: any) => void;
    onDelete: (e: any) => void;
}) {
    const { image, name, author, download, price, quantity, onDelete, onUpdate } = props;
    const [like, setLike] = useState(false);
    const textColor = useColorModeValue("navy.700", "white");
    const textColorBid = useColorModeValue("brand.500", "white");
    return (
        <Card p="20px">
            <Flex direction={{ base: "column" }} justify="center">
                <Box
                    mb={{ base: "20px", "2xl": "20px" }}
                    position="relative"
                    height={"280px"}
                >
                    <Image
                        objectFit={"cover"}
                        src={`data:image/jpeg;base64,${image}`}
                        w={{ base: "100%", "3xl": "100%" }}
                        h={{ base: "100%", "3xl": "100%" }}
                        borderRadius="20px"
                    />
                    <Button
                        position="absolute"
                        bg="white"
                        _hover={{ bg: "whiteAlpha.900" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        p="0px !important"
                        top="14px"
                        right="14px"
                        borderRadius="50%"
                        minW="36px"
                        h="36px"
                        onClick={() => {
                            setLike(!like);
                        }}
                    >
                        <Icon
                            transition="0.2s linear"
                            w="20px"
                            h="20px"
                            as={like ? IoHeart : IoHeartOutline}
                            color="brand.500"
                        />
                    </Button>
                </Box>
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mb="auto"
                    >
                        <Flex direction="column">
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "xl",
                                    md: "lg",
                                    lg: "lg",
                                    xl: "lg",
                                    "2xl": "md",
                                    "3xl": "lg",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                            >
                                {name}
                            </Text>
                            <Text
                                color="secondaryGray.600"
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight="400"
                                me="14px"
                            >
                                {author}
                            </Text>
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "xl",
                                    md: "lg",
                                    lg: "lg",
                                    xl: "lg",
                                    "2xl": "md",
                                    "3xl": "lg",
                                }}
                                mt="15px"
                                fontWeight="bold"
                                me="14px"
                            >
                                Quantité: {quantity}
                            </Text>
                        </Flex>

                        <Text
                            color={textColor}
                            fontSize={{
                                base: "xl",
                                md: "lg",
                                lg: "lg",
                                xl: "lg",
                                "2xl": "md",
                                "3xl": "lg",
                            }}
                            mb="5px"
                            fontWeight="bold"
                            me="14px"
                        >
                            {price} DH
                        </Text>
                    </Flex>

                    <Flex
                        align={{
                            base: "center",
                            md: "end",
                            lg: "center",
                            xl: "end",
                            "2xl": "center",
                        }}
                        justify="end"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mt="25px"
                    >
                        <Stack direction="row" spacing="10px" mt="10px">
                            <Link
                                href={download}
                                mt={{
                                    base: "0px",
                                    md: "10px",
                                    lg: "0px",
                                    xl: "10px",
                                    "2xl": "0px",
                                }}
                            >
                                <Button
                                    variant="darkBrand"
                                    color="white"
                                    fontSize="sm"
                                    fontWeight="500"
                                    backgroundColor={"red"}
                                    borderRadius="70px"
                                    px="24px"
                                    py="5px"
                                    onClick={onDelete}
                                >
                                    Supprimer
                                </Button>
                            </Link>
                            <Link
                                href={download}
                                mt={{
                                    base: "0px",
                                    md: "10px",
                                    lg: "0px",
                                    xl: "10px",
                                    "2xl": "0px",
                                }}
                            >
                                <Button
                                    variant="darkBrand"
                                    color="white"
                                    fontSize="sm"
                                    fontWeight="500"
                                    borderRadius="70px"
                                    px="24px"
                                    py="5px"
                                    onClick={onUpdate}
                                >
                                    Modifier
                                </Button>
                            </Link>
                        </Stack>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
