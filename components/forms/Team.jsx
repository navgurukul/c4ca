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

const Team = ({ handleCloseDialog }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [teamSize, setTeamSize] = useState(3);
  const [teamName, setTeamName] = useState("");
  const [values, setValues] = useState({
    state: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);

  const sizeList = [3, 4, 5];

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

  const createTeam = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem("AUTH"));

      const filteredTeamMembers = teamMembers.filter(
        (member) => member.name.trim() !== "" && member.class !== ""
      );

      const response = await customAxios.post(
        "/c4ca/team",
        {
          team_name: teamName,
          team_size: teamSize,
          team_members: filteredTeamMembers,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        router.push("/teacher");
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error creating a team:", error);
    }
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
      <Typography variant="h5" color="text.primary">
        Add a Team
      </Typography>

      <InputControl
        label="Team Name"
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <Grid spacing={5} container>
        <Grid xs={6} item>
          <InputLabel id="state" style={{ fontSize: "14px", color: "#2E2E2E" }}>
            State
          </InputLabel>
          <SelectControl
            onChange={(e) => setValues({ ...values, state: e.target.value })}
            label="State"
            options={Object.keys(stateDistrict).map((state) => ({
              label: state,
              value: state,
            }))}
          />
        </Grid>
        <Grid xs={6} item>
          <InputLabel
            id="district"
            style={{ fontSize: "14px", color: "#2E2E2E" }}
          >
            District
          </InputLabel>
          <SelectControl
            label="District"
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
            />
          </Grid>
          <Grid xs={6} item>
            <InputLabel
              id={`class${index + 1}`}
              style={{ fontSize: "14px", color: "#2E2E2E" }}
            >
              {`Class ${index + 1}`}
            </InputLabel>
            <SelectControl
              sx={{ mt: 1 }}
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
          </Grid>
        </Grid>
      ))}

      <Typography variant="" color="Gray.light">
        If you do not have the student details, you can skip this step and add a
        team later
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={"/teacher"}>
          <Button className="Button" color="primary">
            Back
          </Button>
        </Link>
        <Button
          className="Button"
          color="primary"
          onClick={() => router.push("/teacher")}
        >
          Skip
        </Button>
        <Button
          className="Button"
          color="primary"
          variant="contained"
          sx={{ minWidth: 240, display: "block" }}
          onClick={createTeam}
        >
          Add Team
        </Button>
      </Box>
    </Container>
  );
};

export default Team;
