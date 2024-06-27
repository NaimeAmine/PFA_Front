// chakra imports
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Icon, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { MdUpgrade } from "react-icons/md";
import { Link } from "react-router-dom";

export function ItemContent(props: { info: string }) {
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <Flex
        justify="center"
        align="center"
        borderRadius="16px"
        minH={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        minW={{ base: "60px", md: "70px" }}
        w={{ base: "60px", md: "70px" }}
        me="14px"
      
      >
        {props.info.includes("ACCEPTED") ? (
          <Icon as={CheckIcon} color="green.500" w={8} h={14} />
        ) : (
          <Icon as={CloseIcon} color="red.500" w={8} h={14} />
        )}
      </Flex>
      <Flex flexDirection="column">
        <Text
          mb="5px"
          fontWeight="bold"
          color={textColor}
          fontSize={{ base: "md", md: "md" }}
        >
          {props.info}
        </Text>
        <Flex alignItems="center">
          <Button
            onClick={() => {
              window.location.href =
                "http://localhost:3000/admin/data-tables#/admin/data-tables";
            }}
          >
            <Text
              fontSize={{ base: "sm", md: "sm" }}
              lineHeight="100%"
              color={textColor}
            >
              Voir les détails
            </Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
