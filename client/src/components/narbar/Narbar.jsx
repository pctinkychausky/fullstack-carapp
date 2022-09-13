import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import ReactCountryFlag from "react-country-flag";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "./navbar.css";
import { display } from "@mui/system";
import { NavLink } from "react-router-dom";

function Narbar() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      white: {
        main: "#FFFFFF",
        contrastText: "#fff",
      },
      grey: {
        main: "#dddde5",
      },

      dark: {
        main: "#444560",
      },
    },
  });

  const styles = {
    paddingLeft: "0px",
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          <AppBar position="relative" color="white" sx={{ px: 8, height: 115 }}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: -3,
              }}
            >
              <NavLink to="/">
                <Typography
                  color="primary"
                  variant="h3"
                  component="div"
                  sx={{ flexGrow: 0, fontWeight: 500 }}
                >
                  Rental.com
                </Typography>{" "}
              </NavLink>

              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: 270,
                }}
              >
                <Button variant="outlined" color="primary">
                  English (UK)
                  <span className="flag">
                    <ReactCountryFlag countryCode="GB" svg></ReactCountryFlag>
                  </span>
                  £ GBP
                </Button>
                <Button variant="outlined" color="primary">
                  Log in
                </Button>
              </Typography>
            </Toolbar>
            <div style={styles}>
              <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" startIcon={<HotelOutlinedIcon />}>
                    Hotels
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DirectionsCarFilledOutlinedIcon />}
                  >
                    Car Hire
                  </Button>
                </Stack>
                <Typography color="primary">
                  <Box sx={{ fontWeight: "bold" }}>
                    Need help? Call: 01362 852288 | Open today until 5pm UK time
                  </Box>
                </Typography>
              </Stack>
            </div>
          </AppBar>
          <Stack spacing={1}>
            <Button
              color="primary"
              variant="contained"
              sx={{
                height: 70,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "50%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleOutlineIcon />
                  <Typography
                    sx={{ flexGrow: 0, fontWeight: 500 }}
                    display="inline"
                  >
                    Free Cancellation
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleOutlineIcon />
                  <Typography
                    sx={{ flexGrow: 0, fontWeight: 500 }}
                    display="inline"
                  >
                    Excess Protection
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleOutlineIcon />
                  <Typography
                    sx={{ flexGrow: 0, fontWeight: 500 }}
                    display="inline"
                  >
                    Fair Fuel Policy
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleOutlineIcon />

                  <Typography
                    sx={{ flexGrow: 0, fontWeight: 500 }}
                    display="inline"
                  >
                    24/7 Support
                  </Typography>
                </Box>
              </Box>
            </Button>
          </Stack>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default Narbar;
