// src/components/Login.js
import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      alert("Logged in successfully!");
      navigate("/dashboard", { state: { name: user.email } }); // Redirect to dashboard
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email. Please sign up first.");
      } else {
        alert(error.message);
      }
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      alert("Logged in successfully with Google!");
      navigate("/dashboard", { state: { name: user.displayName || user.email } }); // Redirect to dashboard
    } catch (error) {
      console.error("Error during Google login:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">Login with Email</button>
      </form>
    </div>
  );
};

export default Login;
