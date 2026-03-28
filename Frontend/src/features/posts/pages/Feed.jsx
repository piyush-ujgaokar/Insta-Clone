import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../../shared/components/Nav'



const Feed = () => {

    const {feed,handleFeed,loading}=usePost()

    useEffect(()=>{
        handleFeed()
    },[])

    if(loading || !feed){
        return (
            <main>
                <h1>Feed Is Loading.....</h1>
            </main>
        )
    }

    console.log(feed)

  return (
    <main className='feed-page'>
        <Nav/>
        <div className="feed">
            <div className="posts">
                {feed.map((post)=>{
                    return <Post user={post.user} post={post} />
                    })}
            </div>
        </div>
    </main>
  )
}

export default Feed