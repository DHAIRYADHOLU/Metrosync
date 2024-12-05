import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ onGoBack }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic if necessary (e.g., clear tokens, user state)
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <button
        onClick={onGoBack}
        className="bg-transparent border border-white py-1 px-2 mb-2 rounded-md text-white flex items-center text-sm"
      >
        <KeyboardBackspaceIcon
          style={{ fontSize: "18px", marginRight: "4px" }}
        />{" "}
        {/* Smaller icon */}
      </button>
      <p className="mt-6 mb-3">
        <a href="">Settings</a>
      </p>
      <p className="mt-3 mb-3">
        <a href="">Security & Privacy</a>
      </p>
      <p className="mt-3 mb-3">
        <a href="">About app</a>
      </p>
      <button
        className="w-full bg-red-600 mt-10 text-white py-1 px-1 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
