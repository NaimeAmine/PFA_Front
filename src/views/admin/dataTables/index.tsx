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

// Chakra imports
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex";
import { useState, useEffect } from "react";
import TopCreatorTable from "../marketplace/components/TableTopCreators";
import Card from "components/card/Card";
import FullTableRes from "views/admin/dataTables/components/ComplexTable";

export default function Settings() {
  const clientId = localStorage.getItem("clientId");
  const [bookings, setBookings] = useState([]);
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
        console.log(data); // Log the fetched data
      } else {
        // Handle non-OK response
        alert("Error fetching ads");
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1", "2xl": "1 " }}
        >
          <Card px="0px" mb="20px">
            <FullTableRes tableData={bookings} 
				isAfficherTout={false}
				refresh={fetchReservations}
			/>
          </Card>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
