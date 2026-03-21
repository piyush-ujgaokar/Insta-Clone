const userModel=require('../models/user.model')
const authRouter=require('../routes/auth.routes')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


async function register(req,res){

    const {username,email,password,bio,profileImage}=req.body

    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

     if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user Already Exists"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hashedPassword
    })

    const token= jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'2d'})

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

async function login(req,res){
    const {username,email,password}=req.body

    const user=await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isPasswordValid=bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.satus(400).json({
            message:"Invalid email or password"
        })
    }

    const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'2d'})

    res.cookie("token",token)
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    res.status(200).json({
        message:"user logged in Successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}


module.exports={
    register,
    login
}