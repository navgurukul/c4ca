"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FacilatorTable from "./FacilatorTable";
import { useRouter } from "next/router";
import FacilitatorFilter from "./FacilitatorFilter";


const FacilatorHome = () => {
  const router = useRouter();
  const { id } = router.query;
  

  return (
   <FacilitatorFilter id={id} />
  );
};

export default FacilatorHome;
