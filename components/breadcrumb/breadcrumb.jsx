import React from "react";
import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function MyBreadcrumbs({partnerName, id, facilitator_name, teacher_name}) {

  const [details, setDetails] = useState({
    teacher_name: ""
  });

  const partnerID = sessionStorage.getItem("id");
  const partner_name = sessionStorage.getItem("partnerName");
  const fid = sessionStorage.getItem("fid");
  const fName = sessionStorage.getItem("fName");

  useEffect(() => {
    setDetails({
      teacher_name: `${teacher_name}`
    })
  }, [id,partnerName,facilitator_name,teacher_name])

  const BreadcrumbsData = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: `/partner/facilitator/${partnerID}`,
      name: `${partner_name}`,
    },
    {
      href: `/partner/teacherList/${fid}`,
      name: `${fName}`,
    },
    {
      name: `${
        details?.teacher_name && details.teacher_name
      }`,
    }
  ]

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb">
    {BreadcrumbsData
      .filter(item => item.name !== "null" && item.name !== "undefined")
      .map((item, index, array) => (
        <React.Fragment key={index}>
          <Link
            color="inherit"
            href={item.href}
            style={{
              color: "#29458C",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "10px",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>
        </React.Fragment>
      ))}
  </Breadcrumbs>




  );
}

export default MyBreadcrumbs;