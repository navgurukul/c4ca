import {
  Container,
  Button,
  Typography,
  Box,
  useMediaQuery,
  Grid,
  InputLabel,
} from "@mui/material";
import InputControl from "./InputControl";
import SelectControl from "./SelectControl";
import { breakpoints } from "@/theme/constant";
import { useState, useEffect } from "react";
import stateDistrict from "../../data/state.json";
import { useRouter } from "next/router";
import customAxios from "../../api";
import Link from "next/link";
import TeacherDashboard from "@/pages/teacher/teams";
import axios from 'axios';


const Team = ({ handleCloseDialog, setActiveStep = null, team, handleCloseEditDialog , handleSnackbarOpen=null }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [teamSize, setTeamSize] = useState(3);
  const [teamName, setTeamName] = useState("");
  const [values, setValues] = useState({
    state: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [errors, setErrors] = useState({});

  const sizeList = [3, 4, 5];

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("teacherData"));

    setValues({
      school: teacherData?.school,
      state: teacherData?.state,
      district: teacherData?.district,
    });
  }, []);

  useEffect(() => {
    const membersCount = teamMembers.length;
    if (membersCount < teamSize) {
      const emptyMembersToAdd = teamSize - membersCount;
      const newMembers = Array.from({ length: emptyMembersToAdd }, () => ({
        name: "",
        class: "",
      }));
      setTeamMembers((prevMembers) => [...prevMembers, ...newMembers]);
    } else if (membersCount > teamSize) {
      setTeamMembers(teamMembers.slice(0, teamSize));      
    }
  }, [teamSize]);

  useEffect(() => {
    if (team && team.id) {
      const authToken = JSON.parse(localStorage.getItem("AUTH"));
      customAxios
        .get(`/c4ca/team/${team.id}`, {
          headers: {
            Authorization: authToken.token
          },
        })
      .then((response) => {
        const teamData = response.data;
        setTeamName(teamData.data.team_name);
        setTeamSize(teamData.data.team_size);
        setTeamMembers(teamData.data.team_members);
      })
      .catch((err) => {
        console.log("error", err);
      });
    }
  }, [team]);


  const createTeam = async () => {
    clearErrors();
    if (validateInputs()) {
      try {
       
    const authToken = localStorage.getItem("token");

        const filteredTeamMembers = teamMembers.filter(
          (member) => member.name.trim() !== "" && member.class !== ""
        );

        const response = await customAxios.post(
          "/c4ca/team",
          {
            team_name: teamName,
            team_size: teamSize,
            team_members: filteredTeamMembers,
     
            school: values.school,
            district: values.district,
            state: values.state,
          },

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "success") {
          router.push("/teacher/teams");
          handleCloseDialog();
          handleSnackbarOpen("Team created successfully");
        } else {
          if (response.data.status == "Unique Key Violation") {
            setErrors({
              teamName:
                "Team Name already exists. Please try again with a different name.",
            });
          }
        }
      } catch (error) {
        console.error("Error creating a team:", error);
      }
    }
  };

  const handleEditTeam = () => {  
    const updatedTeam = {
      team_name: teamName,
      team_size: teamSize,
      team_members: teamMembers.map((member) => ({
        name: member.name,
        class: member.class,
      })),    
    };
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
      // console.log('Team ID:', team.id);
    const url = `https://merd-api.merakilearn.org/c4ca/team/update/${team.id}`;
    // console.log('URL:', url);

    customAxios.put(url, updatedTeam, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
        'Content-Type': 'application/json', 
      },
    })
    .then((response) => {
      if (response.data.status === "success") {
        console.log('Edited team data:', response.data);
        handleCloseEditDialog();
        handleSnackbarOpen("Team updated successfully");

      } else {
        console.log('Edit request failed with response:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error editing team data:', error);
      console.log('Response:', error.response);
    });
  };
  const validateInputs = () => {
    const newErrors = {};

    if (!teamName) {
      newErrors.teamName = "Team Name is required";
    } else if (teamName.length < 3) {
      newErrors.teamName = "Team Name must be at least 3 characters long";
    }
    if (!values.school) {
      newErrors.school = "School Name is required";
    }
    if (!values.state) {
      newErrors.state = "Please select a State";
    }
    if (!values.district) {
      newErrors.district = "Please select a District";
    }

    const memberErrors = teamMembers.map((member, index) => {
      const memberErrorsForIndex = {};
      if (!member.name) {
        memberErrorsForIndex.name = `Student Name is required`;
      }
      if (!member.class) {
        memberErrorsForIndex.class = `Class for Student is required`;
      }
      return memberErrorsForIndex;
    });

    if (memberErrors.some((errors) => Object.keys(errors).length > 0)) {
      newErrors.teamMembers = memberErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const updateTeamMember = (index, name, classValue) => {
    setTeamMembers((prevMembers) => {
      const newMembers = [...prevMembers];
      newMembers[index] = { name, class: classValue };
      return newMembers;
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "grid", gap: isMobile ? 2 : 4, paddingY: 5 }}
    >
      {!team? <Typography variant="h5" color="text.primary">
        Add a Team
      </Typography>:
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6" color="text.primary">
      Edit Team
      </Typography>
      <Button  onClick={() =>handleCloseEditDialog()}>
        <img src="/assets/close.svg" alt="close icon" />
      </Button>

      </Box>
     }
      <InputControl
        label="Team Name"
        type="text"
        error={errors.teamName}
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <InputControl
        label="School Name"
        type="text"
        error={errors.school}
        value={values.school}
        onChange={(e) => setValues({ ...values, school: e.target.value })}
        disabled= {team}
      />

      <Grid spacing={5} container>
        <Grid xs={6} item>
          <InputLabel sx={{ fontSize: "14px", color: "#2E2E2E" }}>
            State
          </InputLabel>
          <SelectControl
            value={values.state}
            onChange={(e) => setValues({ ...values, state: e.target.value })}
            options={Object.keys(stateDistrict).map((state) => ({
              label: state,
              value: state,
            }))}
            sx={{ mb: 1 }}
            disabled= {team}
          />
        </Grid>
        <Grid xs={6} item>
          <InputLabel sx={{ fontSize: "14px", color: "#2E2E2E" }}>
            District
          </InputLabel>
          <SelectControl
            value={values.state && values.district}
            onChange={(e) => setValues({ ...values, district: e.target.value })}
            options={
              values.state
                ? stateDistrict[values.state].map((district) => ({
                    label: district,
                    value: district,
                  }))
                : []
            }
            sx={{ mb: 1 }}
            disabled= {team}
          />
        </Grid>
      </Grid>

      <hr />

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2" color="text.primary">
          Select Team Size
        </Typography>
        <Box className="btnGrp">
          {sizeList.map((size) => (
            <Button
              className={`teamBtn ${
                teamSize === size ? "teamBtn-selected" : ""
              }`}
              variant="subtitle1"
              onClick={() => setTeamSize(size)}
              key={size}
            >
              {size}
            </Button>
          ))}
        </Box>
      </Box>

      <Typography variant="" color="Gray.light">
        User ID and password will be created automatically and shareable from
        the dashboard
      </Typography>

      {Array.from({ length: teamSize }, (_, index) => (
        <Grid spacing={5} container key={index}>
          <Grid xs={6} item>
            <InputControl
              label={`Student Name ${index + 1}`}
              type="text"
              value={teamMembers[index] ? teamMembers[index].name : ""}
              onChange={(e) =>
                updateTeamMember(
                  index,
                  e.target.value,
                  teamMembers[index]?.class
                )
              }
              sx={{ mb: 1 }}
              error={
                errors.teamMembers &&
                errors.teamMembers[index] &&
                errors.teamMembers[index].name
              }
            />
          </Grid>
          <Grid xs={6} item>
            <InputLabel
              id={`class${index + 1}`}
              style={{ fontSize: "14px", color: "#2E2E2E" }}
            >
              Class
            </InputLabel>
            <SelectControl
              sx={{ mt: 1, mb: 1 }}
              value={teamMembers[index] ? teamMembers[index].class : ""}
              onChange={(e) =>
                updateTeamMember(
                  index,
                  teamMembers[index]?.name,
                  e.target.value
                )
              }
              options={[
                { label: "5th", value: "5" },
                { label: "6th", value: "6" },
                { label: "7th", value: "7" },
                { label: "8th", value: "8" },
                { label: "9th", value: "9" },
                { label: "10th", value: "10" },
              ]}
            />
            {errors.teamMembers &&
              errors.teamMembers[index] &&
              errors.teamMembers[index].class && (
                <Typography variant="caption" color="error">
                  {errors.teamMembers[index].class}
                </Typography>
              )}
          </Grid>
        </Grid>
      ))}

      <Typography variant="" color="Gray.light">
        If you do not have the student details, you can skip this step and add a
        team later
      </Typography>

      <Box sx={{ display: "flex", justifyContent: team?"flex-end": "space-between" }}>
     { !team && <Button
          onClick={() =>
            setActiveStep ? setActiveStep(0) : handleCloseDialog()
          }
          className="Button"
          color="primary"
        >
          Back
        </Button>}
        {!team&&(setActiveStep && (
          <Button
            className="Button"
            color="primary"
            onClick={() => router.push("/teacher/teams")}
          >
            Skip
          </Button>
        ))}
       
     
        <Button
          className="Button"
          color="primary"
          variant="contained"
          sx={{ minWidth: 240, display: "block" }}
          onClick= { team ?handleEditTeam : createTeam}
          
        >
         { team ? "Update Details" : "Add Team"}
        </Button>
      </Box>
    </Container>
  );
};

export default Team;
