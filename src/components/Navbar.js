// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in, otherwise null
    });

    return () => {
      unsubscribe(); // Clean up listener on component unmount
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Reset the user state
    alert("Logged out successfully!");
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
