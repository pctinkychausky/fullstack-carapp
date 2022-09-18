import path from "path";
import express from "express";

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
  .get("/:id?", getCar)
  .get("/", getCars)
  .post("/", addCar)
  .put("/:id", updateCar)
  .delete("/:id", removeCar);

export default router;
