import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from "react-router";
import { useAuth } from '../hooks/useAuth';

const Register = () => {

    const {loading,user,handleRegister}=useAuth()
    const navigate=useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




    const handleSubmit=async (e)=>{
       e.preventDefault()

        await handleRegister(username,email,password)
        console.log(user);
        
        navigate('/')
   }

    if(loading){
    return (<main>
        <h1>Loading....</h1>
    </main>)
  }



  return (
  <main>
    <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" id="username" placeholder="Enter Username" />
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder="Enter Email Address" />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name='password' id="password" placeholder="Enter Password" />
            <button type="submit" className="button primary-btn">Register</button>
        </form>
        <p>Already Have An Account ? <Link to={'/login'}>Login</Link></p>
    </div>
  </main>
)
}

export default Register