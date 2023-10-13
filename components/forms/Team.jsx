import {
  Container,
  Button,
  Typography,
  Box,
  useMediaQuery,
  Grid,
  InputLabel
} from "@mui/material";
import InputControl from "./InputControl";
import { breakpoints } from "@/theme/constant";
import SelectControl from "./SelectControl";
import { useEffect, useState } from "react";
import stateDistrict from "../../data/state.json";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

const Team = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [teamSize, setTeamSize] = useState(3);
  const [values, setValues] = useState({});
  const sizeList = [3, 4, 5];
  const [teamId, setTeamId] = useState(null);

  const createTeam = async (teamName, teamSize) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("AUTH"));
      const response = await Axios.post(
        "https://merd-api.merakilearn.org/c4ca/team",
        {
          team_name: teamName,
          team_size: teamSize,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      setTeamId(response.data.id); // Store the team ID
      return response.data.id;
    } catch (error) {
      console.error("Error creating a team:", error);
      throw error;
    }
  };

  const addStudentsToTeam = async (students) => {
    if (!teamId) {
      console.error("Team ID is missing.");
      return;
    }

    try {
      const authToken = JSON.parse(localStorage.getItem("AUTH"));
      await Axios.post(
        "https://merd-api.merakilearn.org/c4ca/team/addStudent",
        {
          team_members: students.map((student) => ({
            name: student.name,
            class: student.class,
          })),
          team_id: teamId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding students to the team:", error);
      throw error;
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "grid", gap: isMobile ? 2 : 4, paddingY: 5 }}
    >
      <Typography variant="h5" color="text.primary">
        Add a Team
      </Typography>

      <InputControl label="Team Name" type="text" />
      <InputControl label="School Name" type="text" />
      <Grid spacing={5} container>
        <Grid xs={6} item>
          <InputLabel id="state" style={{fontSize: '14px',color:'#2E2E2E' }}>
            State
          </InputLabel>
          <SelectControl
            onChange={(e) => setValues({ ...values, state: e.target.value })}
            options={Object.keys(stateDistrict).map((state) => ({
              label: state,
              value: state,
            }))}
          />
        </Grid>
        <Grid xs={6} item>
          <InputLabel id="district" style={{fontSize: '14px',color:'#2E2E2E'}}>
            District
          </InputLabel>
          <SelectControl
            options={
              values.state
                ? stateDistrict[values.state].map((district) => ({
                    label: district,
                    value: district,
                  }))
                : []
            }
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
                teamSize == size ? "teamBtn-selected" : ""
              }`}
              variant="subtitle1"
              onClick={() => setTeamSize(size)}
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
      {Array.from({ length: teamSize }, (_, index) => index + 1).map((i) => (
        <Grid spacing={5} container key={i}>
          <Grid xs={6} item>
            <InputControl label={`Student Name ${i}`} type="text" />
          </Grid>
          <Grid xs={6} item>
            <InputLabel id="class" style={{ fontSize: '14px',color:'#2E2E2E' }}>
              {`Class ${i}`}
            </InputLabel>
            <SelectControl
              // label={`Class ${i}`}
              sx={{mt:1}}
              options={[
                { label: "5th", value: "5" },
                { label: "6th", value: "6" },
                { label: "7th", value: "7" },
                { label: "8th", value: "8" },
                { label: "9th", value: "9" },
                { label: "10th", value: "10" },
              ]}
            />
          </Grid>
        </Grid>
      ))}
      <Typography variant="" color="Gray.light">
        If you do not have the student details, you can skip this step and add a
        team later
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button className="Button" color="primary">
          Back
        </Button>
        <Button
          className="Button"
          color="primary"
          variant="contained"
          sx={{ minWidth: 240, display: "block" }}
          onClick={async () => {
            try {
              const newTeamId = await createTeam("Avengers0007", teamSize);
              if (newTeamId) {
                const students = Array.from(
                  { length: teamSize },
                  (_, index) => {
                    const studentName = values[`Student Name ${index + 1}`];
                    const studentClass = values[`Class ${index + 1}`];
                    return { name: studentName, class: studentClass };
                  }
                );

                await addStudentsToTeam(students);
                router.push("/teacher");
              }
            } catch (error) {
              // Handle errors
            }
          }}
        >
          Add Team
        </Button>
      </Box>
    </Container>
  );
};

export default Team;
