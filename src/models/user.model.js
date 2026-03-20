const mongoose=require('mongoose')



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"UserName is required"],
        unique:[true,"UserName is Already Exists"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email lready Exists"]
    },
    password:{
        type:String,
        required:[true,"Password Is Required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/exdlx4vvmg/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.avif"

    }
})


const userModel=mongoose.model("users",userSchema)

module.exports=userModel