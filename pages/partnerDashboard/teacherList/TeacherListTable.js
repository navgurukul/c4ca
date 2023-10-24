import React from 'react';
import {
  TextField,
  Box,
  Button,
  InputAdornment,
} from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import { SearchOutlined, Add } from '@mui/icons-material';
import MUIDataTable from 'mui-datatables';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "none",
            fontFamily: "Noto Sans !important",
            textAlign: "left",
            "&.custom-cell": {
              width: "0px",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(233, 245, 233, 1) !important",
              cursor: "pointer",
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          regular: {
            minHeight: "8px",
          },
        },
      },
    },
  });
export default function teachersList() {
  const options = {
    filterType: 'checkbox',
    download: true,
    print: false,
    search: false,
    filter: true,
    rowFilter: false,
    selectableRows: 'none',
  };
 const columns = [
    {
      name: 'name',
      label: 'Teacher Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'Email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
        customCellClass: 'custom-cell',
      },
    },
    {
      name: 'Number of Teams',
      label: 'Number of Teams',
      options: {
        filter: false,
        sort: false,
        customCellClass: 'custom-cell',
      },
    },
    {
      name: 'Number of Student',
      label: 'Number of Student',
      options: {
        filter: false,
        sort: false,
        customCellClass: 'custom-cell',
      },
    },
  ];
  return (
      <Box sx={{ mx: '110px'}}>
        <Box style={{margin:"20px 0"}}>
        <Typography style={{ lineHeight: "2",fontFamily:"Amazon Ember",fontSize:"14px"}}> <span style={{color:"#29458C"}}>Home/Aarti Girls/</span> <span style={{color:"#BDBDBD"}}>Aarti for Girls First compus</span></Typography>
        <Typography style={{fontSize:"24px",lineHeight: "3",fontWeight:"800px",fontFamily:"Amazon Ember Display"}}>Aarti for Girls First Campus</Typography>
        <Typography style={{ lineHeight: "2",fontFamily:"Amazon Ember Display",fontWeight:"500px" }}>Invite the Teachers</Typography>
        </Box >
        <Box style={{margin:"25px 0"}}>
        <Typography style={{fontSize:"14px",lineHeight: "4"}}>
          The invite link can be shared with teachers who will be guiding the student teams for C4CA projects
        </Typography>
        <Button variant="outlined">C4CA Teacher Login<InsertLinkIcon/></Button>
        </Box>
        <Typography style={{fontFamily:"Amazon Ember Display",fontSize:"24px",fontWeight:"800px"}}>Teacher List</Typography>
        <Box style={{  margin: '40px 0' }}>
        <TextField
          placeholder="Search Partner..."
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ color: '#2E2E2E' }} />
              </InputAdornment>
            ),
            style: {
              height: '48px',
              borderRadius: '35px',
              fontSize: '14px',
            },
          }}
          sx={{ width: '360px' }}
        />
        <Box style={{display: "flex",margin:"16px 0"}}>
          <Button variant="outlined" style={{ fontSize: '16px', marginRight: '16px' }}>
            All District<ExpandMoreIcon />
          </Button>
          <Button variant="outlined" style={{ fontSize: '16px' }}>
            All School<ExpandMoreIcon />
          </Button>
          </Box>
        </Box>
        <Box
        style={{
          overflowX: "hidden",
          margin:"16px 0" ,
          marginTop:"20px"
        }}
      >
      <ThemeProvider theme={getMuiTheme}>
        <MUIDataTable  columns={columns} options={options} />
        </ThemeProvider>
        </Box>
      </Box>
  );
}