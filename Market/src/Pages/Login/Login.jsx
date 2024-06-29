import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import uuid

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
      navigate("/");
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      // Generate a unique ID for the user's profile document
      const uniqueID = uuidv4();

      await setDoc(doc(db, "customers", user.uid), {
        id: uniqueID,
        name: name,
        email: email,
        year_birth: "",
        education: "",
        marital_status: "",
        income: "",
        kidhome: "",
        teenhome: "",
        dt_customer: new Date().toISOString(),
        recency: "",
        complain: "",
        purchases: {
          wines: 0,
          fruits: 0,
          meat: 0,
          fish: 0,
          sweets: 0,
          gold: 0,
        },
        promotion: {
          NumDealsPurchases: 0,
          AcceptedCmp1: 0,
          AcceptedCmp2: 0,
          AcceptedCmp3: 0,
          AcceptedCmp4: 0,
          AcceptedCmp5: 0,
          Response: 0,
        },
        place: {
          NumWebPurchases: 0,
          NumCatalogPurchases: 0,
          NumStorePurchases: 0,
          NumWebVisitsMonth: 0,
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <div>
      {isLogin ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p onClick={() => setIsLogin(false)}>
            Don't have an account? Sign up
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <p onClick={() => setIsLogin(true)}>Already have an account? Login</p>
        </form>
      )}
    </div>
  );
};

export default Login;
