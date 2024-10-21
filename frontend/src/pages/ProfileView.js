import React from "react";

const ProfileView = ({ onGoBack }) => {
  return (
    <div>
      <button
        onClick={onGoBack}
        className="bg-transparent border border-white py-2 px-4 mb-4 rounded-lg text-white"
      >
        Go Back
      </button>
      <h2 className="text-lg font-semibold mb-6">Profile Info</h2>
      <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg mb-4">
        Profile Info
      </button>
      <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
