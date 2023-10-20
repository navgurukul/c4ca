const {
  Container,
  Typography,
  Box,
  Avatar,
  Table,
  Button,
  Grid,
} = require("@mui/material");
import customAxios from "@/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const TeamProfile = () => {
  const [team, setTeam] = useState({});
  useEffect(() => {
    const teamData = JSON.parse(localStorage.getItem("AUTH"));
    console.log(teamData, "teamdata...");
    customAxios.get(`/c4ca/team/${teamData.data.id}`).then((res) => {
      console.log(res.data);
      setTeam(res.data.data);
    });
  }, []);
  const students = [
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
  ];

  return (
    <Container
      maxWidth="lg"
      style={{ padding: 10, marginTop: 30 }}
      disableGutters
    >
      <Typography sx={{ textAlign: "left" }} variant="h6" color="primary">
        Team Profile
      </Typography>
      <Box sx={{ paddingY: 3, display: "flex", alignItems: "center", gap: 3 }}>
        <Avatar
          sx={{
            width: 70,

            height: 70,
            bgcolor: "lightgray",
          }}
        >
          <span style={{ color: "#192954", fontWeight: 900, fontSize: 25 }}>
            {team.team_name?.split(" ")[0]?.charAt(0)}{team.team_name?.split(" ")[1]?.charAt(0)}
          </span>
        </Avatar>
        <Typography
          style={{ textAlign: "left" }}
          variant="body1"
          color="primary"
        >
          {team.team_name}
        </Typography>
      </Box>
      <Typography style={{ textAlign: "left" }} variant="body1" color="gray">
        Note: If any details are incorrect, please reach out to your teacher to
        have them corrected
      </Typography>
      <Grid sx={{ paddingY: 4 }} spacing={5} container>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            style={{
              textAlign: "left",
              paddingBottom: 10,
              borderBottom: "1px solid lightgray",
            }}
            variant="subtitle1"
            color="dark"
          >
            School Details
          </Typography>
          <table>
            <tbody>
              <tr>
                <th>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="gray"
                  >
                    School Name
                  </Typography>
                </th>
                <td>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="dark"
                  >
                    {team.school}
                  </Typography>
                </td>
              </tr>
              <tr>
                <th>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="gray"
                  >
                    District
                  </Typography>
                </th>
                <td>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="dark"
                  >
                    {team.district}
                  </Typography>
                </td>
              </tr>
              <tr>
                <th>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="gray"
                  >
                    State
                  </Typography>
                </th>
                <td>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="dark"
                  >
                    {team.state}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            style={{
              textAlign: "left",
              paddingBottom: 10,
              borderBottom: "1px solid lightgray",
            }}
            variant="subtitle1"
            color="dark"
          >
            Team Members
          </Typography>
          <Table>
            <tbody>
              {team?.team_members?.map((student, index) => (
                <tr key={student.id}>
                  <td style={{ width: "120px" }}>
                    <Typography
                      variant="body1"
                      style={{ textAlign: "left", padding: 8 }}
                      color="gray"
                    >
                      Student {index + 1}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="body1"
                      style={{ textAlign: "left", padding: 5 }}
                      color="dark"
                    >
                      {student.name}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="body1"
                      style={{ textAlign: "right", padding: 5 }}
                      color="dark"
                    >
                      Class {student.class}th
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid>
      </Grid>
      {/* <Link href={"/student/project-submission"}> */}
      <Link href={"/student/dashboard/Dashboard"}>
        <Button
          variant="contained"
          sx={{ marginX: "auto", marginY: 5 }}
          color="primary"
        >
          Verify Details & Proceed
        </Button>
      </Link>
    </Container>
  );
};

export default TeamProfile;
