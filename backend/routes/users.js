const { Router } = require("express");
const UserController = require("../controllers/UserController");
const Auth = require('../middlewares/auth');
const Validations = require("../validations");
const asyncHandler = require("../utils/asyncHandler");

const router = new Router();

// users
router.get('/', Auth.user, asyncHandler(UserController.allUsers)); 
router.post('/', Auth.user, Validations.createUser, asyncHandler(UserController.createUser)); 




module.exports = router