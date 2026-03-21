const ImageKit = require("@imagekit/nodejs");
const {toFile}=require('@imagekit/nodejs')
const postModel = require("../models/post.model")
const jwt=require('jsonwebtoken');
const likeModel = require("../models/likes.model");


const imageKit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostcontroller(req,res){

    console.log(req.body,req.file);

    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided, Unauthorized Access"
        })
    }

    let decoded=null

   try{
      decoded=jwt.verify(token,process.env.JWT_SECRET )
   }catch(err){
        return rs.status(201).json({
            message:"User Not Authorized"
        })
   }
    

    const file=await imageKit.files.upload({
            file:await toFile(Buffer.from(req.file.buffer),'file'),
            fileName:"Test",
            folder:"Insta-Clone-Posts"
    })


    const post= await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    console.log(post);
    

    res.status(201).json({
        message:"Post Created Successfully",
        post
    })
}

async function getPostController(req,res){

    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }

    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Token invalid"
        })
    }

    const userId=req.user.id

    const posts=await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Post fetched Successfully",
        posts
    })

}

async function getPostDetailsController(req,res){
    const userId=req.user.id
    const postId=req.params.postId

        const token=req.cookies.token
            if(!token){
                return res.status(401).json({
                message:"Unauthorized Access"
            })
    }

    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Token invalid"
        })
    }


    const post=await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post Not found "
        })
    }

    const isValidUser=post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbedden content"
        })
    }

    return res.status(200).json({
        message:"Post fetched Successfully",
        post
    })

}   

async function likePostController(req,res){

    const username=req.user.username
    const postId=req.params.postId

    const post=await postModel.findById(postId)

    if(!post){  
        return res.status(404).json({
            message:"Post Not found"
        })
    }

    const like=await likeModel.create({
        post:postId,
        user:username
    })

    res.status(201).json({
        message:"Post Liked Successfully",
        like
    })

}

module.exports={
    createPostcontroller,
    getPostController,
    getPostDetailsController,
    likePostController
}