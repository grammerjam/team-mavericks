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
// Try out GET http://localhost:8000/user/getUserById/<id value>
router.get("/getUserById/:id", userController.getUserById);
// Try out GET http://localhost:8000/user/getUserByUsername/<username value>
router.get("/getUserByUsername/:username", userController.getUserByUsername);
// Try out GET http://localhost:8000/user/getUserByEmail/<email value>
router.get("/getUserByEmail/:email", userController.getUserByEmail);
// Try out PUT http://localhost:8000/user/updateUserById/
router.put("/updateUserById", userController.updateUserById);
// Try out DELETE http://localhost:8000/user/deleteUserById
router.delete("/deleteUserById", userController.deleteUserById);

module.exports = router;