"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { ConflictRequestError, BadRequestError } = require("../core/error.response");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "00001",
  EDITOR: "00002",
  ADMIN: "00003",
};

class AccessService {
  
  static signUp = async ({ name, email, password }) => {
    
    try {
      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        throw new ConflictRequestError('Error: Email Exist')
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        //thuat toan bất đối xứng
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            //Public key crypto standard
            format: "pem",
            //private enhanced mail, PEM là định dạng văn bản nên có thể truyền đi qua các giao thức ko hỗ trợ nhị phân
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

       

        console.log({ privateKey, publicKey });
        //save collection KeyStore

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });



        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString Error",
          };
        }
        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        //create token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKeyObject,
          privateKey
        );
        console.log(`Created Token Success:: AccessToken ${tokens.accessToken}
        RefreshToken ${tokens.refreshToken}
        
        `);
        return {
          code: 201,
          metadata: {
            shop: getInfoData({fields:["_id","name","email"], object: newShop}),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (err) {
      
        throw new BadRequestError("Error: Bad Request")
      
    }
  };
}

module.exports = AccessService;
