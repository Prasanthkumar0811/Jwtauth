import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/users.controller.js"
import { authmiddle } from "../middleware/auth.middleware.js"

const userouter=express.Router()

userouter.use(authmiddle)

userouter.get('/',getAllUsers)
userouter.get('/:id',getUserById)
userouter.post('/add',createUser)
userouter.put('/update/:id',updateUser)
userouter.delete('/:id',deleteUser)

export default userouter