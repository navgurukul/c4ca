"use client";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

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

const options = {
  filterType: "checkbox",
  download: true,
  print: false,
  search: false,
  filter: false,
  rowFilter: false,
  selectableRows: "none",
};

let btnsContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
};

const FacilatorTable = ({ data }) => {
  // console.log(data);

  const router = useRouter();
  const { id } = router.query;

  let facilitatorId = "";
  const handleRowClick = (event, dataIndex) => {
    facilitatorId = data[dataIndex.dataIndex].id;
    console.log("facilitatorId", facilitatorId);
    console.log(router.query);
    router.push(`/partner/teacherList/${facilitatorId}`);
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return value;
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "phone_number",
      label: "Phone Number",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "number_of_students",
      label: "Number of Students",
      options: {
        filter: false,
        sort: true,
        customCellClass: "custom-cell",
      },
    },
    // {
    //   name: "",
    //   label: "",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     empty: true,
    //     customCellClass: "custom-cell",
    //     style: {
    //       color: "red",
    //     },
    //     customBodyRender: (_, tableMeta) => {
    //       facilitatorId = data[tableMeta.rowIndex].id;
    //       const partneredit = data[tableMeta.rowIndex];
    //       return (
    //         <div style={btnsContainerStyles}>
    //           <Button
    //             size="small"
    //             sx={{
    //               color: "#BDBDBD",
    //               "&:hover": { color: "primary.main" },
    //             }}
    //             onClick={(event) => handleEditButtonClick(partneredit, event)}
    //           >
    //             <EditIcon />
    //           </Button>
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];

  return (
    <Box>
      
      <div
        style={{
          overflowX: "hidden",
          width: "1120px",
        }}
      >
        <ThemeProvider theme={getMuiTheme}>
          <MUIDataTable
            data={data}
            columns={columns}
            options={{ ...options, onRowClick: handleRowClick }}
          />
        </ThemeProvider>
      </div>
    </Box>
  );
};

export default FacilatorTable;
