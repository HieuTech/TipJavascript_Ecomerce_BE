const express  = require('express');
const morgan = require('morgan');
const helmet  = require("helmet");
const compression = require('compression');
const app = express();


//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())



//init db

const url =
  "mongodb+srv://rosasuongtech:hieu123@cluster0.klvcplw.mongodb.net/shopdev";
const mongoose = require("mongoose");
const carModel = require("./dbs/init.mongodb.lv0");
app.get("/", async (req, res) => {
  await mongoose.connect(url);
  let cars = await carModel.find();
  console.log(cars);
  res.send(cars);
});

// require("./dbs/init.mongodb");
// const {checkOverload} = require("./helper/check.connect")
// checkOverload();
//init routes
app.get("/",(req,res,next)=>{
    const strCompress = "Hi java Pro"
    return res.status(200).json({
        message:"Welcome Java Pro",
       
    })
})

//handling errors

module.exports = app;