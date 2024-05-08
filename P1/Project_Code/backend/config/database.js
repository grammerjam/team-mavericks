const { Sequelize } = require('sequelize');

require("dotenv").config();

// const {DATABASE, USERNAME, PASSWORD, HOST, DIALECT} = process.env;

// const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
//   host: HOST,
//   dialect: DIALECT
// });

const { DBURI } = process.env;

const sequelize = new Sequelize(DBURI);

module.exports = sequelize;
