import {
  Container,
  Button,
  Typography,
  Box,
  useMediaQuery,
  Grid,
} from "@mui/material";
import InputControl from "./InputControl";
import { breakpoints } from "@/theme/constant";
import SelectControl from "./SelectControl";
import { useEffect, useState } from "react";
import stateDistrict from "../../data/state.json";

const Team = () => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [teamSize, setTeamSize] = useState(3);
  const [values, setValues] = useState({});
  const sizeList = [3, 4, 5];

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
        <Grid spacing={5} container>
          <Grid xs={6} item>
            <InputControl label={`Student Name ${i}`} type="text" />
          </Grid>
          <Grid xs={6} item>
            <SelectControl
              label="Class"
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
        >
          Add Team
        </Button>
      </Box>
    </Container>
  );
};

export default Team;
