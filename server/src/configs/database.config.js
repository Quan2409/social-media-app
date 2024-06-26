const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect Database Success");
  } catch (error) {
    console.log("Database Error: " + error);
  }
};

module.exports = connectDatabase;
