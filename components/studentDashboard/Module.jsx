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
  useMediaQuery,
} from "@mui/material";
import jsonData from "../../data/data.json";
import Link from "next/link";
import LockIcon from "@mui/icons-material/Lock"; // Import the Lock icon
import LaunchIcon from "@mui/icons-material/Launch"; // Import the Launch icon
// import customAxios from "../../../api"; // Import your custom Axios instance
import customAxios from "@/api";
import { breakpoints } from "@/theme/constant";

const Module = () => {
  const [data, setData] = useState({});
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [BASE_URL, setBASE_URL] = useState(
    "https://www.merd-bhanwaridevi.merakilearn.org"
  );

  const [token, setToken] = useState("");
  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    if (
      window.location.origin === "http://localhost:3000" ||
      window.location.origin === "https://dev-c4ca.c4ca.in" ||
      window.location.origin === "http://localhost:3001"
    ) {
      setBASE_URL("https://www.merd-bhanwaridevi.merakilearn.org");
    } else {
      setBASE_URL("https://www.merakilearn.org");
    }
    setToken(authToken?.data?.token);
    customAxios
      .get("/pathways/c4ca/modules", {
        headers: {
          Authorization: authToken.data.token,
          // Authorization: `Bearer ${authToken.token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
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
        data.modules.map((module, index) => {
          let isOpened = module.completed_portion > 0;
          if (!isOpened) {
            if (index === 0) {
              isOpened = true;
            } else {
              isOpened = data.modules[index - 1]?.completed_portion === 100;
            }
          }
          return (
            <Card
              key={index}
              sx={{
                border: 1,
                borderColor: module.borderColor,
                backgroundColor: module.color,
                borderRadius: "8px",
                mb: "32px",
                width: isMobile ? "100%" : "96%",
                filter: isOpened ? "none" : "grayscale(100%)",
              }}
            >
              <CardContent>
                <Grid container justifyContent="space-around">
                  <Grid item>
                    <CardMedia
                      component="img"
                      alt="Image"
                      height={!isMobile ? "100" : "50"}
                      image={module.logo}
                    />
                  </Grid>
                  <Grid item xs={9} sm={8} sx={{ mb: 2 }}>
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
                        {isOpened
                          ? `${module.completed_portion}%`
                          : module.completed_portion !== "" && ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {!isMobile ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      pr: 2,
                      pb: 2,
                      mt: "16px",
                    }}
                  >
                    <Button variant="outlined" disabled={!isOpened}>
                      {isOpened ? (
                        module.button_type === "project_solution" ? (
                          <Link href="/student/submission/project-solution">
                            Submit Project Solution
                          </Link>
                        ) : module.button_type === "project_topic" ? (
                            <Link href="/student/submission/project-topic">
                              Share Project Topic
                            </Link>
                        ) : (
                          <>
                            <Link
                              href={`${BASE_URL}/?studentAuth=${token}`}
                              passHref
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Learn on Meraki <LaunchIcon />
                            </Link>
                          </>
                        )
                      ) : (
                        <>
                          <LockIcon />
                          &nbsp;
                          {module.button_type === "project_solution"
                            ? "Submit Project Solution"
                            : module.button_type === "project_topic"
                            ? "Share Project Topic"
                            : "Learn on Meraki"}
                        </>
                      )}
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ width: isMobile && "100%" }}
                  >
                    {isOpened ? (
                      module.button_type === "project_solution" ? (
                        "Submit Project Solution"
                      ) : module.button_type === "project_topic" ? (
                          "Share Project Topic " 
                      ) : (
                        <>
                          <Link
                            href={`${BASE_URL}/?studentAuth=${token}`}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn on Meraki <LaunchIcon />
                          </Link>
                        </>
                      )
                    ) : (
                      <>
                        <LockIcon />
                        &nbsp;
                        {module.button_type === "project_solution"
                          ? "Submit Project Solution"
                          : module.button_type === "project_topic"
                          ? "Share Project Topic"
                          : "Learn on Meraki"}
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}

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
