"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FacilatorTable from "./FacilatorTable";
import { useRouter } from "next/router";
import customAxios from "@/api";
import FacilitatorFilter from "./FacilitatorFilter";
import MyBreadcrumbs from "@/components/breadcrumb/breadcrumb";


const FacilatorHome = () => {
  const router = useRouter();
  const { id } = router.query;
  const [partnerName, setPartnerName] = useState();

  useEffect(() => {
    if (id) {
      const apiUrl = `/c4ca/facilitator/getByPartnerId/${id}`;
      const token = localStorage.getItem("token");

      customAxios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const partnerName = response?.data?.data?.partner_name;
          if (partnerName !== undefined) {
            setPartnerName(partnerName);
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("partnerName", partnerName);
          } else {
            console.error("Partner name is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching partner name:", error);
        });
    }
  }, [id]);

  return (
    <>
      {/* <MyBreadcrumbs partnerName={partnerName} id={id}/> */}
      <FacilitatorFilter id={id} />
    </>
  );
};


export default FacilatorHome;
