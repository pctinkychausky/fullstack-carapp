import React from "react";
import "./newsletter.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import MouseIcon from "@mui/icons-material/Mouse";
import UnsubscribeOutlinedIcon from "@mui/icons-material/UnsubscribeOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function Newsletter() {
  const theme = createTheme({
    palette: {
      white: {
        main: "#FFFFFF",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <div className="master-newsletter-container">
        <div className="newsletter-container">
          <h3>
            <ThemeProvider theme={theme}>
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <UnsubscribeOutlinedIcon sx={{ fontSize: 50 }} color="white" />
              </IconButton>
            </ThemeProvider>
            Sign up to our newsletter
          </h3>
          <p>
            Join 140,000 others by signing up for car hire deals, travel tips
            and competitions.
          </p>
        </div>
        <div className="email-input-container">
          <div>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Email Address"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <MouseIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
