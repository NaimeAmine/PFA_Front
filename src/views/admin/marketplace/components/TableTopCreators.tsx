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
} from "@chakra-ui/react";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

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
}

const TopCreatorTable: React.FC<TopCreatorTableProps> = ({
  tableData,
  isAfficherTout,
}) => {
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
          
      
            <Th>Date Reservation</Th>
            <Th>Nom de service</Th>
            <Th>Etat de reservation</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item) => (
            <Tr key={item.id}>
         
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default TopCreatorTable;
