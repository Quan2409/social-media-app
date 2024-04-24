const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect database success");
  } catch (error) {
    console.log("database error: " + error);
  }
};

module.exports = databaseConnection;
