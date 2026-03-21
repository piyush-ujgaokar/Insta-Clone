const express=require('express')
const postController=require('../controller/post.controller')
const postRouter=express.Router()
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const authUser=require('../middleware/auth.middleware')



postRouter.post('/',upload.single("image"),authUser,postController.createPostcontroller)
postRouter.get('/',authUser,postController.getPostController)
postRouter.get('/details/:postId',authUser,postController.getPostDetailsController)

postRouter.post('/like/:postId',authUser,postController.likePostController)


module.exports=postRouter
