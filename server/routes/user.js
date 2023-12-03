import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { verifyToken } from "../midllware/verifyToken.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


const router = express.Router();

router.get("/:id",async (req,res)=>{
    try{
        const user =await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put("/:id",verifyToken,async(req, res)=>{
    try {
        
        if(req.body.password){
            req.body.password =await bcrypt.hash(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
    }
});

router.delete("/:id",verifyToken,async(req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({user:req.params.id})
        await Comment.deleteMany({user:req.params.id})
        res.status(200).json("User has been deleted!")
    } catch (err) {
        console.log(err);
    }
});


export default router;