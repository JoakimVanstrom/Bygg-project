const db = require("../database/connection");
const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { InvalidCredentials, TokenExpired, Unauthorized } = require("../errors");

require("dotenv").config();

const User = db.define("User", {

  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    enum: ["worker", "admin", "client"],
    defaultValue: "client",
    allowNull: false,
  },
});

User.beforeCreate((user, option) => {
  user.password = bcrypt.hashSync(user.password, 8);
});
User.beforeUpdate((user, option) => {
  user.password = bcrypt.hashSync(user.password, 8);
});

User.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new InvalidCredentials();
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    const payload = {
      id: user.userId, // ändrat från user.id
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
  } else {
    throw new InvalidCredentials();
  }
};

User.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new TokenExpired();
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized();
    } else {
      throw err;
    }
  }
};

module.exports = User;
