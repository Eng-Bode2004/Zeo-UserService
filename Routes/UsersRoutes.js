const UserControllers = require("../Controllers/UsersControllers");
const express = require("express");
const router = express.Router();

// Register User
router.post("/register", UserControllers.registerUser);
router.put("/profile/:userId", UserControllers.uploadUserProfile);
router.put("/:userId/rule", UserControllers.assignUser);
router.post('/login', UserControllers.loginUser);
router.put('/:userId/address', UserControllers.uploadAddress);


module.exports = router;