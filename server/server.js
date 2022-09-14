import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const { PORT = 3333, MONGODB_URI = "mongodb://localhost:27017/car-rental" } =
  process.env;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

(async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    // console.log("🚀 ~ file: index.js ~ line 21 ~ conn", conn);
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(`Connection error`, err);
  }
})();

//middleware function logging req out
// app.use((req, res, next) => {
//   console.log(req.hostname);
//   next();
// });

const { Schema } = mongoose;
const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bhp: {
    type: Number,
    required: true,
  },
  avatar_url: {
    type: String,
    default: "https://static.thenounproject.com/png/449586-200.png",
  },
});

const Car = mongoose.model("Car", carSchema);

//we dont need it once we connected to db
//const cars = [];

app.get("/api/v1/cars", (req, res, next) => {
  Car.find({}).exec((err, cars) => {
    if (err) return res.status(500).send(err);

    res.status(200).json(cars);
  });
});

app.get("/api/v1/cars/:id?", (req, res, next) => {
  const carId = req.params.id;

  Car.findById({ _id: carId }).exec((err, car) => {
    if (err) return res.status(500).send(err);

    res.status(200).json(car);
  });
});

app.post("/api/v1/cars", (req, res, next) => {
  console.log(req.body);
  const newCar = new Car(req.body);

  newCar.save((err, car) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(car);
  });
});

app.put("/api/v1/cars/:id", (req, res, next) => {
  const carId = req.params.id;
  const updates = req.body;

  Car.updateOne({ _id: carId }, updates, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete("/api/v1/cars/:id?", (req, res, next) => {
  console.log(req.params.id);
  const carId = req.params.id;
  Car.remove({ _id: carId }, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

app.get("/redirect", (req, res) => {
  res.redirect("/about.html");
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
