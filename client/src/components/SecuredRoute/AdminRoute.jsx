import React from "react";
import { Navigate } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component, children, ...props }) => {
  let authd = false;
  const { user } = useAuth0();
  if (user) {
    const role = user["http://localhost:3000/roles"];
    if (role === "admin" || "juniorStaff") {
      authd = true;
    }
  }

  const Component = withAuthenticationRequired(component);

  return (
    <>
      {authd ? (
        <Component />
      ) : (
        (
          <div>
            {alert("Sorry! No Authorization to access Admin Dashboard")}
          </div>
        ) && <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRoute;
