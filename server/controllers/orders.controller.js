import Order from "../models/order/order.model.js";

export function getOrders(req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Order.find(query)
    .populate("items")
    .exec((err, orders) => {
      if (req.params.id && orders.length === 0)
        return res.status(404).send({ message: "No order with that ID" });
      return res.status(200).json(orders);
    });
}

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
//       if (req.params.id && orders.length === 0)
//         return res.status(404).send({ message: "No order with that ID" });
//       return res.status(200).json(orders);
//     });
// }

export function addOrder(req, res) {
  const orderData = req.body;
  const newOrder = new Order({ orderData });
  newOrder.save((err, order) => {
    return res.status(201).json(order);
  });
}

// export function addOwnOrder(req, res) {
//   // { items: [{}, {}], customerID: '23k42lj34278' }
//   const orderData = { ...req.body, customerID: req.user.sub };
//   logger.info(`orderData ${orderData}`);
//   const newOrder = new Order(orderData);
//   newOrder.save((err, order) => {
//
//     return res.status(201).json(order);
//   });
// }

export function updateOrder(req, res) {
  Order.updateOne({ _id: req.params.id }, req.body, function (err, result) {
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
//       logger.info(`result ${result}`);
//       if (result.nModified === 0)
//         return res.status(404).send({ message: "No order with that ID" });
//       res.sendStatus(200);
//     }
//   );
// }

export function removeOrder(req, res) {
  const orderId = req.params.id;
  Order.deleteOne({ _id: orderId }, function (err, report) {
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
//       logger.info(`report ${report}`);
//       if (orderId && report.deletedCount === 0) {
//         return res.status(404).send({ message: "No order with that ID" });
//       }
//       res.sendStatus(204);
//     }
//   );
// }
