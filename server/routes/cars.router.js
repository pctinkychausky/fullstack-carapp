import path from "path";
import express from "express";
import { checkPermissions } from "../auth_middleware/permissions.middleware.js";
import { authorizeAccessToken } from "../auth_middleware/authz.middleware.js";
import {
  getCar,
  getCars,
  addCar,
  updateCar,
  removeCar,
  // getOwnBirds,
  // addOwnBird,
  // updateOwnBird,
  // removeOwnBird,
} from "../controllers/cars.controller.js";

const router = express.Router();

router
  .get("/", getCars)
  .get("/:id?", getCar)
  .post("/", addCar)
  .put("/:id", updateCar)
  .delete("/:id", authorizeAccessToken, checkPermissions, removeCar);

export default router;
