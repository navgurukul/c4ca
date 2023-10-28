// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
// } from "@mui/material";
// // import { Select } from "@/styles/style";

// const SelectControl = (props) => {
//   console.log(props, "props");

//   return (
//     <Box sx={{ display: "grid" }}>
//       {props.label && (
//         <Typography variant="body2" color="text.primary">
//           {props.label}
//         </Typography>
//       )}
//       <FormControl>
//         <InputLabel>{props.label}</InputLabel>
//         <Select sx={{ backgroundColor: "pink" }} {...props}>
//           {props.options.map((option, index) => (
//             <MenuItem key={index} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default SelectControl;

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  styled,
} from "@mui/material";
// import styled from "styled-components"; // Import styled-components

const CustomSelect = styled(Select)`
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  border: 1px solid #2e2e2e;
  border-radius: 100px; /* Rounded border */
  font-family: "Amazon Ember";
  font-size: 18px;
  color: #2e2e2e;
  cursor: pointer; /* Use "pointer" for select-like behavior */
  outline: none;
`;

const SelectControl = (props) => {
  const { error } = props;
  return (
    <Box sx={{ display: "grid" }}>
      {props.label && (
        <Typography variant="body2" color="text.primary">
          {props.label}
        </Typography>
      )}
      <FormControl>
        {props.label && <InputLabel>{props.label}</InputLabel>}
        <CustomSelect {...props}>
          {props.options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SelectControl;
