import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,
        required:false,
        
    },
    categories:{
        type:Array,
        
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username:{
        type:String,  
    },
},{timestamps:true})

export default mongoose.model("Post",PostSchema)