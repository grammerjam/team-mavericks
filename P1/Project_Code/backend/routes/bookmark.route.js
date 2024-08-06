// Import dependencies
const express = require("express");
const bookmarkController = require("../controllers/bookmark.controller");

// Create a route instance
const router = express.Router();

// Configure HTTP Methods for /bookmark
// Try out POST http://localhost:8000/api/bookmark
router.post("/bookmark", bookmarkController.bookmarkItem);
// Try out GET http://localhost:8000/api/bookmarks
router.get("/bookmarks", bookmarkController.getUserBookmarks);
// Try out DELETE http://localhost:8000/api/bookmark
router.delete("/bookmark", bookmarkController.unbookmarkItem);

module.exports = router;