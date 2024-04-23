const { Sequelize } = require('sequelize');
require("dotenv").config();
const {DATABASE, USERNAME, PASSWORD, HOST, DIALECT} = process.env;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT
});

module.exports = sequelize;
