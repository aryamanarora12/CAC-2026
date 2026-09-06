import { Stack, Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";

function Profile() {

  return (
    <div className="subpage">
      <Navbar />
      <Stack sx={{ width: "100%" }}>
        <Stack sx={{ pl: 5, marginTop: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left" }}>
            My Profile
          </Typography>
        </Stack>
      </Stack>
    </div>
  );

}

export default Profile;