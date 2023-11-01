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
import FacilitatorAddModal from "./FacilitatorAddModal";
import FacilatorTable from "./FacilatorTable";
import customAxios from "@/api";
import MyBreadcrumbs from "@/components/breadcrumb/breadcrumb";

function FacilitatorFilter({ id }) {
  console.log("filter", id);

  const [openModal, setOpenModal] = useState(false);

  const [allFacilitator, setAllFacilitator] = useState();
  const [filteredFacilitator, setFilteredFacilitator] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [partnerName, setPartnerName] = useState();

  useEffect(() => {
    if (id) {
      const fetchFacilitatorList = () => {
      const apiUrl = `/c4ca/facilitator/getByPartnerId/${id}`;
      const token = localStorage.getItem("token");
      customAxios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => { 
          const datae = response?.data?.data?.facilitatorsDetails;
          const partnerName = response?.data?.data?.partner_name; 
          if (datae !== undefined) {
            setData(datae);
            setPartnerName(partnerName);
          } else {
            console.error("Data is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      };
      fetchFacilitatorList();
      if (!openModal) {
        fetchFacilitatorList();
      }
    }
  }, [id, openModal]);

  const [totalCountData, settotalCountData] = useState();
 
  //fetching the total data
  useEffect(() => {
    if (id) {
    const apiUrl = `/c4ca/totalData?partner_id=${id}`;
    const token = localStorage.getItem("token");
    customAxios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const totalData = response?.data?.data;
        if (totalData !== undefined) {
          // console.log(totalData);
          settotalCountData(totalData);
        } else {
          console.error("Data is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setAllFacilitator(data);
      setFilteredFacilitator(data);
    }
  }, [data, openModal]);

  // const [searchResults, setSearchResults] = useState([]);

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
    const datar = filterFacilitator(searchTerm, allFacilitator);
    setFilteredFacilitator(datar);
  };

  function filterFacilitator(searchText, allFacilitator) {
    const filterData = allFacilitator.filter((facilitator) =>
      facilitator?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    return filterData;
  }

  return (
    <Box className="dashboardContainer">
    <MyBreadcrumbs partnerName={partnerName} />
    <Typography
      style={{
        fontSize: "24px",
        fontWeight: "800px",
        fontFamily: "Amazon Ember Display",
        lineHeight: "75px",
      }}
    >
      {partnerName}
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Typography variant="h6">{data?.name}</Typography>
    </Box>
    <Box
      sx={{
        display: "inline",
        fontSize: "22px",
        fontWeight: "800px",
        lineHeight: "28px",
        fontFamily:"Amazon Ember Display"
      }}
    >
      Overview
    </Box>
    <Box
      style={{ display: "flex", alignItems: "flex-start", gap: "32.161px" }}
    >
      <Box className="InfoBox centerElements">
        <Typography
          variant="body1"
          fontWeight="bold"
          style={{
            fontWeight: "700px",
            fontSize: "32px",
            fontFamily: "Amazon Ember Display",
          }}
        >
          {totalCountData?.totalNoOfTeams || 0}
        </Typography>
        <Typography className="InfoTextStyle" >
          Total Number of Teams
        </Typography>
      </Box>
      <Box className="InfoBox centerElements">
        <Typography variant="body1" fontWeight="bold"   style={{
            fontWeight: "700px",
            fontSize: "32px",
            fontFamily: "Amazon Ember Display",
          }}>
          {totalCountData?.totalNoOfStundents || 0}
        </Typography>
        <Typography className="InfoTextStyle">Number of Students</Typography>
      </Box>
      <Box className="InfoBox centerElements">
        <Typography variant="body1" fontWeight="bold"   style={{
            fontWeight: "700px",
            fontSize: "32px",
            fontFamily: "Amazon Ember Display",
          }}>
          {totalCountData?.totalProjectsSubmitByTeams || 0}
        </Typography>
        <Typography className="InfoTextStyle">
          Total Projects Submitted
        </Typography>
      </Box>
    </Box>
    <Typography
      style={{
        fontFamily: "Amazon Ember Display",
        fontSize: "20px",
        fontWeight: "700px",
        marginTop: "30px",
        // lineHeight:"70px"
      }}
    >
      Facilitator List
    </Typography>
    
  
    <Box sx={{ mt: 2, mb: 2 }}>
      <Box display="flex" justifyContent={"space-between"} mb={3}>
        <TextField
          placeholder="Search Stakeholders..."
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
            style={{
              fontSize: "16px",
              background:
                "var(--midnight-blue-gradient, linear-gradient(90deg, rgba(41, 69, 140, 0.72) 0%, #192954 100%))",
            }}
          >
            Add Facilitator
          </Button>
          {openModal && (
            <Box sx={{ position: "absolute", top: "100%", left: 0 }}>
              <FacilitatorAddModal
                id={id}
                onOpen={handleModalToggle}
                boolean={openModal}
              />
            </Box>
          )}
        </Box>
      </Box>
      {searchTerm === "" ? (
        <FacilatorTable data={filteredFacilitator} />
      ) : (
        <FacilatorTable data={filteredFacilitator} />
      )}
    </Box>
    </Box>
  );
}

export default FacilitatorFilter;
