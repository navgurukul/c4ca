"use client";
import React from "react";
import { TextField, Box, Button, InputAdornment } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import { useRouter } from 'next/router';

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

function TeachersList({ filteredTeacher }) {
  console.log(filteredTeacher);
  let teacherId= "";
  const options = {
    filterType: "checkbox",
    download: true,
    print: false,
    search: false,
    filter: true,
    rowFilter: false,
    selectableRows: "none",
  };
  const columns = [
    {
      name: "name",
      label: "Teacher Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "district",
      label: "district",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "school",
      label: "school",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "Number of Teams",
      label: "Number of Teams",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "Number of Student",
      label: "Number of Student",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
      },
    },
  ];

  const router = useRouter();  

  
  const handleRowClick = (event, dataIndex) => {
    teacherId = filteredTeacher[dataIndex.dataIndex].id;
    console.log(teacherId);
    router.push(`/partner/progress/${teacherId}`);
  };


  return (
    <Box sx={{ mx: "110px" }}>
      <Typography
        style={{
          fontFamily: "Amazon Ember Display",
          fontSize: "24px",
          fontWeight: "800px",
        }}
      >
        Teacher List
      </Typography>

      <Box
        style={{
          overflowX: "hidden",
          margin: "16px 0",
          marginTop: "20px",
        }}
      >
        <ThemeProvider theme={getMuiTheme}>
          {filteredTeacher && (
            <MUIDataTable
              data={filteredTeacher}
              columns={columns}
              options={{ ...options, onRowClick: handleRowClick }}
         
            />
          )}
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default TeachersList;
