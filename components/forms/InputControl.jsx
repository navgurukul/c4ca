import { TextField } from "@/styles/style"
import { Box, Typography } from "@mui/material"

const InputControl = (props) => {
  return(
    <>
      <Box sx={{ display: "grid", gap: 1 }}>
        {props.label && <Typography variant="body2">{props.label}</Typography>}
        <TextField {...props}/>
      </Box>
    </>
  )
}


export default InputControl