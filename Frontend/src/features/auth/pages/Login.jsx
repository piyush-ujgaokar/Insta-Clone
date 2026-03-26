import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import Register from "./Register";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, user, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();

    await handleLogin(username,password)
    console.log(user);
    
    navigate('/')
  };

  if(loading){
    return (<main>
        <h1>Loading....</h1>
    </main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />
          <button type="submit" className="button primary-btn">
            Login
          </button>
        </form>
        <p>
          Don't Have An Account ? <Link to={"/register"}>Create</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
