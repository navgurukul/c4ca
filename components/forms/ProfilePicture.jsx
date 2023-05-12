import { Box } from "@mui/material";
import { Camera } from "@mui/icons-material";

const ProfilePicture = () => {
  return (
    <>
      <Box className="AvatarBox">
        <img src="/avatar.svg" style={{ width: "100%", height: "100%" }} />
        <Camera className="Camera" />
      </Box>
    </>
  );
};

export default ProfilePicture;
