import React, { useState,useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import jsonData from '../../data/data.json';
import LockIcon from '@mui/icons-material/Lock'; // Import the Lock icon
import LaunchIcon from '@mui/icons-material/Launch'; // Import the Launch icon
// import customAxios from "../../../api"; // Import your custom Axios instance
import customAxios from '@/api';

const Module = () => {
const [openedCards, setOpenedCards] = useState(0);
const [data, setData] = useState({});

const handleCardOpen = () => {
  
  if (openedCards < jsonData.length - 1) {
  setOpenedCards(openedCards + 1);
  }
};


useEffect(() => {
  // let authToken = JSON.parse(localStorage.getItem("AUTH"));
  // console.log(authToken.token, "token");
  customAxios
    .get("/pathways/c4ca/modules", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MyIsImVtYWlsIjoia29tYWxhQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjk4MDc5OTcwLCJleHAiOjE3Mjk2Mzc1NzB9.hR3m5DtqHTq3jsOMnaZ4laQSsZxyk_a8_y7jZC0YKz4",
          // Authorization: `Bearer ${authToken.token}`,
      },
    })
    .then((res) => {
      console.log(res, "data");
      setData(res.data.data);
    
    })
    .catch((err) => {
      console.log("error", err);
      
    });
}, []);


console.log(data, "all data--");

return (
<>
  <Box sx={{ display: 'flex', mt: 3, mb: '32px' }}>
    <Typography variant='h6'>Coding for Climate Action Learning Path</Typography>
  </Box>

  {data && data.modules && data.modules.map((module, index) => (
  <Card
    key={index}
    sx={{
    border: 1,
    // borderColor: item.borderColor,
    // backgroundColor: item.backgroundColor,
    borderRadius: '8px',
    mb: '32px',
    width: '96%',
    filter: openedCards >= index ? 'none' : 'grayscale(100%)',
    }}
    >
    <CardContent>
      <Grid container justifyContent='space-around'>
        <Grid item>
          <CardMedia
            component='img'
            alt='Image'
            height='100'
            image={module.logo}
            // style={{ filter: openedCards >= index ? 'none' : 'grayscale(100%)' }}
            />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ mb: 2 }}>
          <Typography variant='subtitle1'>{module.name}</Typography>
          <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
            {module.description}
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress variant='determinate' value={module.completed_portion} size={30} thickness={6}  />
            <Typography variant='body1' sx={{ marginLeft: '5px' }}>
            {module.completed_portion}%
              {/* {openedCards >= index &&item.progress !== "" ?`${item.progress }%` :item.progress !== "" && 'Not Started'} */}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2, pb: 2, mt: '16px' }}>
        <Button
        variant='outlined'
        disabled={openedCards < index}
        endIcon={openedCards >= index && item.buttonText === "Learn on Meraki" &&<LaunchIcon /> }
        onClick={openedCards === index ? handleCardOpen : null}
        >
          {openedCards >= index ? (
          item.buttonText
          ) : (
          <><LockIcon />&nbsp;{item.buttonText}</>
          )}
        </Button>
      </Box> */}
    </CardContent>
  </Card>
  ))}

  <Box sx={{ display: 'block', textAlign: 'center', mt: '32px', mb: '32px' }}>
  <img src={'/assets/separator.svg'} alt='Image' style={{ width: '5' }} />
  </Box>
  <Box sx={{ display: 'block', textAlign: 'center', mt: 3, mb: 5 }}>
  <img src={'/assets/Frame.svg'} alt='Image' style={{ width: '40%' }} />
  </Box>
  </>
);
};

export default Module;




