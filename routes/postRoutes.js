const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostDetails,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
} = require("../controllers/postController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

// Protected routes
router.post("/", AuthMiddleware, createPost); // Create post
router.get("/", getAllPosts); // Get all posts
router.get("/:id", getPostDetails); // Get post details
router.put("/:id", AuthMiddleware, updatePost); // Update post
router.delete("/:id", AuthMiddleware, deletePost); // Delete post
router.post("/:id/comments", AuthMiddleware, addComment); // Add comment
router.delete("/:postId/comments/:commentId", AuthMiddleware, deleteComment); // Delete comment

module.exports = router;
