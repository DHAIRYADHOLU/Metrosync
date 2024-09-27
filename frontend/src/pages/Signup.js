import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import googleLogo from "./assets/google.png";
import MetrosyncL from "./assets/MertosyncL.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          email,
          password,
        });

        if (response.status === 201) {
          setSignupSuccess(true);
          console.log("Signup successful");

          // Clear form fields
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        console.error("Signup failed", error);
        setErrors({ signup: "Signup failed. Try again." });
      }
    } else {
      setSignupSuccess(false); // Reset success message if there are errors
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
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none text-white hover:bg-mgray"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none text-white hover:bg-mgray"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 border rounded-lg bg-mgray focus:outline-none text-white hover:bg-mgray"
          >
            Signup
          </button>
          {signupSuccess && (
            <p className="text-green-500 mt-4 text-center">
              Signup successful!
            </p>
          )}
          {errors.signup && (
            <p className="text-red-500 mt-4 text-center">{errors.signup}</p>
          )}
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
