// Import dependencies
const express = require("express");
const authController = require("../controllers/auth.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Methods for /auth

// POST http://localhost:8000/auth/login
router.post("/login", authController.login);
// POST http://localhost:8000/auth/logout
router.post("/logout", authController.logout);

module.exports = router;