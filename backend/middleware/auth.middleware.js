import jwt from "jsonwebtoken";

const JWT_SECRET="Secret123"
export const authmiddle=(req,res,next)=>{
    const headers=req.headers.authorization
    if(!headers){
        return res.status(400).json({message:'Token is Required'})
    }
    const auth=headers.split(" ")[1]
    const decoded=jwt.verify(auth,JWT_SECRET)
    req.user=decoded
    next()
}