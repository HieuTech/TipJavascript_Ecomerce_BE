'use strict'

const {Schema , model } = require("mongoose")

const DOCUMENT_NAME = "Key"
const COLLECTION_NAME = "Keys"

var keyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  publicKey:{
    type: String,
    required: true
  },

  //detech hacker đã sử dụng trái phép token này
  refreshToken:{
    type: Array,
    default: []
  }
},{
    collation: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema);