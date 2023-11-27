"use client";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Box,Grid, } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
// import showToast from "../showToast";
import PartnerUpdateModal from "./PartnerAddModal"
// import { useRemovePartnerMutation } from "../../store";
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
              backgroundColor: "#D4DAE8",
              // backgroundColor:"hsla(222, 30%, 87%, 1)",
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
const PartnerTable = ({data}) => {
  let partnerId = "";
  const columns = [
    {
      name: "name",
      label: "Partner Name",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return value;
        },
      },
    },
    {
      name: "point_of_contact",
      label: "Point of Contact",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
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
        name: "phone_number",
        label: "Phone Number",
        options: {
          filter: false,
          sort: false,
          customCellClass: "custom-cell",
        },
      },
    {
      name: "no_of_students",
      label: "Number of Students",
      options: {
        filter: false,
        sort: false,
        customCellClass: "custom-cell",
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
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
    //       partnerId = data[tableMeta.rowIndex].id;
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
  const handleDeleteClick = (partnerId) => {
    removePartner(partnerId);
  };
  const handleEditClick = (partnerId) => {
    setOpen(!open);
    setUpdateData(partnerId);
  };
  const handleEditButtonClick = (partneredit, event) => {
    event.stopPropagation(); // Stop the event propagation to prevent handleRowClick from being called
    handleEditClick(partneredit);
  };
  const router = useRouter();
  const handleRowClick = (event, dataIndex) => {
    partnerId = data[dataIndex.dataIndex].id;
    router.push(`partner/facilitator/${partnerId}`);
  };
  return (
    <Grid container spacing={2} width="100%" justifyContent="space-between" mb ={3}>
      <Box style={{ overflowX: "hidden", width:"100%"}}> 
        <ThemeProvider theme={getMuiTheme}>
          <MUIDataTable
          data={data}
          columns={columns}
          options={{ ...options, onRowClick: handleRowClick }}
          />
        </ThemeProvider>
      </Box>
    </Grid>
   
  );
};
export default PartnerTable;