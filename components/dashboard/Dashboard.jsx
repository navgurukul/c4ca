import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Box,
  Button,
  CircularProgress,
  CardActions,
  Avatar
} from '@mui/material';
import OverView from './OverView';
import Module from './Module';

const teamData = [
  {
    id: 1,
    name: 'Skyriders',
    image: 'medal1.svg',
    description: 'Completed on 23 Sep 23',
    progress: 100,
  },
  {
    id: 2,
    name: 'Flying Mantle',
    image: 'medal2.svg',
    description: '',
    progress: 72,
  },
  {
    id: 3,
    name: 'Blue Surfers',
    image: 'medal3.svg',
    description: '',
    progress: 65,
  },
  {
    id: 4,
    name: 'Green Racers',
    image: '',
    description: '',
    progress: 82,
  },
  {
    id: 5,
    name: 'Yellow Riders',
    image: '',
    description: '',
    progress: 90,
  },
];


const Dashboard = () => {
  const [showAllTeams, setShowAllTeams] = useState(false);

  const displayTeams = showAllTeams ? teamData : teamData.slice(0, 3);

  const handleSeeAllTeamsClick = () => {
    setShowAllTeams(true);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Box sx={{ display: 'flex', mb: '32px' }}>
            <Typography variant="h5">
              Welcome, Team{' '}
              <Typography variant="h5" component="span" color="#F55C38">
                Skyriders
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 2, mb: '32px' }}>
            <Typography variant="h6">Overall Progress: 30%</Typography>
          </Box>
          <Box
            sx={{
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '50%',
              padding: '5px',
            }}
          >
            <LinearProgress
              variant="determinate"
              value={30}
              sx={{
                borderRadius: '6px',
                backgroundColor: 'white',
                height: '10px',
              }}
            />
          </Box>

          <OverView />
          <Module />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ border: 1, borderColor: 'gray', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="subtitle1">Leaderboard</Typography>
              <Typography variant="body2">See how the teams in your district are doing</Typography>
              {displayTeams.map((team, index) => (
                <Grid container spacing={3} alignItems="center" sx={{ mt: 1 }} key={index}>
                  {team.image !== "" ?<Grid item>
                    <img src={team.image} alt="" style={{ width: '100%' }} />
                  </Grid> : <Grid item style={{ width: '15%' ,color:'#6D6D6D'}}  >{index+1}</Grid>}
                 
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body1">{team.name}</Typography>
                      <Typography variant="caption">{team.description}</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value={team.progress} size={25} thickness={6} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{team.progress}%</Typography>
                  </Grid>
                </Grid>
              ))}
              {!showAllTeams && (
                <Grid container spacing={3} alignItems="center" sx={{ mt: 1 }}>
                  <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                    <img src ="separator.svg"/>
                  </Grid>
                  <Grid item style={{ width: '15%', color:"#6D6D6D" ,fontSize:'18px' }}  > {teamData.length}</Grid>
                 
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body1">{teamData[teamData.length-1].name}</Typography>
                      <Typography variant="caption">{teamData[teamData.length-1].description}</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value= {teamData[teamData.length-1].progress} size={25} thickness={6} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{teamData[teamData.length-1].progress}%</Typography>
                  </Grid>
                  
                </Grid>
              )}
            </CardContent>
            <CardActions sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              borderRadius: 0, 
              '& .btn': {
                borderRadius: 0, 
                width: '100%', 
              },
              }}>
              {!showAllTeams && (
                <Button type="button" className="btn btn-lg" onClick={handleSeeAllTeamsClick}>
                  See All Teams
                </Button>
              )}
            </CardActions>
          </Card>
           <Card sx={{ mt: '32px', border: 1, borderColor: 'gray', borderRadius: '8px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <img src="scratch.svg" alt="" />
                <Typography variant="subtitle1">Develop your skills in Scratch</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, mt: 2, alignItems: 'center' }}>
                <Button
                  type="button"
                  className="btn-lg"
                  sx={{
                    borderRadius: 0, 
                  }}
                >
                  <span style={{ flex: 1 }}>Scratch Web</span>
                  <img src="launch.svg" alt="" />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, mt: 2, alignItems: 'center' }}>
                <Button
                  type="button"
                  className="btn-lg"
                  sx={{
                    borderRadius: 0, // Ensure square shape
                   
                  }}
                >
                  <span style={{ flex: 1 }}>Download Meraki App</span>
                  <img src="launch1.svg" alt="" />
                </Button>
              </Box>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
