import React from "react";
import {
  Text,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface TableDataItem {
  id: number;
  bookDate: string;
  serviceName: string;
  reservationStatus: string;
  reviewStatus: string;
  userId: number;
  userName: string;
  companyId: number;
  adId: number | null;
}

interface TopCreatorTableProps {
  tableData: TableDataItem[];
  isAfficherTout: boolean;
  refresh: () => void;
}

const FullTableRes: React.FC<TopCreatorTableProps> = ({
  tableData,
  isAfficherTout,
  refresh,
}) => {
  const handleAccept = async (id: number) => {
    await fetch(`http://localhost:8080/api/company/booking/${id}/ACCEPTED`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          refresh();
        } else {
          alert("Error accepting reservation");
        }
      })
      .catch((error) => {
        console.error("Error accepting reservation:", error);
      });
  };

  const handleReject = async (id: number) => {
    await fetch(`http://localhost:8080/api/company/booking/${id}/REJECTED`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          refresh();
        } else {
          alert("Error rejecting reservation");
        }
      })
      .catch((error) => {
        console.error("Error rejecting reservation:", error);
      });
  };

  return (
    <Flex
      direction="column"
      w="100%"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
        boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
      >
        <Text color="gray.900" fontSize="xl" fontWeight="600">
          Reservations
        </Text>
        {isAfficherTout && <Button variant="action">Afficher tous</Button>}
      </Flex>
      <Table variant="simple" color="gray.500" mt="12px">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Nom client</Th>
            <Th>Date Reservation</Th>
            <Th>Nom de service</Th>
            <Th>Etat de reservation</Th>
            {localStorage.getItem("userType") === "COMPANY" && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {tableData

            .map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.userName}</Td>
                <Td>{item.bookDate}</Td>
                <Td>{item.serviceName}</Td>
                <Td>



                  <Flex align="center">
                    <Icon
                      w="24px"
                      h="24px"
                      me="5px"
                      color={
                        item.reservationStatus === "ACCEPTED"
                          ? "green.500"
                          : item.reservationStatus === "REJECTED"
                            ? "red.500"
                            : item.reservationStatus === "PENDING"
                              ? "orange.500"
                              : null
                      }
                      as={
                        item.reservationStatus === "ACCEPTED"
                          ? MdCheckCircle
                          : item.reservationStatus === "REJECTED"
                            ? MdCancel
                            : item.reservationStatus === "PENDING"
                              ? MdOutlineError
                              : null
                      }
                    />
                    {item.reservationStatus}
                  </Flex>

                </Td>
                {localStorage.getItem("userType") === "COMPANY" && (
                  <Td>

                    {item.reviewStatus === "PENDING" && (
                      <Stack direction={"row"} spacing={2}>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          justifyContent={"center"}
                          alignItems={"center"}
                          backgroundColor={"green.500"}
                          borderRadius={15}
                          padding={3}
                          _hover={{ bg: "green.600" }}
                          transition={"all 0.3s"}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAccept(item.id);
                          }}
                          cursor="pointer"
                        >
                          <Text color={"white"}>Accepter</Text>
                          <CheckIcon color={"white"} />
                        </Stack>
                        <IconButton
                          isRound={true}
                          background={"red.500"}
                          aria-label="Done"
                          fontSize="20px"
                          onClick={(e) => {
                            e.preventDefault();
                            handleReject(item.id);
                          }}
                          _hover={{ bg: "red.600" }}
                          icon={<CloseIcon fontSize={"13px"} color={"white"} />}
                        />
                      </Stack>
                    )}
                  </Td>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default FullTableRes;
