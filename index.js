const express = require("express");
const app = express();
const main = require("./db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const orderRouter = require("./routes/order.routes");
app.use(express.json());
app.use("/", userRouter);
app.use("/", bookRouter);
app.use("/", orderRouter);
app.listen(8080, () => {
  console.log("Server is running on Port 8080");
});
