const express=require('express')
const authController=require('../controller/auth.controller')
const authUser = require('../middleware/auth.middleware')

const authRouter=express.Router()

authRouter.post('/register',authController.register)
authRouter.post('/login',authController.login)
authRouter.get('/get-me',authUser,authController.getMe)

module.exports=authRouter