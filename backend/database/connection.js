const {Sequelize} = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: 'sqlite',
    storage: "./database/ingebraDB.sqlite"
});

module.exports = db;