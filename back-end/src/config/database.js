const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect Database Success");
  } catch (error) {
    console.log("Connect Database Fail" + error);
  }
};

module.exports = databaseConnection;
