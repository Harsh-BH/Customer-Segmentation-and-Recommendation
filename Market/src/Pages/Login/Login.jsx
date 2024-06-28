import React, { useState } from "react";
import styles from "./Login.module.css"; // Import your CSS module

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // Initially show login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup form

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    // For simplicity, checking hardcoded credentials
    if (email === "user@example.com" && password === "password") {
      onLogin(); // Call the onLogin function passed as prop
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Implement signup logic here
    // For simplicity, just console logging signup data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    // You can add further logic like sending signup request to server
  };

  return (
    <div className={styles["form-structor"]}>
      <div className={`${styles.signup} ${isLogin ? styles["slide-up"] : ""}`}>
        <h2
          className={styles["form-title"]}
          id="signup"
          onClick={handleSignupClick}
        >
          <span>or</span>Sign up
        </h2>
        <div className={styles["form-holder"]}>
          <input
            type="text"
            className={styles.input}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className={styles["submit-btn"]} onClick={handleSignupSubmit}>
          Sign up
        </button>
      </div>
      <div className={`${styles.login} ${!isLogin ? styles["slide-up"] : ""}`}>
        <div className={styles.center}>
          <h2
            className={styles["form-title"]}
            id="login"
            onClick={handleLoginClick}
          >
            <span>or</span>Log in
          </h2>
          <div className={styles["form-holder"]}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className={styles["submit-btn"]} onClick={handleLoginSubmit}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
