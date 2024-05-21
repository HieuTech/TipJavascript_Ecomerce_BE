"use strict";

const { model, Schema, Types } = require("mongoose");

//giông tên bảng
const DOCUMENT_NAME = "Shop";

//giống tện database
const COLLECTION_NAME = "Shops";

//!dmbg

// Declare the Schema of the Mongo model
var shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    //Shop còn hoạt động ko
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    //Shop đã đăng ký thành công chưa
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
