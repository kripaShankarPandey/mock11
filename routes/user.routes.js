const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const userRouter = express.Router();
//registering users
userRouter.post("/api/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 6);
    const newData = new UserModel({ name, email, password: hash, isAdmin });
    await newData.save();
    res.status(201).send({ msg: "User Registed Sucessfull" });
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});
//login users
userRouter.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await UserModel.findOne({ email });
    // console.log(hash, "hash");
    bcrypt.compare(password, hash.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { user_id: hash.id, admin: hash.isAdmin },
          "shhhhh"
        );
        res.status(201).send({ msg: "User login Sucessfull", token });
      } else {
        res.status(400).send({ msg: "Wrong creadentails" });
      }
    });
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});
module.exports = userRouter;
