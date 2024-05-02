// Import dependencies
const express = require("express");
const userController = require("../controllers/user.controller");

// Create a route instance
const router = express.Router();

// Configure HTTP Methods for /user
// Try out POST http://localhost:8000/user/register
router.post("/register", userController.register);
// Try out GET http://localhost:8000/user/getAllUsers
router.get("/getAllUsers", userController.getAllUsers);
// Try out GET http://localhost:8000/user/getUserById?id=<positive whole number>
router.get("/getUserById", userController.getUserById);
// Try out GET http://localhost:8000/user/getUserByUsername?username=<username value>
router.get("/getUserByUsername", userController.getUserByUsername);
// Try out GET http://localhost:8000/user/getUserByEmail?email=<email value>
router.get("/getUserByEmail", userController.getUserByEmail);
// Try out PUT http://localhost:8000/user/updateUser?id=<id value>
router.put("/updateUser", userController.updateUser);
// Try out DELETE http://localhost:8000/user/deleteUserById
router.delete("/deleteUserById", userController.deleteUserById);

module.exports = router;