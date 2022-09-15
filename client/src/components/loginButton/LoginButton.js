import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => loginWithRedirect()}
      >
        Log in
      </Button>
    )
  );
}

export default LoginButton;
