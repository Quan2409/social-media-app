const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//secure packages
const helmet = require("helmet");
const databaseConnection = require("../src/config/database.js");

//config dotenv
dotenv.config();

// app
const app = express();
const port = process.env.PORT || 3005;

// connect mongodb;
databaseConnection();

//app.use()
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// catch  404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// handle error
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.local.error = req.app.get("env") === "development";
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "assets")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
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