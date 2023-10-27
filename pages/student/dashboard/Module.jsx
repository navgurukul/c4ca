import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Button, Grid, Card, CardContent, CardMedia,useMediaQuery } from '@mui/material';
import jsonData from './data.json';
import LockIcon from '@mui/icons-material/Lock'; // Import the Lock icon
import LaunchIcon from '@mui/icons-material/Launch'; // Import the Launch icon

const Module = () => {
const [openedCards, setOpenedCards] = useState(0);
const isActive = useMediaQuery("(max-width:600px)");


const handleCardOpen = () => {
  
  if (openedCards < jsonData.length - 1) {
  setOpenedCards(openedCards + 1);
  }
};

return (
<>
  <Box sx={{ display: 'flex', mt: 3, mb: '32px' }}>
    <Typography variant='h6'>Coding for Climate Action Learning Path</Typography>
  </Box>

  {jsonData.map((item, index) => (
  <Card
    key={index}
    sx={{
    border: 1,
    borderColor: item.borderColor,
    backgroundColor: item.backgroundColor,
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
            image={item.img}
            // style={{ filter: openedCards >= index ? 'none' : 'grayscale(100%)' }}
            />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ mb: 2 }}>
          <Typography variant='subtitle1'>{item.title}</Typography>
          <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
            {item.description }
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress variant='determinate' value={item.progress} size={30} thickness={6}  />
            <Typography variant='body1' sx={{ marginLeft: '5px' }}>
              {openedCards >= index &&item.progress !== "" ?`${item.progress }%` :item.progress !== "" && 'Not Started'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2, pb: 2, mt: '16px' }}>
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
      </Box>
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




