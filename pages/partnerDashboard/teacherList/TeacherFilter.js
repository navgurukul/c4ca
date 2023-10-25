"use client";
import React from "react";
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/router";
import { SearchOutlined, Add } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TeacherListTable from "./TeacherListTable";
import { useState, useEffect } from "react";
import axios from "axios";

import InsertLinkIcon from "@mui/icons-material/InsertLink";

const TeacherFilter = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);

  const [allTeacherList, setAllTeacherList] = useState([]);
  const [filteredTeacher, setFilteredTeacher] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("All District");
  const [selectedSchool, setSelectedSchool] = useState("All School");

  useEffect(() => {
    const apiUrl = `https://merd-api.merakilearn.org/c4ca/teacher/${id}`;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const teacherList = response?.data?.data;
        console.log(teacherList);
        if (teacherList !== undefined) {
          setAllTeacherList(teacherList);
          setFilteredTeacher(teacherList);
        } else {
          console.error("Data is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict); 
    if (selectedDistrict === "All District") {
      setFilteredTeacher(allTeacherList);
    } else {
      const filteredSchools = allTeacherList.filter(
        (teacher) => teacher.district === selectedDistrict
      );
      setFilteredTeacher(filteredSchools);
    }
    setSelectedSchool("All School");
  };

  const handleSchoolChange = (event) => {
    const selectedSchool = event.target.value;
    setSelectedSchool(selectedSchool); 
    console.log(selectedSchool); 
    const filterBySchool = filterSchool(selectedSchool, allTeacherList);
    setFilteredTeacher(filterBySchool)
  };

  function filterSchool(selectedSchool, allTeacherList) {
    if (selectedSchool === "All School") {
      return allTeacherList;
    }
    const filterDataf = allTeacherList?.filter((school) =>
    school?.school?.includes(selectedSchool)
    );
    return filterDataf;
  }


  return (
    <Box style={{ margin: "40px 0" }}>
      <Box sx={{ mx: "110px" }}>
        <Box style={{ margin: "20px 0" }}>
          <Typography
            style={{
              lineHeight: "2",
              fontFamily: "Amazon Ember",
              fontSize: "14px",
            }}
          >
            {" "}
            <span style={{ color: "#29458C" }}>Home/Aarti Girls/</span>{" "}
            <span style={{ color: "#BDBDBD" }}>
              Aarti for Girls First compus
            </span>
          </Typography>
          <Typography
            style={{
              fontSize: "24px",
              lineHeight: "3",
              fontWeight: "800px",
              fontFamily: "Amazon Ember Display",
            }}
          >
            Aarti for Girls First Campus
          </Typography>
          <Typography
            style={{
              lineHeight: "2",
              fontFamily: "Amazon Ember Display",
              fontWeight: "500px",
            }}
          >
            Invite the Teachers
          </Typography>
        </Box>
        <Box style={{ margin: "25px 0" }}>
          <Typography style={{ fontSize: "14px", lineHeight: "4" }}>
            The invite link can be shared with teachers who will be guiding the
            student teams for C4CA projects
          </Typography>
          <Button variant="outlined">
            C4CA Teacher Login
            <InsertLinkIcon />
          </Button>
        </Box>
        <Typography
          style={{
            fontFamily: "Amazon Ember Display",
            fontSize: "24px",
            fontWeight: "800px",
          }}
        >
          Teacher List
        </Typography>
        <Box style={{ margin: "40px 0" }}>
          <TextField
            placeholder="Search Partner..."
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: "#2E2E2E" }} />
                </InputAdornment>
              ),
              style: {
                height: "48px",
                borderRadius: "35px",
                fontSize: "14px",
              },
            }}
            sx={{ width: "360px" }}
          />
          <Box style={{ display: "flex", margin: "16px 0" }}>
            <FormControl>
              <InputLabel id="district-label">District</InputLabel>
              <Select
                sx={{ width: "250px" }}
                labelId="district-label"
                id="district-select"
                value={selectedDistrict}
                label="District"
                onChange={handleDistrictChange}
              >
                <MenuItem value="All District">All District</MenuItem>
                {allTeacherList?.map((teacher, index) => (
                  <MenuItem key={index} value={teacher.district}>
                    {teacher.district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {
              selectedDistrict === "All District" ? ( <FormControl>
              <InputLabel id="school-label">School</InputLabel>
              <Select
                sx={{ width: "250px" }}
                labelId="school-label"
                id="school-select"
                value={selectedSchool}
                label="School"
                onChange={handleSchoolChange}
              >
                 <MenuItem value="All School">All School</MenuItem>
                {allTeacherList?.map((teacher, index) => (
                  <MenuItem key={index} value={teacher.school}>
                    {teacher.school}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>)

           : ( <FormControl>
              <InputLabel id="school-label">School</InputLabel>
              <Select
                sx={{ width: "250px" }}
                labelId="school-label"
                id="school-select"
                value={selectedSchool}
                label="All School"
                onChange={handleSchoolChange}
              >
                 <MenuItem value="All School">All School</MenuItem>
                {filteredTeacher?.map((teacher, index) => (
                  <MenuItem key={index} value={teacher.school}>
                    {teacher.school}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>)
            }
          </Box>
        </Box>
      </Box>
      <TeacherListTable filteredTeacher={filteredTeacher} />
    </Box>
  );
};

export default TeacherFilter;
