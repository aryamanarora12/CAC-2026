
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Planning", path: "/college" },
    { name: "Opportunities", path: "/opportunities" },
    { name: "Academics", path: "/academics" },
    { name: "Forum", path: "/forum" },
    { name: "My Profile", path: "/profile" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#172033",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "72px",
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 5 },
          }}
        >
          {/* Logo */}
          <Typography
            component={NavLink}
            to="/home"
            sx={{
              color: "#3157d5",
              fontSize: "1.5rem",
              fontWeight: 800,
              textDecoration: "none",
              whiteSpace: "nowrap",
              mr: 4,
            }}
          >
            CAC Planner
          </Typography>

          {/* Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "#596579",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 1.5,
                  py: 1,

                  "&:hover": {
                    backgroundColor: "#eef2ff",
                    color: "#3157d5",
                  },

                  "&.active": {
                    backgroundColor: "#e8edff",
                    color: "#3157d5",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* Logout */}
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                ml: 1,
                px: 2,
                py: 1,
                borderRadius: "10px",
                backgroundColor: "#3157d5",
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "#2445b8",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}