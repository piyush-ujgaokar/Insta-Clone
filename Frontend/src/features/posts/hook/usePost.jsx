import { useContext, useEffect } from "react"
import { PostContext } from "../post.context"
import { createPost, getFeed } from "../services/post.api"



export const usePost=()=>{
    const context=useContext(PostContext)

    const {loading,setLoading,post,setPost,feed,setFeed}=context

    const handleCreatePost=async (imageFile,caption)=>{
        setLoading(true)

        const data=await createPost(imageFile,caption)   
        setFeed([data.post,...feed])

        setLoading(false)
    }

    const handleFeed=async ()=>{
        setLoading(true)

        const data=await getFeed()
        setFeed(data.posts)

        setLoading(false)
    }

    useEffect(()=>{
        handleFeed()
    },[])

    return {loading,feed,post,handleFeed,handleCreatePost}

}