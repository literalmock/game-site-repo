import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [username,setUsername] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [rememberMe,setRememberMe] = React.useState(false);
  const loginRequest = (e) => {
    e.preventDefault();
    console.log("Login request sent");
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <h1>Gameverse</h1>
        </div>
        <form className="login-form" onSubmit={loginRequest}>
        <h2>Login</h2>
         <div>
            <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Username required" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> 
        </div>
            <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Password required" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            </div>
<div className="checkbox-row">
  <input
    type="checkbox"
    id="remember"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
  <label htmlFor="remember">Remember me</label>
</div>
          <div>
            <button className="btn" type="submit">Login</button>
             <p className="auth-switch text-[14px] mt-16 mx-auto text-center">
    New user? <span className="link"> <Link to="/signup">Signup</Link></span>
  </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
