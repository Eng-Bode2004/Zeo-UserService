const UserControllers = require("../Controllers/UsersControllers");
const express = require("express");
const router = express.Router();

// Register User
router.post("/register", UserControllers.registerUser);





module.exports = router;