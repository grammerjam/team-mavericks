// Import dependencies
const express = require("express");
const userController = require("../controllers/user.controller");

// Create a route instance
const router = express.Router();

// Configure HTTP Methods for /user
// Try out POST http://localhost:8000/register
router.post("/register", userController.register);
// Try out GET http://localhost:8000/getAllUsers
router.get("/getAllUsers", userController.getAllUsers);
// Try out GET http://localhost:8000/getUserById?id=<positive whole number>
router.get("/getUserById", userController.getUserById);
// Try out GET http://localhost:8000/getUserByUsername?username=<username value>
router.get("/getUserByUsername", userController.getUserByUsername);
// Try out GET http://localhost:8000/getUserByEmail?email=<email value>
router.get("/getUserByEmail", userController.getUserByEmail);

module.exports = router;