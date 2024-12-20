import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "./assets/google.png";
import MetrosyncL from "./assets/MertosyncL.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call your login API here
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // If login is successful, navigate to the dashboard
      navigate("/dashboard");
    } else {
      // Handle errors (e.g., show a message)
      console.error(data.message);
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-mgray">
      <div className="bg-mlightgray p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <img
            src={MetrosyncL}
            alt="Metrosync Logo"
            className="w-12 h-12 mr-2"
          />
          <h1 className="text-3xl font-bold text-white">Metrosync</h1>
        </div>
        <h6 className="text-white text-center italic mb-4">
          Where Transit Meets Technology
        </h6>
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none text-white hover:bg-mgray"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none text-white hover:bg-mgray"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-mgray border rounded-lg focus:outline-none text-white py-2 mt-4 hover:bg-mgray"
          >
            Login
          </button>
          <button className="w-full flex items-center bg-mgray border border-gray-300 rounded-lg focus:outline-none text-white py-2 mt-4 hover:bg-mgray">
            <img
              src={googleLogo}
              alt="Google Logo"
              className="w-8 h-8 mr-2 ml-2"
            />
            <span className="flex-grow text-center">Continue with Google</span>
          </button>
        </form>
        <h4 className="mt-4 text-white text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </h4>
        <h4 className="mt-4 text-white text-center">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
