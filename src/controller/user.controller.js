const followModel=require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req,res){
    const followerUsername=req.user.username
    const followeeUsername=req.params.username

    if(followeeUsername === followerUsername){
        return res.status(400).json({
            message:"You Can Not follow Yourself"
        })
    }

    const isFolloweeExists=await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message:"User You Are Following Does Not Exists"
        })
    }

    const isAlreadyFollowing=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })


    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You Are Already following ${followeeUsername}`,
            follow:isAlreadyFollowing
        })
    }

    const followRecord=await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })



    res.status(201).json({
        message:`You Are Now following ${followeeUsername}`,
        follow:followRecord
    })


}

async function unfollowUserController(req,res){
        const followerUsername=req.user.username
        const followeeUsername=req.params.username

        const isUserfollowing=await followModel.findOne({
            follower:followerUsername,
            followee:followeeUsername
        })

        if(!isUserfollowing){
            return res.status(200).json({
                message:`You Are Not following ${followeeUsername}`
            })
        }

        await followModel.findByIdAndDelete(isUserfollowing._id)

        res.status(200).json({
            message:`You have Unfollowed ${followeeUsername}`
        })

}

module.exports={
    followUserController,
    unfollowUserController
}