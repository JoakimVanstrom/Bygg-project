const Task = require("../models/Task");
const User = require("../models/User");
const Msg = require("../models/Msg");

module.exports = {

  allTasks: async (req, res) => {
    if (req.user.role === "admin") {
      const tasks = await Task.findAll({});
      res.json(tasks);
    } else if (req.user.role === "worker") {
      const tasks = await Task.findAll({ where: { workerId: req.user.id } });
      res.json(tasks);
    } else if (req.user.role === "client") {
      const tasks = await Task.findAll({ where: { clientId: req.user.id } });
       res.json(tasks);
    } else {
      throw new Error("something went wrong!");
    }
  },

  createTask: async (req, res) => {
    if (req.user.role === "client") {
      throw new Error("you dont have permission to create a task");
    } else {
      const task = await Task.create(req.body);
      res.json(task);
      console.log("task created");
    }
  },

  sendMsg: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    const messageInput = req.body.messageInput;
    const userId = req.user.id;
    if (task.clientId === userId) {
      const message = await Msg.create({ messageInput, userId, taskId: id });
      res.json("Message created successfully: " + message.messageInput);
    } else {
      throw new Error("you dont have access to this task");
    }   
  },

  updateTask: async (req, res) => {
    if (req.user.role === "client") {
      throw new Error("you dont have permission to update a task");
    }
    const { id } = req.params; 
    const task = await Task.findByPk(id);
    await task.update(req.body, { where: { id } });
    res.json(task);
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (req.user.role === "admin") {
      await task.destroy();
      res.json("task deleted");
    } else {
      throw new Error("You dont have permission to delete this task");
    }
  },
};
