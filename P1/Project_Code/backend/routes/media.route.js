// Import dependencies
const express = require("express");
const mediaController = require("../controllers/media.controller");

// Create a route instance
const router = express.Router();

// Configure HTTP Methods for /media
// Try out GET http://localhost:8000/media/trending
router.get("/trending", mediaController.fetchTrendingMedia);
// Try out GET http://localhost:8000/media/search
router.get("/search", mediaController.searchMediaItems);
// Try out GET http://localhost:8000/media/mediaItem
router.get("/mediaItem", mediaController.fetchMediaItem);

module.exports = router;