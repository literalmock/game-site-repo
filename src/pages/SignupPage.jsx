import React from "react";
import "./SignupPage.css";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const [username,setUsername] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [rememberMe,setRememberMe] = React.useState(false);
  const [fullName,setFullName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const loginRequest = (e) => {
    e.preventDefault();
    console.log("Signup request sent");
  };
  
  return (
    <div className="login-page login-page--signup">
      <div className="login-container">
        <div className="logo">
          <h1>Gameverse</h1>
        </div>
        <form className="login-form" onSubmit={loginRequest}>
        <h2>Signup</h2>
        <div>
            <label htmlFor="username">Full Name</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Full name required" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          /> 
        </div>
        <div>
            <label htmlFor="username">Email</label>
          <input 
            type="text" 
            id="email" 
            placeholder="Email required" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> 
        </div>
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
            <button className="btn" type="submit">Signup</button>
             <p className="auth-switch text-[14px] mt-16 mx-auto text-center">
    Already have an account? <span className="link"> <Link to="/login">Login</Link></span>
  </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
