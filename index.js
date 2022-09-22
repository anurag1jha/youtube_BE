import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../youtube_BE/routes/users.js"
import videoRouter from "../youtube_BE/routes/video.js"
import commentRouter from "../youtube_BE/routes/comment.js"
import authRouter from "../youtube_BE/routes/auth.js"
import cookieParser from "cookie-parser"



const app = express()
dotenv.config()


const connect = ()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connect to db")
    }).catch((err)=>{
        throw err;
    });
}

// error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);
app.use("/api/comments", commentRouter);
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

// const userRoute = require('./routes/users');
// app.use('/users',userRoute)

app.listen(8000,()=>{
    connect()
    console.log("running");
});