import path from "path";
import carsRouter from "./cars.router.js";
import ordersRouter from "./orders.router.js";
import dotenv from "dotenv";
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") });

const { NODE_ENV = "development" } = process.env;

export default function setupRoutes(app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";

  // Add routers (/api/v1/birds + url frag in router)
  app.use(`${API_ENDPOINT}/${API_VERSION}/cars`, carsRouter);
  app.use(`${API_ENDPOINT}/${API_VERSION}/orders`, ordersRouter);

  // Handle non-API gets
  app.get("*", (req, res) => {
    // If AJAX call indicate a miss
    if (req.xhr) {
      return res.sendStatus(404);
    }

    // Always return the SPA file in production (because no SSR)
    if (NODE_ENV === "production") {
      return res.sendFile(
        path.join(__dirname, "../../client/", "dist/index.html")
      );
    }

    // Last ditch - just redirect to root URL
    res.redirect("/");
  });

  // Handle misses for POST/PUT/PATCH/DELETE, etc.
  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
}
