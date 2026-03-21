const jwt=require('jsonwebtoken')

async function authUser(req,res,next){

    token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token Not provided"
        })
    }
    let decoded=null
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"User Not Authorized"
        })
    }

   req.user=decoded
    
   next()

}

module.exports=authUser