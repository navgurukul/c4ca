import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import jsonData from "../../data/data.json";
import LockIcon from "@mui/icons-material/Lock"; // Import the Lock icon
import LaunchIcon from "@mui/icons-material/Launch"; // Import the Launch icon
// import customAxios from "../../../api"; // Import your custom Axios instance
import customAxios from "@/api";

const Module = () => {
  const [openedCards, setOpenedCards] = useState(0);
  const [data, setData] = useState({});
  const [unlockedModules, setUnlockedModules] = useState(0);

  const [token, setToken] = useState("");
  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    setToken(authToken?.data?.token)
    customAxios
      .get("/pathways/c4ca/modules", {
        headers: {
          Authorization: authToken.data.token,
          // Authorization: `Bearer ${authToken.token}`,
        },
      })
      .then((res) => {
        // console.log(res, "data");
        setData(res.data.data);
        setOpenedCards(
          res.data.data.modules.filter((module) => {
            return module.completed_portion === 100;
          }).length
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", mt: 3, mb: "32px" }}>
        <Typography variant="h6">
          Coding for Climate Action Learning Path
        </Typography>
      </Box>

      {data &&
        data.modules &&
        data.modules.map((module, index) => (
          <Card
            key={index}
            sx={{
              border: 1,
              borderColor: module.borderColor,
              backgroundColor: module.color,
              borderRadius: "8px",
              mb: "32px",
              width: "96%",
              filter: openedCards >= index ? "none" : "grayscale(100%)",
            }}
          >
            <CardContent>
              <Grid container justifyContent="space-around">
                <Grid item>
                  <CardMedia
                    component="img"
                    alt="Image"
                    height="100"
                    image={module.logo}
                  />
                </Grid>
                <Grid item xs={12} sm={8} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{module.name}</Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {module.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <CircularProgress
                      variant="determinate"
                      value={module.completed_portion}
                      size={30}
                      thickness={6}
                    />
                    <Typography variant="body1" sx={{ marginLeft: "5px" }}>
                      {openedCards >= index && module.completed_portion !== ""
                        ? `${module.completed_portion}%`
                        : module.completed_portion !== "" && ""}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: 2,
                  pb: 2,
                  mt: "16px",
                }}
              >
                <Button variant="outlined" disabled={openedCards < index}>
                  {openedCards >= index ? (
                    module.button_type === "project_solution" ? (
                      "Submit Project Topic"
                    ) : module.button_type === "project_topic" ? (
                      "Share Project Topic"
                    ) : (
                      <>
                      <a  href={`${process.env.NEXT_PUBLIC_MERAKI_URL}/?studentAuth=${token}`}  target="_blank">Learn on Meraki <LaunchIcon /></a>  
                      </>
                    )
                  ) : (
                    <>
                      <LockIcon />
                      &nbsp;
                      {module.button_type === "project_solution"
                        ? "Submit Project Topic"
                        : module.button_type === "project_topic"
                        ? "Share Project Topic"
                        : "Learn on Meraki"}
                    </>
                  )}
                </Button>

                {/* <Button
                  variant="outlined"
                  disabled={openedCards < index}
                  endIcon={
                    openedCards >= index &&
                    item.buttonText === "Learn on Meraki" && <LaunchIcon />
                  }
                  onClick={openedCards === index ? handleCardOpen : null}
                >
                  {openedCards >= index ? (
                    module.button_type

                  ) : (
                    <>
                      <LockIcon />
                      &nbsp;{item.buttonText}
                    </>
                  )}
                </Button> */}
              </Box>
            </CardContent>
          </Card>
        ))}

      <Box
        sx={{ display: "block", textAlign: "center", mt: "32px", mb: "32px" }}
      >
        <img src={"/assets/separator.svg"} alt="Image" style={{ width: "5" }} />
      </Box>
      <Box sx={{ display: "block", textAlign: "center", mt: 3, mb: 5 }}>
        <img src={"/assets/Frame.svg"} alt="Image" style={{ width: "40%" }} />
      </Box>
    </>
  );
};

export default Module;
