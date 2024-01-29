


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
  Grid,
} from "@mui/material";
import { SearchOutlined, Add } from "@mui/icons-material";
import FacilitatorAddModal from "./FacilitatorAddModal";
import FacilatorTable from "./FacilatorTable";
import customAxios from "@/api";
import MyBreadcrumbs from "@/components/breadcrumb/breadcrumb";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
// import { Container } from "react-bootstrap";
import { Container, CardContent, Card } from "@mui/material";

function FacilitatorFilter({ id }) {
  // console.log("filter", id);

  const [openModal, setOpenModal] = useState(false);

  const [allFacilitator, setAllFacilitator] = useState();
  const [filteredFacilitator, setFilteredFacilitator] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [partnerName, setPartnerName] = useState();
  const isActive = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [facilitatorCreatedMessage, setFacilitatorCreatedMessage] =
    useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const facilitatorAddSuccessMessage = (message) => { 
    if(message === "Fill all fields"){
      setSeverity("info")
      setFacilitatorCreatedMessage("Please fill all fields");
      setOpen(true); 
    } else if(message === `"Email" must be a valid email`){
      setSeverity("info")
      setFacilitatorCreatedMessage("Email must be a valid email");
      setOpen(true);
    }else if(message?.status){
      setSeverity("success")
      setFacilitatorCreatedMessage(message?.status);
      setOpen(true);
    } else {
      setSeverity("error")
      setFacilitatorCreatedMessage(message);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Container sx={{ mt: 4, mb: 1 }}>
      {/* <Box className="dashboardContainer"> */}
      <MyBreadcrumbs partnerName={partnerName} id={id}/>
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
      <Box sx={{ display: "flex", mb: "32px"  }}>
        <Typography variant="h6">Overview</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <Card
            sx={{
              border: 1,
              borderColor: "gray",
              borderRadius: "8px",
              p: "16px",
            }}
          >
            <CardContent>
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
              <Typography variant="body1" color="#949494">
                Total Number of Teams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card
            sx={{
              border: 1,
              borderColor: "gray",
              borderRadius: "8px",
              p: "16px",
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                fontWeight="bold"
                style={{
                  fontWeight: "700px",
                  fontSize: "32px",
                  fontFamily: "Amazon Ember Display",
                }}
              >
                {totalCountData?.totalNoOfStundents || 0}
              </Typography>
              <Typography className="body1" color="#949494">
                Number of Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card
            sx={{
              border: 1,
              borderColor: "gray",
              borderRadius: "8px",
              p: "16px",
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                fontWeight="bold"
                style={{
                  fontWeight: "700px",
                  fontSize: "32px",
                  fontFamily: "Amazon Ember Display",
                }}
              >
                {totalCountData?.totalProjectsSubmitByTeams || 0}
              </Typography>
              <Typography variant="body1" color="#949494">
                Total Projects Submitted
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", mb: "32px",mt:"32px" }}>
        <Typography variant="h6">Facilitator List</Typography>
      </Box>
      <Grid item container spacing={3} justifyContent="space-between">
        <Grid item xs={12} sm={12} md={5}>
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
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<Add />}
            className=""
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={handleModalToggle}
            style={{              backgroundImage: "linear-gradient(to right, rgba(135, 162, 231, 0.72), #192954)",
          }}
          >
            <Typography>Add Facilitator</Typography>
          </Button>
          {openModal && (
            <Box sx={{ position: "absolute", top: "100%", left: 0 }}>
              <FacilitatorAddModal
                id={id}
                onOpen={handleModalToggle}
                boolean={openModal}
                facilitatorAddSuccessMessage={facilitatorAddSuccessMessage}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3200}
        onClose={handleClose}
        // action={action}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {facilitatorCreatedMessage}
        </Alert>
      </Snackbar>

      {searchTerm === "" ? (
        <FacilatorTable data={allFacilitator} />
      ) : (
        <FacilatorTable data={filteredFacilitator} />
      )}
    </Container>
  );
}

export default FacilitatorFilter;
