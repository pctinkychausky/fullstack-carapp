import jwtAuthz from "express-jwt-authz";

export const checkPermissions = jwtAuthz(["delete:products"], {
  customScopeKey: "permissions",
  // checkAllScopes: true,
});
