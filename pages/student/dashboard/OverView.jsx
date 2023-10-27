import { Typography,Grid,Paper,Box,Avatar,Card,CardContent,useMediaQuery } from '@mui/material';
import React from 'react'

const OverView = () => {
  const isActive = useMediaQuery("(max-width:600px)");
    const Data = [
        {
          title: "All Time Metric",
          value: 200,
          icon: "/avatar2.svg",
        },
        {
          title: "All Volunteers",
          value: 140,
          icon: "/avatar2.svg",
        },
        {
          title: "Total Number",
          value: 140,
          icon: "",
        }
      ];
   
  return (
    <>
        <Box sx={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ mt: 4 }}>
            Overview
            </Typography>
        </Box>

      <Grid container sx={{ mt: "32px" }} spacing={1}>
        {Data.map((item, index) => (
          <Grid key={index} item xs={6} sm={6} md={4} gap="32px">
            <Card sx={{ border: 1, borderColor: 'gray', borderRadius: '8px', width:'90%',p:'24px'}}>
              <CardContent>
                <Box display="flex" alignItems="center">
               { item.icon !== ""&&<Avatar src={item.icon} />}
                  <Typography variant="h6" sx={{ marginLeft: 1 }}>
                    {item.value}
                  </Typography>
                </Box>
                <Typography variant='body1'>{item.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    
    </>
  )
}
export default OverView;



