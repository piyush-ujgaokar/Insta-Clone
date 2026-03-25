import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 async function handleFormSubmit(e){
        e.preventDefault()

       await axios.post('http://localhost:3000/api/auth/register',{
        username,
        email,
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
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" placeholder="Enter Username" />
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" placeholder="Enter Email" />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Enter Password" />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have An Account ?{" "}
          <Link className="toogleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
