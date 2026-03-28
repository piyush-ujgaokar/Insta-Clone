import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router'


const Nav = () => {

    const navigate=useNavigate()


  return (
    <nav className='nav-bar'>
        <h1>Insta</h1>
        <button onClick={()=>{navigate('/create-post')}} className='button primary-btn'>New Post</button>
    </nav>
  )
}

export default Nav