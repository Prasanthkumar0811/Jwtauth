import mongoose from "mongoose";


export const mongodb=async()=>{
    const mongourl='mongodb+srv://Prasanthkumar:Prasanthkumar@cluster0.6vs0nhk.mongodb.net/express';
    await mongoose.connect(mongourl).then(()=>{
        console.log('DB Connected')
    })
}