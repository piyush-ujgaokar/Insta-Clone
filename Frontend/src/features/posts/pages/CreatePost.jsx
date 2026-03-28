import React, { useEffect, useRef, useState } from 'react'
import '../style/createpost.scss'
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'


const CreatePost = () => {

    const [caption, setCaption] = useState("")

    const {loading,handleCreatePost}=usePost()
    const navigate=useNavigate()

    const postImageInputFieldRef=useRef()

   const handleSubmit=async (e)=>{
        e.preventDefault()

        const file=postImageInputFieldRef.current.files[0]

        await handleCreatePost(file,caption)
            navigate('/')
    }

    if(loading){
        return (
            <main>
                <h1>Creating Post....</h1>
            </main>
        )
    }

  return (
   <div className="create-post-page">
    <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <label className='post-image-label' htmlFor="postImage">select Image</label>
            <input ref={postImageInputFieldRef} hidden type="file" name='postImage' id='postImage' />
            <input value={caption} onChange={(e)=>{setCaption(e.target.value)}} className='input' type="text" name='caption' placeholder='Enter Image Caption' />
            <button type='submit' className='button primary-btn'>Create Post</button>
        </form>
    </div>
   </div>
  )
}

export default CreatePost