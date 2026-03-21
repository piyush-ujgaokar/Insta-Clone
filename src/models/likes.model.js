const mongoose=require('mongoose')

const likeSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"Post Id is Required for creating like"]
    },
    user:{
        type:String,
        ref:"users",
        required:[true,"Username Id is Required for creating like"]
    }
},{
    timestamps:true
})

likeSchema.index({post:1,user:1},{unique:true})


const likeModel=mongoose.model("Like",likeSchema)


module.exports=likeModel
