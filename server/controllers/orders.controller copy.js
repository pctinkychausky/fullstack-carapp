import Order from "../models/order/order.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

// export function getOrder(req, res) {
//   let query = {};
//   if (req.params.id) {
//     query._id = req.params.id;
//   }
//   console.log("🚀 ~ file: cars.controller.js ~ line 12 ~ getCar ~ req", req);

//   Order.findById({ _id: carId }).exec((err, car) => {
//     if (err) return res.status(500).send(err);

//     res.status(200).json(car);
//   });
// }
const orders = [{ customerID: ["a123", "b123", "c123"] }];

export function getOrders(req, res) {
  Order.find({}).exec((err, orders) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(orders);
    // console.log(
    //   "🚀 ~ file: cars.controller.js ~ line 24 ~ Car.find ~ cars",
    //   cars
    // );
  });
}

// export function getOrders(req, res) {
//   let query = {};
//   if (req.params.id) {
//     query._id = req.params.id;
//   }
//   Order.find(query)
//     .populate("items")
//     .exec((err, orders) => {
//       if (err) return res.status(500).send(err);
//       if (req.params.id && orders.length === 0)
//         return res.status(404).send({ message: "No order with that ID" });
//       return res.status(200).json(orders);
//     });
// }

// export function getOwnOrders(req, res) {
//   let query = {
//     customerID: req.user.sub, // ensure own orders only
//   };

//   if (req.params.id) {
//     query._id = req.params.id;
//   }
//   Order.find(query)
//     .populate("items")
//     .exec((err, orders) => {
//       if (err) return res.status(500).send(err);
//       if (req.params.id && orders.length === 0)
//         return res.status(404).send({ message: "No order with that ID" });
//       return res.status(200).json(orders);
//     });
// }

// export function addOrder(req, res) {
//   const orderData = req.body;

//   const newOrder = new Order({ orderData });
//   newOrder.save((err, order) => {
//     if (err) return res.status(500).send(err);
//     res.status(201).json(order);
//   });
// }

export function addOrder(req, res) {
  console.log("req.body", req.body);
  const newOrder = new Order(req.body);

  newOrder.save((err, orders) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(orders);
  });
}

// export function addOwnOrder(req, res) {
//   // { items: [{}, {}], customerID: '23k42lj34278' }
//   const orderData = { ...req.body, customerID: req.user.sub };

//   const newOrder = new Order(orderData);
//   newOrder.save((err, order) => {
//     if (err) return res.status(500).send(err);
//     return res.status(201).json(order);
//   });
// }

export function updateOrder(req, res) {
  Order.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return res.status(500).send(err);
    /// change the object
    // obj.save()

    if (result.nModified === 0)
      return res.status(404).send({ message: "No order with that ID" });
    res.sendStatus(200);
  });
}

// export function updateOwnOrder(req, res) {
//   Order.updateOne(
//     { _id: req.params.id, owner: req.user.sub },
//     req.body,
//     function (err, result) {
//       if (err) return res.status(500).send(err);

//       if (result.nModified === 0)
//         return res.status(404).send({ message: "No order with that ID" });
//       res.sendStatus(200);
//     }
//   );
// }

export function removeOrder(req, res) {
  const orderId = req.params.id;
  Order.deleteOne({ _id: orderId }, function (err, report) {
    if (err) return res.status(500).send(err);

    if (orderId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No order with that ID" });
    }
    res.sendStatus(204);
  });
}

// export function removeOwnOrder(req, res) {
//   const orderId = req.params.id;
//   Order.deleteOne(
//     { _id: orderId, owner: req.user.sub },
//     function (err, report) {
//       if (err) return res.status(500).send(err);

//       if (orderId && report.deletedCount === 0) {
//         return res.status(404).send({ message: "No order with that ID" });
//       }
//       res.sendStatus(204);
//     }
//   );
// }
