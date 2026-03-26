import React from "react";
import '../style/form.scss'
import { Link } from "react-router";
import Register from "./Register";



const Login = () => {

    const handleSubmit=(e)=>{
        e.preventDefault()

    }


  return (
  <main>
    <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" placeholder="Enter Username" />
            <input type="password" name='password' id="password" placeholder="Enter Password" />
            <button type="submit" className="button primary-btn">Login</button>
        </form>
        <p>Don't Have An Account ? <Link to={'/register'}>Create</Link></p>
    </div>
  </main>
);
};

export default Login;
