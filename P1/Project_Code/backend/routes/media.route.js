// Import dependencies
const express = require("express");
const mediaController = require("../controllers/media.controller");

// Create a route instance
const router = express.Router();

// Configure HTTP Methods for /media
// Try out GET http://localhost:8000/media/trending
router.get("/trending", mediaController.fetchTrendingMedia);
router.get("/search", mediaController.searchMediaItems);

module.exports = router;