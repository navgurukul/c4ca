import { TextField } from "@/styles/style"
import { Box, Typography } from "@mui/material"

const InputControl = (props) => {
  console.log(props, 'props')
  return(
    <>
      <Box sx={{ display: "grid", gap: 1,backgroundColor:"pink" }}>
        {props.label && <Typography variant="body2" color='text.primary'>{props.label}</Typography>}
        <TextField {...props}/>
      </Box>
    </>
  )
}


export default InputControl