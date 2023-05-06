const mongoose = require("mongoose");
const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kripapandey:jaymatadi@cluster0.kca0iy2.mongodb.net/bookstore"
    );
    console.log("Db connected sucessfully");
  } catch (error) {
    console.log("Db does't connected");
  }
};
main();
module.exports = main;
