require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { default: mongoose } = require("mongoose");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//init db

require("./dbs/init.mongodb");

// const {checkOverload} = require("./helper/check.connect")
// checkOverload();
//init routes

app.use("/", require("./routes"));

//handling errors

module.exports = app;
