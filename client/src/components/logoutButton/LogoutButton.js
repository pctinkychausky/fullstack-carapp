import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </Button>
    )
  );
}

export default LogoutButton;
