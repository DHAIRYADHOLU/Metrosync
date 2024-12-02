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

      <h3>
        Darkmode <Switch defaultChecked />
      </h3>

      <button
        className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
