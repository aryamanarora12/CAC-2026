import { Stack, Typography, ToggleButtonGroup, ToggleButton, Box, Divider, Select, MenuItem, Card, CardContent, TextField, Button } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";
import { useState } from "react";

function Forum() {
  const [page, setPage] = useState('read')
  const [category, setCategory] = useState('')

  const majors = ['Science', 'Art', 'English', 'Buisness', 'Engineering', 'Medicine', "General/Other"]

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setPage(newValue);
    }
  };

  return (
    <div>
      <Navbar />

      <Stack sx={{ width: "100%"}}>
        <Stack sx={{
            //sx here means style
            pl: 5,
            marginTop: 5
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            //pl here means padding left(shorthand to save time)
          }}
        >
          Get Quick Help on the Application Process!
        </Typography>
        <Typography variant='h6' sx={{
          color: 'grey',
          width: '50%',
          textAlign: 'left',
          fontSize: 15
        }}>
          Whether you have questions about college applications, need help with your personal statement, are looking for advice on choosing colleges, or just want some guidance along the way, our community is here to help you navigate the college application process with confidence.

        </Typography>
        </Stack>

        {/*Toggle button to switch between adding a post or reading one */}
        <Box>
        <ToggleButtonGroup
          value={page}
          exclusive
          onChange={handleChange}
          sx = {{
            /* change color when selected */
            "& .MuiToggleButton-root.Mui-selected": {
              color: "white",
              backgroundColor: "#1976d2",
            }
          }}
          
        >
          <ToggleButton value="post">
            Get Help
          </ToggleButton>

          <ToggleButton value="read">
            Read
          </ToggleButton>
        </ToggleButtonGroup>
        </Box>

        <Divider sx={{marginTop: 3, width: '100%', alignSelf: 'center'}} />
        {/* change content depending on if in read or write mode */}
        {page === "read" ? 
        <Stack>
          <Stack direction="row" sx={{justifyContent: 'space-between'}}>
            <Typography variant="h5" sx={{fontWeight: 'bold', textAlign: 'left', pl: 5, marginTop: 5}}>Recent Posts</Typography>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              sx={{ pr: 5, mr: 5, marginTop: 3, width: '20%' }}
            >
              <MenuItem value="" disabled>
                Choose Major
              </MenuItem>

              {majors.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack> 
        : 
        <Stack sx={{justifySelf: 'center', alignSelf: 'center', width: '80%', height: '60%', mt: 5}}>
          <Card sx={{border: '1px solid grey',boxShadow: 'none', padding: 5}}>
              <CardContent>
                  <Typography variant='h5' sx={{fontWeight: 'bold', textAlign: 'left'}}>Get Help Now From a Peer</Typography>
                  <Stack direction="row" sx={{mt: 5, justifyContent: 'space-between'}}>
                    <Typography sx={{fontWeight: 'bold'}}>I need help in</Typography>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      displayEmpty
                      sx={{ width: '20%' }}
                    >
                      <MenuItem value="" disabled>
                        Choose Major
                      </MenuItem>

                      {majors.map((m) => (
                        <MenuItem key={m} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  <Typography sx={{fontWeight: 'bold', textAlign: 'left'}}>My Question</Typography>
                  <TextField label="Your Question" multiline rows={6} fullWidth />
                  <Button variant="contained" sx={{marginTop: 5, justifySelf: 'flex-end'}}>Submit</Button>
              </CardContent>
          </Card>
        </Stack>
          }
      </Stack>
    </div>
  );
}

export default Forum;
