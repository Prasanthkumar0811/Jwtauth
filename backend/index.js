import express from "express"
import { mongodb } from "./config/db.js"
import { createDefaultUser } from "./controller/defaultuser.js"
import cors from "cors";
import router from "./router/auth.router.js";
import userouter from "./router/user.router.js";

const app=express()
app.use(express.json())
app.use(cors())

await mongodb()
await createDefaultUser()

app.use('/',router)
app.use('/users',userouter)

app.listen(3000,()=>{
    console.log('Server started')
})