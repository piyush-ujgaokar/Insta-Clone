import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import axios from 'axios'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLoginform(e){
        e.preventDefault()

        await axios.post('http://localhost:3000/api/auth/login',{
            username,
            password
        },{
            withCredentials:true
        }).then(res=>{
            console.log(res.data)
        })
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLoginform}>
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter Username' />
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='Enter Password' />
                <button type='submit'>Login</button>
            </form>
            <p >Don't Have An Account ? <Link className='toogleAuthForm' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login