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
  // Function to fetch data from the API
  //add query
  useEffect(() => {
    const apiUrl =
      "https://merd-api.merakilearn.org/c4caPartners/admin?page=1&limit=10";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const partnerList = response?.data?.data;
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
  }, [openModal]);

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
    const filterData = allPartner.filter(
      (partner) =>
        partner?.name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        partner?.point_of_contact_name
          ?.toLowerCase()
          ?.includes(searchText?.toLowerCase())
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
        border: "1px solid  #29458C",
        color: "#BDBDBD",
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
    <Box sx={{ mt: 4, mb: 2 }}>
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
