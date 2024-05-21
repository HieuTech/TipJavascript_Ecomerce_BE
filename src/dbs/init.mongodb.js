'use strict'

//trong mongodb ko can dong ket noi lien tuc
const mongoose = require('mongoose');
//kiem tra co bao nhieu connect
const { countConnect } = require("../helper/check.connect");

const connectStr =
  "mongodb+srv://rosasuongtech:hieu123@cluster0.klvcplw.mongodb.net/shopdev";

  //single ton
  class Database{

    constructor(){
        this.connect()
    }

    connect(type = 'mongodb'){
        if( 1 === 1){
            mongoose.set('debug',true)
            mongoose.set("debug", {color: true});
        }
        mongoose
          .connect(connectStr, {
            //tập hợp các kết nối CSDL mà có thể tái sử dụng.
            //Nếu trong poolsize có 50 kết nối này, nếu có kết nối cho yêu cầu mới thì nó lấy. ko thì nó sẽ tự tạo mới.
            //Nếu số lượng vượt quá 50, thì mongoose sẽ ko xử lí mà  cho yêu cầu đó vào hàng đợi, khi handle các requests xong trong 50 pools, khi có pool đc release thì nó mới nhận tiếp request mà handle.
            maxPoolSize: 50,
          })
          .then((_) => console.log("Connect success", countConnect()))
          .catch((err) => console.log("Error Connect"));
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
  }

  const instanceMongodb = Database.getInstance();
  module.exports = instanceMongodb;