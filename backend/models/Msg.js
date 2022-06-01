const db = require("../database/connection");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Msg = db.define("Msg", { 
  msgId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  messageInput: { 
    type: DataTypes.STRING,
    defaultValue: "no message yet",
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: "no image",
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 /*  TimeStamps: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  }, */
});

module.exports = Msg;