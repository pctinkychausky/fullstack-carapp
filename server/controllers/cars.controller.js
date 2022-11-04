import Car from "../models/cars/car.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

// function errorHandler(res, err) {
//   console.log(err);
//   res.status(500).send(err);
// }

export function getCar(req, res) {
  const carId = req.params.id;
  console.log("🚀 ~ file: cars.controller.js ~ line 12 ~ getCar ~ req", req);

  Car.findById({ _id: carId }).exec((err, car) => {
    if (err) return res.status(500).send(err);

    res.status(200).json(car);
  });
}

export function getCars(req, res) {
  Car.find({}).exec((err, cars) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(cars);
  });
}

export function addCar(req, res) {
  console.log("req.body", req.body);
  const newCar = new Car(req.body);

  newCar.save((err, car) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(car);
  });
}

export function updateCar(req, res) {
  const carId = req.params.id;
  const updates = req.body;

  Car.updateOne({ _id: carId }, updates, (err) => {
    if (err)
      return res
        .status(500)
        .send(err, { msg: "You called the protected endpoint!" });
    res.sendStatus(200);
  });
}

export function removeCar(req, res) {
  console.log(req.params.id);
  const carId = req.params.id;
  Car.remove({ _id: carId }, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
}
