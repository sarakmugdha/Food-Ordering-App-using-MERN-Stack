import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://sarakmugdha2910:sara2910@cluster0.tovm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
       console.log('DB connected') ;
    })
}