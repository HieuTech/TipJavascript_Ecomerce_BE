'use strict'

const mongoose = require('mongoose');



   
const CarSchema = new mongoose.Schema({
    name:{
        type: String,

    },
    age:{
        type: Number
    }
})

const CarModel = new mongoose.model("ecomerce", CarSchema);

module.exports = CarModel;