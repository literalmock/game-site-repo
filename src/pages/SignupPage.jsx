import React from "react";
import "./AuthPage.css";
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
    <div className="auth-page auth-page--signup">
      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/">
            <h1>Gameverse</h1>
          </Link>
        </div>
        <form className="auth-form" onSubmit={loginRequest}>
        <h2>Signup</h2>
        <div className="auth-field">
            <label htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="Full name required" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          /> 
        </div>
        <div className="auth-field">
            <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Email required" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> 
        </div>
         <div className="auth-field">
            <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Username required" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> 
        </div>
            <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Password required" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            </div>
<div className="auth-checkbox-row">
  <input
    type="checkbox"
    id="remember"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
  <label htmlFor="remember">Remember me</label>
</div>
          <div className="auth-actions">
            <button className="auth-btn" type="submit">Signup</button>
             <p className="auth-switch">
    Already have an account? <span className="auth-switch-link"> <Link to="/login">Login</Link></span>
  </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
