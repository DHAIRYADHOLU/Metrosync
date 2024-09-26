import React, { useState } from "react";
import { Link } from "react-router-dom";
import googleLogo from "./assets/google.png";
import MetrosyncL from "./assets/MertosyncL.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
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
          Signup
        </h2>
        <form onSubmit={handleSignup}>
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
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none text-white hover:bg-mgray"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 border rounded-lg bg-mgray focus:outline-none text-white hover:bg-mgray"
          >
            Signup
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
        <h4 className="mt-4 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Signup;
