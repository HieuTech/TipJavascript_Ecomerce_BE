'use strict'

//level 1

const dev = {
  app: {
    port: process.env.PORT || 3053,
  },
  db: {
    host: process.env.HOST || "mongodb+srv",
    userName: process.env.USER_DB || "rosasuongtech",
    password: process.env.PASSWORD_DB || "hieu123",
    name: process.env.DB_NAME || "shopdev",
  },
};

const pro = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.PRO_HOST || "mongodb+srv",
    userName: process.env.PRO_USER_DB || "rosasuongtech",
    password: process.env.PRO_PASSWORD_DB || "hieu123",
    name: process.env.PRO_DB_NAME || "shopdev_pro",
  },
};
const config = { dev, pro}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]
