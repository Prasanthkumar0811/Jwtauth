import { Users2 } from "../model/user.model.js";
import crypto from "crypto";


export const forgotpass=async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({message:'Email is required'})
        }
        const user=await Users2.findOne({email})
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        const token=crypto.randomBytes(32).toString('hex')
        user.resetToken=token
        user.resetTokenExpiry=Date.now() + 15 *60 *1000;
        await user.save()
        const resetlink=`http://localhost:3000/reset-password/${token}`
        console.log('reset link :',resetlink)
        res.status(200).json({message:'Token has been sent successfully',token:token})

    }catch(err){
        res.status(404).json({message:err.message})

    }
}