import { TextField } from "@/styles/style";
import { Box, MenuItem, Select, Typography } from "@mui/material";

const InputControl = (props) => {
  return (
    <>
      <Box sx={{ display: "grid", gap: 1 }}>
        {props.label && (
          <Typography variant="body2" color="text.primary">
            {props.label}
          </Typography>
        )}
        <TextField {...props} />
      </Box>
    </>
  );
};

export default InputControl;

// Select-Dropdown
export const SelectBox = (props) => {
  return (
    <>
      <Box sx={{ display: "grid", gap: 1 }}>
        {props.label && (
          <Typography variant="body2" color="text.primary">
            {props.label}
          </Typography>
        )}
          <Select variant="outlined" name={props.name} value={props.value} onChange={props.onChange}>
            {props.data.map((data, index) => (
              <MenuItem value={data} key={index}>
                {data}
              </MenuItem>
            ))}
          </Select>
      </Box>
    </>
  );
};
