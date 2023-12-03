import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";


const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//middeleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/post",postRouter);
app.use("/api/comment",commentRouter);



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`server in running in ${port}`);
});