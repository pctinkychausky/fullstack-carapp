import path from "path";
import express from "express";

import {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder,
  // getOwnOrders,
  // addOwnOrder,
  // updateOwnOrder,
  // removeOwnOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router
  .get("/", getOrders)
  // .get("/:id?", getOrder)
  .post("/", addOrder)
  .put("/:id", updateOrder)
  .delete("/:id", removeOrder);
// Admin
// .get("/admin/:id?", getOrders)
// .post("/admin/", addOrder)
// .put("/admin/:id", updateOrder)
// .delete("/admin/:id", removeOrder);

export default router;
