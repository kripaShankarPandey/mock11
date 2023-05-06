const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
