const Post = require("../models/Post");
const User = require("../models/User");

// Create Post
exports.createPost = async (req, res) => {
  console.log("Create Post function called"); // Debug log
  const { title, description, image } = req.body;
  const post = new Post({
    title,
    description,
    image,
    createdBy: req.user.userId,
  });

  try {
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "username"); // Populate with username
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Post Details
exports.getPostDetails = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "createdBy",
      "username"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.image = req.body.image || post.image;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      userId: req.user.userId,
      text: req.body.text,
    };

    // Push the comment to the post's comments array
    post.comments.push(comment);

    // Save the post with the new comment
    await post.save();

    // Find the last comment added to get its ID
    const addedComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      message: "Comment added",
      comment: {
        id: addedComment._id, // Include the comment ID
        userId: addedComment.userId,
        text: addedComment.text,
        createdAt: addedComment.createdAt, // Optionally include createdAt timestamp
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the comment in the post
    const comment = post.comments.id(req.params.commentId);
    if (!comment || comment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Remove the comment by filtering out the one with the matching ID
    post.comments = post.comments.filter(
      (c) => c._id.toString() !== req.params.commentId
    );

    // Save the post after removing the comment
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
