import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import "./styles.css"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to homepage or dashboard
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      const uniqueID = uuidv4(); // Generate a unique ID for the user's profile

      await setDoc(doc(db, "customers", user.uid), {
        id: uniqueID,
        name: name,
        email: email,
        // Additional fields initialized
      });

      navigate("/"); // Redirect after successful signup
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <div className="login-container">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="form-structor">
          {isLogin ? (
            <div className="login">
              <div className="center">
                <h2 className="form-title" id="login">Log in</h2>
                <form onSubmit={handleLogin}>
                  <div className="form-holder">
                    <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <button className="submit-btn">Log in</button>
                </form>
                <p className="toggle-btn" onClick={() => setIsLogin(false)}>Don't have an account? Sign up</p>
              </div>
            </div>
          ) : (
            <div className="signup slide-up">
              <div className="center">
                <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                <form onSubmit={handleSignup}>
                  <div className="form-holder">
                    <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <button className="submit-btn">Sign up</button>
                </form>
                <p className="toggle-btn" onClick={() => setIsLogin(true)}>Already have an account? Login</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
