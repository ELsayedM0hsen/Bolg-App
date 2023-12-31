import express from "express";
import { verifyToken } from "../midllware/verifyToken.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, desc, img, categories, username } = req.body;
    const newPost = await Post.create({
      title,
      desc,
      img,
      categories,
      username,
      user: req.user.id,
      
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get all posts
router.get("/", async (req, res) => {
  const query = req.query
  try {
    const searchBar = {
      title:{$regex:query.search,$options:"i"},
    }
    const posts = await Post.find(query.search?searchBar:null);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all posts for the authenticated user
router.get("/user/:userID", verifyToken, async (req, res) => {
  try {
    const userPosts = await Post.find({ user: req.user.id });
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get a specific post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Update a post by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Delete a post by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({postId:req.params.id})

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted", post: deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
