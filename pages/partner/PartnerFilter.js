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
import customAxios from "@/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
// import { breakpoints } from "../../theme/constant";

function PartnerFilter() {
  const [openModal, setOpenModal] = useState(false);
  const [allPartner, setAllPartner] = useState([]);
  const [filteredPartner, setfilteredPartner] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [partnerCreatedMessage, setPartnerCreatedMessage] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const partnerAddSuccessMessage = (message) => {
    console.log(message); 
    if (message === "Fill all fields") {
      setSeverity("info")
      setPartnerCreatedMessage("Please fill all fields");
      setOpen(true);
    } else if(message === "Email must be a valid email address"){
      setSeverity("error")
      setPartnerCreatedMessage("Email must be a valid email address");
      setOpen(true);
    }else if(message?.message){
      setSeverity("success")
      setPartnerCreatedMessage(message?.message);
      setOpen(true);
    } else if("Phone number should be of 10 digits"){
      setSeverity("error")
      setPartnerCreatedMessage("Phone number should be of 10 digits");
      setOpen(true);
    }else {
      setSeverity("error")
      setPartnerCreatedMessage("Email must be a valid email, Phone number must be a 10 digit");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to fetch data from the API
  useEffect(() => {
    const fetchData = () => {
      const apiUrl = "/c4caPartners/admin";
      const token = localStorage.getItem("token");
      customAxios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const partnerList = response?.data?.results;
          if (partnerList !== undefined) {
            setAllPartner(partnerList);
            setfilteredPartner(partnerList);
          } else {
            console.error("Data is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
    if (!openModal) {
      fetchData();
    }
  }, [openModal]);

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
    // console.log(allPartner);
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
    // console.log(allPartner);
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
    <Box sx={{ mt: 4, mb: 1 }}>
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
            style={{
              fontSize: "16px",
              background:
                "var(--midnight-blue-gradient, linear-gradient(90deg, rgba(41, 69, 140, 0.72) 0%, #192954 100%))",
            }}
          >
            Add Partner
          </Button>
          {openModal && (
            <Box sx={{ position: "absolute", top: "100%", left: 0 }}>
              <PartnerAddModal
                onOpen={handleModalToggle}
                boolean={openModal}
                partnerAddSuccessMessage={partnerAddSuccessMessage}
              />
            </Box>
          )}
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3200}
          onClose={handleClose} 
          // action={action}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {partnerCreatedMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box style={{ display: "flex" }}>{filterButtons}</Box>
      {searchTerm === "" && allPartner ? (
        <PartnerTable data={allPartner} />
      ) : (
        <PartnerTable data={filteredPartner} />
      )}
    </Box>
  );
}

export default PartnerFilter;
