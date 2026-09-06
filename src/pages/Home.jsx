import Navbar from '../components/components/Global/Navbar'
import { Typography } from '@mui/material';

function Home() {

  return (
    <div className="subpage">
      <Navbar />
      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Your dashboard</p>
          <Typography component="h1" className="subpage-title">Home</Typography>
          <p className="subpage-description">Keep your college planning work organized and moving forward.</p>
        </header>
      </main>
    </div>
  );

}

export default Home;