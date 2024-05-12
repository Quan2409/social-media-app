const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const databaseConnection = require("./src/config/database-config.js");
const errorMiddleware = require("./src/middlewares/error-middleware.js");
const indexRouter = require("./src/routes/index-routes.js");

//app
const app = express();
const port = process.env.PORT || 4000;

// connect mongodb
databaseConnection();

// config dotenv
dotenv.config();

// config static
app.use(express.static(path.join(__dirname, "src", "views")));

//app.use()
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
//use routes
app.use(indexRouter);
app.use(errorMiddleware);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
