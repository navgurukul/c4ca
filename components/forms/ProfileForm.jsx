import React, { useState } from 'react';
import { Camera } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputControl from "./InputControl";
import Team from "./Team";
import InputLabel from '@mui/material/InputLabel';
import {
  Avatar,
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

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    phoneNumber: '',
    schoolName: '',
    district:'',
    state:''
  });
  const states = [
    {
      name: 'Jharkhand',
    },{
      name: ' Karnataka',
    },
    {
      name: 'Kerala',
    },
    {
      name: ' Maharashtra',
    }
  ];
  // const districts = {
  //   "Jharkhand": [
  //     { name: "District 1A" },
  //     { name: "District 1B" },
  //     { name: "District 1C" },
  //   ],
  //   "Karnataka": [
  //     { name: "District 1A" },
  //     { name: "District 1B" },
  //     { name: "District 1C" },
  //   ],
  //   "Kerala": [
  //     { name: "District 1A" },
  //     { name: "District 1B" },
  //     { name: "District 1C" },
  //   ],
  //   "Maharashtra": [
  //     { name: "District 1A" },
  //     { name: "District 1B" },
  //     { name: "District 1C" },
  //   ],

  // }


  const [errors, setErrors] = useState({
    name:'',
    email: '',
    phoneNumber: '',
    schoolName: '',
    district:'',
    state:''
  });

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // You can customize this regex based on your phone number format
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for email
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      return;
    }

    // Validation for phone number
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Invalid phone number',
      }));
      return;
    }

    if (formData.name.length<3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name should be atleast 3 characters',
      }));
      return;
    }

    // If all validations pass, you can submit the form
    console.log('Form submitted with data:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error message when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    if(name === 'phoneNumber' && value.length > 10) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");


  return (
    
    <Container
            maxWidth="lg"
            disableGutters
            sx={{ display: "grid", placeItems: "center", gap  : "20px"}}
       >
      <Typography variant="h5" color="text.primary">
        {router.asPath === "/profile/profile-update"
          ? "Personal Details"
          : "Setup Profile"}
      </Typography>
      
      <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box className="AvatarBox">
            <Avatar src="/avatar.svg" sx={{ width: "100%", height: "100%" }} />
            <Camera className="Camera" />
          </Box>
          <Box  sx={{
            marginBottom: "20px",
          }}>
          <InputLabel htmlFor="name" variant='Body2'>Full Name</InputLabel>
          <TextField
            fullWidth
            id="name"
            name="name"
           placeholder='Name'
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
                style: {
                  height: "50px",
                  borderRadius: "50px",
                }
              }}
          />
          </Box>
          <Box  sx={{
            marginBottom: "20px",
          }}>
          <InputLabel htmlFor="name" variant='Body2'>Email Address</InputLabel>
          <TextField
            fullWidth
            id="email"
            name="email"
            placeholder='Email'
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
                style: {
                   height: "50px",
                  borderRadius: "50px",
                }
              }}
          />
          </Box>
          <Box  sx={{
            marginBottom: "20px",
          }}>
          <InputLabel htmlFor="name" variant='Body2'>Phone Number</InputLabel>
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            // label="Phone Number"
            placeholder='Phone Number'
            variant="outlined"
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            InputProps={{
                style: {
                  height: "50px",
                  borderRadius: "50px",
                }
              }}
          />
          </Box>
          <Box  sx={{
            marginBottom: "20px",
          }}>
          <InputLabel htmlFor="name" variant='Body2'>School</InputLabel>
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
            helperText={errors.schoolName}
            InputProps={{
                style: {
                  height: "50px",
                  borderRadius: "50px",
                }
              }}
          />
          </Box>
          <Box  sx={{
            marginBottom: "20px",
          }}>
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
              <InputLabel htmlFor="district" variant='Body2' >District</InputLabel>
              {/* <Select
                fullWidth
                id="district"
                name="district"
                value={formData.district}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                error={!!errors.district}
                sx={{
                  height: "50px",
                  borderRadius: "50px",
                }}
              >
                <MenuItem value="">Select District</MenuItem>
                {formData.state &&
                  districts[formData.state].map((district) => (
                    <MenuItem key={district.name} value={district.name}>
                      {district.name}
                    </MenuItem>
                  ))}
              </Select> */}
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
                  helperText={errors.district}
                  InputProps={{
                      style: {
                        height: "50px",
                        borderRadius: "50px",
                      }
                    }}
                /> 
                

                
              </Grid>
              <Grid item md={6} sm={6} xs={12}>

                <InputLabel htmlFor="state" variant='Body2' sx={{
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
                    <MenuItem value="" defaultValue ="Select State"></MenuItem>
                    {states.map((state) => (
                      <MenuItem key={state.name} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
              </Grid>
            </Grid>
          </Box>
          <Grid   container justifyContent="center">
            {formData.name !== '' &&
              formData.email !== '' &&
              formData.phoneNumber !== '' &&
              formData.schoolName !== '' ? <Button
              type="submit"
              className="profileBtn"
            
            >
              Save and Proceed
            </Button>:
            <Button
              // className="profileBtn"
              variant="contained"
              disabled
            >
              Save and Proceed
            </Button>
                }

          </Grid>

         
          
         
            {router.asPath === "/profile/profile-update" ? <Team /> : null}
  
            {/* {router.asPath === "/profile/profile-update" ? (
             <Link href="/profile/profile-update">
               <Typography variant="ButtonLarge">Save Profile</Typography>
             </Link>
           ) : (
             <Link href="/dashboard">
               <Typography variant="ButtonLarge">Save & Proceed</Typography>
             </Link>
           )}  */}
        </form>
      </Container>
    </Container>
  );
};

export default ProfileForm;