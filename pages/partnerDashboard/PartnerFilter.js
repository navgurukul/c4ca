"use client";
import React, { useEffect, useState } from "react"; 
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
  useMediaQuery,
  styled,
} from "@mui/material";
import { SearchOutlined, Add } from "@mui/icons-material"; 
import PartnerAddModal from "./PartnerAddModal";
import PartnerTable from "./PartnerTable";
import axios from "axios";
// import { breakpoints } from "../../theme/constant";

function PartnerFilter() {
  const [openModal, setOpenModal] = useState(false);
  const [allPartner, setAllPartner] = useState([]);
  const [filteredPartner, setfilteredPartner] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //add query
  useEffect(() => {
    const apiUrl = "https://merd-api.merakilearn.org/partners";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyNDA4IiwiZW1haWwiOiJsb2RoaS5wcmFiaGF0QGdtYWls.lmNvbSIsImlhdCI6MTY5NzY4NjQ0NywiZXhwIjoxNzI5MjQ0MDQ3fQ.Jt9Vrp_399fK9oXhqqtEZn_kWzjFlnScBJsXfcM6dIk";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const partnerList = response.data.partners;
        if (partnerList !== undefined) {
          setAllPartner(partnerList);
          setfilteredPartner(partnerList);
          // console.log(partnerList);
        } else {
          console.error("Data is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  //   const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)"); 

  const filterTerms = [
    "All Partners",
    "Newly Onboarded",
    "Active",
    "Inactive",
    "Archived",
  ];
 

  const handleModalToggle = () => {
    setOpenModal(!openModal);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const data = filterPartner(searchTerm, allPartner);
    setfilteredPartner(data); 
  };

  function filterPartner(searchText, allPartner) {
    console.log(allPartner);
    const filterData = allPartner.filter((partner) =>
      partner?.name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      partner?.point_of_contact_name?.toLowerCase()?.includes(searchText?.toLowerCase()) 
    );
    return filterData;
  }

  const handleStatus = (term, allPartner) => { 
    const filterByStatus = statusFilter(term, allPartner);
    setfilteredPartner(filterByStatus);
  };

  function statusFilter(term, allPartner) {
    console.log(allPartner);
    if (term === "All Partners") {
      return allPartner;
    }
    const filterDataf = allPartner?.filter((partner) =>
      partner?.status?.toLowerCase()?.includes(term?.toLowerCase())
    );
    return filterDataf;
  } 

  const filterButtons = filterTerms.map((term) => (
    <Button
      onClick={() => handleStatus(term, allPartner)}
      key={term}
      //   variant={term === filterBy ? "contained" : "outlined"}
      sx={{
        mr: 2,
        borderRadius: "30px",
        borderColor: "#29458C",
        p: "12px",
        border:"1px solid  #29458C",
        color:"#BDBDBD"
      }}
    >
      <Typography
        variant="body2"
        //   color={term !== filterBy && "text.primary"}
      >
        {term}
      </Typography>
    </Button>
  ));

  return (
    <Box sx={{ mt: 8, mb: 2 }}>
      <Box display="flex" justifyContent={"space-between"} mb={3}>
        <TextField
          placeholder="Search Partner, Point of Contact"
          size="medium"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ color: "#2E2E2E" }} />
              </InputAdornment>
            ),
            style: {
              height: "48px",
              borderRadius: "35px",
              fontSize: "14px",
            },
          }}
          sx={{ width: "360px" }}
        />
        <Box sx={{ position: "relative" }}>
          <Button
            startIcon={<Add />}
            onClick={handleModalToggle}
            variant="contained"
            sx={{}}
          >
            <Typography variant="subtitle2">Add Partner</Typography>
          </Button>
          {openModal && (
            <Box sx={{ position: "absolute", top: "100%", left: 0 }}>
              <PartnerAddModal onOpen={handleModalToggle} boolean={openModal} />
            </Box>
          )}
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>{filterButtons}</Box>
      <PartnerTable data={filteredPartner} />
    </Box>
  );
}

export default PartnerFilter;
