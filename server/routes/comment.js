import express from "express";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { verifyToken } from "../midllware/verifyToken.js";

const router = express.Router();

// Create a new comment for a post
router.post("/create/:postId", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    const newComment = new Comment({
      content,
      user: req.user.id,
      post: postId,
    });

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const savedComment = await newComment.save();
    post.comment.push(savedComment._id);
    await post.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all comments for a specific post
router.get("/post-comments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a comment by ID
router.put("/update/:commentId", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.commentId;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { content } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a comment by ID
router.delete("/delete/:commentId", verifyToken, async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment ID from the associated post
    const post = await Post.findByIdAndUpdate(
      deletedComment.post,
      { $pull: { comments: deletedComment._id } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Comment deleted", comment: deletedComment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
