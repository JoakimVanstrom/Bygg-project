const { Router } = require("express");
const TaskController = require("../controllers/TaskController");
const Auth = require('../middlewares/auth');
const Validations = require("../validations");
const asyncHandler = require("../utils/asyncHandler");

const router = new Router();

// tasks
router.get("/", Auth.user, asyncHandler(TaskController.allTasks));
router.post("/", Auth.user, Validations.createTask, asyncHandler(TaskController.createTask));
router.patch("/:id", Auth.user, Validations.updateTask, asyncHandler(TaskController.updateTask));
router.delete("/:id", Auth.user, asyncHandler(TaskController.deleteTask));
router.post("/:id/msg", Auth.user, asyncHandler(TaskController.sendMsg));


module.exports = router