const express = require("express");
const OrderModel = require("../model/order.model");
const authMiddleware = require("../middleware/auth.middleware");
const checkAdminMiddleware = require("../middleware/checkAdmin.middleware");
const orderRouter = express.Router();
//Posting books to DB

orderRouter.post(
  "/api/order",
  authMiddleware,

  async (req, res) => {
    const { title, author, category, price, quantity } = req.body;
    try {
      const bookdata = new OrderModel({
        title,
        author,
        category,
        price,
        quantity,
      });
      await bookdata.save();
      res.status(201).send({ msg: "Book added to db Sucessfully" });
    } catch (e) {
      res.status(400).send({ msg: e.messgae });
    }
  }
);
//Getting all books from DB

orderRouter.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    const bookorder = await OrderModel.find();
    res.status(200).send(bookorder);
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});

module.exports = orderRouter;
