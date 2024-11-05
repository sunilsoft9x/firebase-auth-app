// src/components/Signup.js
import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use. Please log in instead.");
      } else {
        alert(error.message);
      }
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result); // For debugging purposes

      // Safely access additionalUserInfo
      const isNewUser = result?.additionalUserInfo?.isNewUser;

      if (isNewUser) {
        alert("Signed up with Google for the first time!");
      } else {
        alert("You are already registered and logged in with Google!");
      }
    } catch (error) {
      console.error("Error during Google signup:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <button onClick={handleGoogleSignup}>Signup with Google</button>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup with Email</button>
      </form>
    </div>
  );
};

export default Signup;
