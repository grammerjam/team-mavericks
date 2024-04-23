// Import dependencies
const express = require("express");
const authController = require("../controllers/auth.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Methods for /auth
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;