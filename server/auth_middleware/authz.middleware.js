import dotenv from "dotenv";
import "dotenv/config";
import findConfig from "find-config";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

dotenv.config({ path: findConfig(".env") });

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env;

console.log("AUTH0_DOMAIN", AUTH0_DOMAIN);
console.log("AUTH0_AUDIENCE", AUTH0_AUDIENCE);

export const authorizeAccessToken = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});
