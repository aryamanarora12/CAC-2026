
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
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        color: "var(--text-h)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "76px",
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo */}
          <Typography
            component={NavLink}
            to="/home"
            sx={{
              color: "var(--accent)",
              fontFamily: "var(--heading)",
              fontSize: "1.35rem",
              fontWeight: 800,
              textDecoration: "none",
              whiteSpace: "nowrap",
              mr: { xs: 1, md: 4 },
            }}
          >
            CAC Planner
          </Typography>

          {/* Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.25,
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
                  color: "var(--text)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 1,

                  "&:hover": {
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--accent)",
                  },

                  "&.active": {
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--accent)",
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
                borderRadius: "8px",
                backgroundColor: "var(--accent)",
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "var(--accent-dark)",
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