//require('dotenv').config()
import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import  app  from "./app.js";

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running in port :${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB CONNECTION FAILED!!!",err);
})





/*

import express from "express";

const app=express()

(async()=>{
    try{
       await  mongoose.connect(`${process.env.MOGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERR: ",error);
        throw error
       })
       app.listen (process.env.PORT,()=>{
        console.log(`App is listning on port ${process.env.PORT}`);
       })
    }catch(error){
        console.error("ERROR: ",error)
        throw err
    }
})()
*/