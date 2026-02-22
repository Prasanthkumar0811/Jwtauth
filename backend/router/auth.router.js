import express from "express"
import { login } from "../controller/login.controller.js"
import { forgotpass } from "../controller/forgotpass.js"
import { resetPassword } from "../controller/resetpass.js"

const router=express.Router()

router.post('/login',login)
router.post('/forgot',forgotpass)
router.post('/reset/:token',resetPassword)
export default router