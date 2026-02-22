import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Users2 } from "../model/user.model.js";

const JWT_SECRET="Secret123"
export const login=async(req,res)=>{
    try{
      const {email,password}=req.body
      if(!email || !password){
        return res.status(404).json({message:'Email and password is required'})
      }

      const user=await Users2.findOne({email})
      if(!user){
        return res.status(404).json({message:'Email doesn"t exists'})
      }
      const pass=await bcrypt.compare(password,user.password)
      if(!pass){
        return res.status(404).json({message:'Password not correct'})
      }

      const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'})
      res.status(200).json({
        message:'Login Successful',
        data:
        {
          token,
          id:user._id,
          name:user.name
        }
      })
    }catch(err){
       res.status(500).json({message:err.message})
    }
}