const {
  Container,
  Typography,
  Box,
  Avatar,
  Table,
  Button,
  Grid,
} = require("@mui/material");

const TeamProfile = () => {
  const students = [
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
    { name: "Pratik Deshmukh", class: "4" },
  ];

  return (
    <Container maxWidth="lg" style={{padding: 10}} disableGutters>
      <Typography sm={{ textAlign: "left" }} variant="h6" color="primary">
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
            SR
          </span>
        </Avatar>
        <Typography
          style={{ textAlign: "left" }}
          variant="body1"
          color="primary"
        >
          SkyRiders
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
          <Table>
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
                  Chintels Maharashtra
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
                  Anantpur
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
                  Maharashtra
                </Typography>
              </td>
            </tr>
          </Table>
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
            {students.map((student, index) => (
              <tr key={index}>
                <th>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", padding: 8 }}
                    color="gray"
                  >
                    Student {index + 1}
                  </Typography>
                </th>
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
                    style={{ textAlign: "left", padding: 5 }}
                    color="dark"
                  >
                    {student.class}
                  </Typography>
                </td>
              </tr>
            ))}
          </Table>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ marginX: "auto", marginY: 10 }}
        color="primary"
      >
        Verify Details & Proceed
      </Button>
    </Container>
  );
};

export default TeamProfile;
