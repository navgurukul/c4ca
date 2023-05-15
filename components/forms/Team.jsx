import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import InputControl from "./InputControl";
import { breakpoints } from "@/theme/constant";

const Team = () => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [count, setCount] = useState(0);
  const [teamForm, setTeamForm] = useState([]);

  const handleClick = (e) => {
    const value = e.target.textContent;
    setCount(value);
  };

  useEffect(
    () =>
      setTeamForm(
        Array.from({ length: count }).map((item, index) => {
          if (index == 0) {
            return (
              <Box key={index} sx={{ display: "grid", gap: 1 }}>
                <Typography variant="body2" color="text.primary">
                  Team Member {index + 1}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  User Name (You)
                </Typography>
              </Box>
            );
          } else if (index > 0) {
            return (
              <Box key={index} sx={{ display: "grid", gap: 1 }}>
                <Typography variant="body2" color="text.primary">
                  Team Member {index + 1}
                </Typography>
                <InputControl label="Full Name" type="text" />
                <InputControl label="Email Address" type="email" />
              </Box>
            );
          } else {
            return null;
          }
        })
      ),
    [count]
  );

  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: isMobile ? 2 : 4 }}>
      <Typography variant="h5" color="text.primary">
        Team Details
      </Typography>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2" color="text.primary">
          Select Team Size
        </Typography>

        <Box className="btnGrp">
          <Button className="teamBtn" onClick={handleClick}>
            3
          </Button>
          <Button className="teamBtn" onClick={handleClick}>
            4
          </Button>
          <Button className="teamBtn" onClick={handleClick}>
            5
          </Button>
        </Box>
      </Box>

      <Typography variant="body2" color="Grey.main">
        Your team members will join your team when they login or see your invite
        if they already registered on the platform
      </Typography>

      <InputControl label="Team Name" type="text" />

      {/* set dynamic form fields for adding team members */}
      {teamForm}
    </Container>
  );
};

export default Team;
