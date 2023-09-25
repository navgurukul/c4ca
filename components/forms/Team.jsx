import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  TextField,
  Select,
  MenuItem,
  
} from "@mui/material";

const Team = () => {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    district: '',
    state: '',
    class: '',
  });

  const states = [
    {
      name: 'Jharkhand',
    }, {
      name: ' Karnataka',
    }, {
      name: 'Kerala',
    }, {
      name: ' Maharashtra',
    }
  ];

  const classes = [
    {
      name: '1st',
    }, {
      name: '2nd',
    }, {
      name: '3rd',
    }, {
      name: ' 4th',
    }, {
      name: '5th',
    }, {
      name: '6th',
    }
  ];

  const [errors, setErrors] = useState({
    name: '',
    schoolName: '',
    district: '',
    state: '',
    class: ''
  });

  const [teamSize, setTeamSize] = useState(3);
const [selectedTeamSize, setSelectedTeamSize] = useState(3);



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    setSelectedTeamSize(size);

  };

  const validateStudentFields = () => {
    let isValid = true;
    const newErrors = {};

    for (let i = 1; i <= teamSize; i++) {
      const studentNameKey = `studentName${i}`;
      const classKey = `class${i}`;

      if (!formData[studentNameKey]) {
        newErrors[studentNameKey] = 'Student name is required';
        isValid = false;
      }

      if (!formData[classKey] || formData[classKey] === 'Select class') {
        newErrors[classKey] = 'Class is required';
        isValid = false;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    return isValid;
  };

  const isFormValid = () => {
    // Check if team name and school name are not empty
    if (formData.name === '' || formData.schoolName === '') {
      return false;
    }

    // Check if there are no errors for student names and classes
    for (let i = 1; i <= teamSize; i++) {
      const studentNameKey = `studentName${i}`;
      const classKey = `class${i}`;
      if (errors[studentNameKey] || errors[classKey]) {
        return false;
      }
    }

    return true; // Form is valid if all checks pass
  };

  const submit = (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name should be at least 3 characters',
      }));
      return;
    }
    if (formData.schoolName.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        schoolName: 'Name should be at least 3 characters',
      }));
      return;
    }

    const isStudentFieldsValid = validateStudentFields();

    if (!isStudentFieldsValid) {
      return;
    }

    console.log('Form submitted with data:', formData);
  };

  const renderStudentFields = () => {
    const studentFields = [];
    for (let i = 1; i <= teamSize; i++) {
      const studentNameKey = `studentName${i}`;
      const classKey = `class${i}`;

      studentFields.push(
        <Grid container spacing={isMobile ? 2 : 4} key={i}>
          <Grid item md={6} sm={6} xs={12}>
            <InputLabel htmlFor={studentNameKey} variant='body2'>
              Student Name {i}
            </InputLabel>
            <TextField
              fullWidth
              id={studentNameKey}
              name={studentNameKey}
              placeholder={`Student Name ${i}`}
              variant="outlined"
              margin="normal"
              value={formData[studentNameKey] || ''}
              onChange={handleInputChange}
              error={!!errors[studentNameKey]}
              helperText={errors[studentNameKey] || ''}
              InputProps={{
                style: {
                  height: "50px",
                  borderRadius: "50px",
                },
              }}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <InputLabel htmlFor={classKey} variant='body2' sx={{ marginBottom: "15px" }}>
              Class {i}
            </InputLabel>
            <Select
              fullWidth
              id={classKey}
              name={classKey}
              placeholder={`Class ${i}`}
              value={formData[classKey] || ''}
              onChange={handleInputChange}
              error={!!errors[classKey]}
              sx={{
                height: "50px",
                borderRadius: "50px",
              }}
            >
              <MenuItem value="" defaultValue="Select class"></MenuItem>
              {classes.map((std) => (
                <MenuItem key={std.name} value={std.name}>
                  {std.name}
                </MenuItem>
              ))}
            </Select>
            {errors[classKey] && (
              <Typography variant="caption" color="error">
                {errors[classKey]}
              </Typography>
            )}
          </Grid>
        </Grid>
      );
    }
    return studentFields;
  };

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{ display: "grid", placeItems: "center", gap: "20px" }}
    >
      <Typography variant="h5" color="text.primary">
        Add a Team
      </Typography>

      <Container maxWidth="sm" >
        <Box sx={{
          marginBottom: "20px",
        }}>
          <InputLabel htmlFor="name" variant='body2'>Team Name</InputLabel>
          <TextField
            fullWidth
            id="name"
            name="name"
            placeholder='Team Name'
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name || ''}
            InputProps={{
              style: {
                height: "50px",
                borderRadius: "50px",
              }
            }}
          />
        </Box>

        <Box sx={{
          marginBottom: "20px",
        }}>
          <InputLabel htmlFor="schoolName" variant='body2'>School</InputLabel>
          <TextField
            fullWidth
            id="schoolName"
            name="schoolName"
            placeholder='School Name'
            variant="outlined"
            margin="normal"
            value={formData.schoolName}
            onChange={handleInputChange}
            error={!!errors.schoolName}
            helperText={errors.schoolName || ''}
            InputProps={{
              style: {
                height: "50px",
                borderRadius: "50px",
              }
            }}
          />
        </Box>
        <Box sx={{
          marginBottom: "20px",
        }}>
          <Grid container spacing={isMobile ? 2 : 4}>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel htmlFor="state" variant='body2' sx={{
                marginBottom: "15px",
              }}  >State</InputLabel>
              <Select
                fullWidth
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                error={!!errors.state}
                sx={{
                  height: "50px",
                  borderRadius: "50px",
                }}
              >
                <MenuItem value="" defaultValue="Select State"></MenuItem>
                {states.map((state) => (
                  <MenuItem key={state.name} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel htmlFor="district" variant='body2' >District</InputLabel>
              <TextField
                fullWidth
                id="district"
                name="district"
                placeholder='Select District'
                variant="outlined"
                margin="normal"
                value={formData.district}
                onChange={handleInputChange}
                error={!!errors.district}
                helperText={errors.district || ''}
                InputProps={{
                  style: {
                    height: "50px",
                    borderRadius: "50px",
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{
          marginBottom: "20px",
        }}>
          <Divider />
        </Box>

        <Box sx={{
          marginBottom: "20px",
        }}>
          <Typography variant="body2" color="Grey.main" sx={{
            marginBottom: "10px",
          }}>
            Select Team Size
          </Typography>
          <Box className="btnGrp">
            <Button className={`teamBtn ${selectedTeamSize === 3 ? 'selected' : ' ' }`}
variant="subtitle1" onClick={() => handleTeamSizeChange(3)}>
              3
            </Button>
            <Button className={`teamBtn ${selectedTeamSize === 4 ? 'selected' : ' ' }`}
variant="subtitle1" onClick={() => handleTeamSizeChange(4)}>
              4
            </Button>
            <Button className={`teamBtn ${selectedTeamSize === 5? 'selected' : ' ' }`}
variant="subtitle1" onClick={() => handleTeamSizeChange(5)}>
              5
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" color="Grey.main" sx={{ marginBottom: "10px", }}>
          User ID and password will be created automatically and shareable from the dashboard
        </Typography>

        <Box sx={
          {
            marginBottom:"10px"
          }
        }>
          {renderStudentFields()}
        </Box>
        <Typography variant="body2" color="Grey.main" sx={{ marginBottom: "10px", }}>
          If you do not have the student details, you can skip this step and add a team later
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link href="/profile">
              <Button variant="outlined" >Back</Button>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link href="/dashboard">
              <Button variant="outlined" >Skip</Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={submit}
              disabled={!isFormValid()} // Disable the button if the form is not valid
            >
              Add a Team
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Team;