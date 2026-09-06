import Navbar from '../components/components/Global/Navbar'
import { Stack, Typography } from '@mui/material';

function Home() {

  return (
    <div className="subpage">
      <Navbar />
      <Stack sx={{ width: "100%" }}>
        <Stack sx={{ pl: 5, marginTop: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left" }}>
            Home
          </Typography>
        </Stack>
      </Stack>
    </div>
  );

}

export default Home;