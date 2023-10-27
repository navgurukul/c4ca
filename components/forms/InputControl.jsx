import { TextField } from "@/styles/style"
import { Box, Typography } from "@mui/material"

const InputControl = (props) => {
  const { label, error, ...restProps } = props;
  return(
    <>
      <Box sx={{ display: "grid", gap: 1,backgroundColor:"pink" }}>
        {props.label && <Typography variant="body2" color='text.primary'>{props.label}</Typography>}
        {/* <TextField {...props}/> */}
        <TextField {...restProps} error={Boolean(error)} />
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
        
      </Box>
    </>
  )
}


export default InputControl