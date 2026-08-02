import { Link } from "react-router-dom";


function Navbar(){

return(
<nav>

<Link to="/home">
Home
</Link>

<Link to="/college">
College
</Link>

<Link to="/opportunities">
Opportunities
</Link>

<Link to="/academics">
Academics
</Link>

<Link to="/community">
Community
</Link>

<Link to="/profile">
Profile
</Link>


</nav>
)

}

export default Navbar;