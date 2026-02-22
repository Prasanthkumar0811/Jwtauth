import mongoose from "mongoose";


const users=new mongoose.Schema({
    name:{type:String,require:true},
    email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  altemail: {
    type: String,
    unique: true,
    sparse: true
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/
  },
  altphone: {
    type: String,
    unique: true,
    sparse: true,
    match: /^[0-9]{10}$/
  },

  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String },
  bankname: { type: String, required: true },
  accountHolder: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankAccountNumber: { type: String, required: true },

  username: { type: String, required: true, unique: true }, // phone
  password: { type: String, required: true },
   resetToken:String,
    resetTokenExpiry:Date,
},{timestamps:true})

export const Users2=mongoose.model("Users2",users)
