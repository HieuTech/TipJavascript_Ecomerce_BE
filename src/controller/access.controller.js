"use strict";

const AccessService = require("../services/access.service");

const {OK, CREATED} = require("../core/success.response")

class AccessController {
  signUp = async (req, res, next) => {
    
    new CREATED({
      message: "Register Success",
      metadata: await AccessService.signUp(req.body),
      options: {
        //ghi them gi do

      }
    }).send(res);
    
  };
}

module.exports = new AccessController();
