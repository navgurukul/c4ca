import React from 'react';
import Link from '@mui/material/Link';
import { Avatar, Box, Grid,  } from "@mui/material";
import Typography from '@mui/material/Typography';
 function Progress() {
  const student = [
    { Color: "red", lesson: "Intro to Scratch", status: "Submitted" },
    { Color: "red", lesson: "Intro to Scratch", status: "Submitted" },
    { Color: "red", lesson: "Intro to Scratch", status: "Submitted" },
  ];
  return (
    <Box style={{ marginLeft: "7.5%", marginRight: "20%" }}>
      <Box style={{ lineHeight: "5" }}>
        <Link color="inherit" href="/" style={{ color: "#29458C", fontSize: "16px", fontWeight: "500px", fontFamily: "Amazon Ember" }}>
          Home / Aarti for Girls / Aarti for Girls First campus / <span style={{ color: "#BDBDBD" }}>Anand NG</span></Link>
      </Box>
      <Box
        style={{
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <img
          alt="StudentProfile"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "60px",
            background: "red",
            marginTop: "10px"
          }}
        />
        <Box style={{ marginLeft: "25px", marginTop: "10px"
}}>
          <Typography style={{fontSize:"16px",fontFamily:"Noto Sans"}}> Anand NG</Typography>
          <Typography style={{ color: "#2E2E2E", fontSize: "14px" }}>Anand@gmail.com</Typography>
        </Box>
      </Box>
      <Typography style={{fontFamily:"Amazon Ember",fontSize:"16px",fontWeight:"700px",marginTop: "30px" }}>Teams Under Supervision</Typography>
      <Box style={{ marginTop: "20px"}}>
        <Grid container spacing={3}>
          {student.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                style={{
                  width: "90%",
                  height: "150px",
                  border: "1px solid #DEDEDE",
                  borderRadius: "5px",
                  padding: "10px",
                  background: "#fff",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  margin: "5px",
                }}
              >
                <Typography style={{fontSize:"15px",fontFamily:"Amazon Ember",lineHeight:"35px",fontWeight:"700px"}}>Flying Colors:{person.name}</Typography>
                <hr style={{color:"#DEDEDE", border: "none", borderTop: "2px solid #DEDEDE",}} />
                <Typography style={{fontSize:"15px",fontFamily:"Amazon Ember",lineHeight:"40px",fontWeight:"700px"}}>Current Lesson: {person.lesson}</Typography>
                <Typography style={{fontSize:"15px",fontFamily:"Amazon Ember",lineHeight:"35px",fontWeight:"700px"}}>Project Status: {person.status}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Progress;