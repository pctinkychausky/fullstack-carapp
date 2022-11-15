import express from "express";
import "./db.js";
import middlewareSetup from "./middleware.js";
import setupRoutes from "./routes/index.js";

const app = express();

middlewareSetup(app);
setupRoutes(app);

//middleware function logging req out
// app.use((req, res, next) => {
//   console.log(req.hostname);
//   next();
// });

//we dont need it once we connected to db
//const cars = [];

// app.get("/api/v1/cars", (req, res, next) => {
//   Car.find({}).exec((err, cars) => {
//     if (err) return res.status(500).send(err);

//     res.status(200).json(cars);
//   });
// });

// app.get("/api/v1/cars/:id?", (req, res, next) => {
//   const carId = req.params.id;

//   Car.findById({ _id: carId }).exec((err, car) => {
//     if (err) return res.status(500).send(err);

//     res.status(200).json(car);
//   });
// });

// app.post("/api/v1/cars", (req, res, next) => {
//   console.log(req.body);
//   const newCar = new Car(req.body);

//   newCar.save((err, car) => {
//     if (err) return res.status(500).send(err);
//     res.status(201).json(car);
//   });
// });

// app.put("/api/v1/cars/:id", (req, res, next) => {
//   const carId = req.params.id;
//   const updates = req.body;

//   Car.updateOne({ _id: carId }, updates, (err) => {
//     if (err) return res.status(500).send(err);
//     res.sendStatus(200);
//   });
// });

// app.delete("/api/v1/cars/:id?", (req, res, next) => {
//   console.log(req.params.id);
//   const carId = req.params.id;
//   Car.remove({ _id: carId }, (err) => {
//     if (err) return res.status(500).send(err);
//     res.sendStatus(204);
//   });
// });

// app.get("/redirect", (req, res) => {
//   res.redirect("/about.html");
// });

// app.use(express.static("public"));

export default app;
