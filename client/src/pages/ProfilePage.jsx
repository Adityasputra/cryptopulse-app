import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = ({ match }) => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const profileId = match.params.id;

  useEffect(() => {
    axios
      .get(`/profile/${profileId}`)
      .then((response) => {
        setProfile(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setProfilePicture(response.data.profilePicture);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [profileId]);

  const handleUpdate = () => {
    axios
      .put(`/profile/${profileId}`, { name, email, profilePicture })
      .then((response) => {
        setProfile(response.data);
        setEditMode(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleDelete = () => {
    axios
      .delete(`/profile/${profileId}`)
      .then(() => {
        alert("Profile deleted");
      })
      .catch((error) => console.error("Error deleting profile:", error));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {editMode ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="Profile Picture URL"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-lg mb-4">
            <strong>Profile Picture:</strong>{" "}
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
