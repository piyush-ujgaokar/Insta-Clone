const express=require('express')
const authUser = require('../middleware/auth.middleware')
const UserController = require('../controller/user.controller')



const userRouter=express.Router()

userRouter.post('/follow/:username',authUser,UserController.followUserController)
userRouter.post('/unfollow/:username',authUser,UserController.unfollowUserController)

module.exports=userRouter