const Users = require("../models/User");
const Tasks = require("../models/Task");

module.exports = {

  allUsers: async (req, res) => {
    if (req.user.role === "admin") {
      const users = await Users.findAll({
        attributes: { exclude: ["password"] },
      });
      res.json({ users });
    } else {
      throw new Error("You dont have permission to view all users");
    }
  },

  // Admin ska kunna skapa nya konton och kunna radera resurser
  createUser: async (req, res) => {
    if (req.user.role === "admin") {
      const user = await Users.create(req.body);
      res.json({ user });
    } else {
      throw new Error("You are not allowed to create new users");
    }
  },
};
