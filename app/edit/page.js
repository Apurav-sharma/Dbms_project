"use client";

import { useState } from "react";

export default function EditProfile() {
  const [user, setUser] = useState({
    username: "john_doe",
    password: "",
    pin: "1234",
    name: "John Doe",
    phone: "123-456-7890",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-black">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-black">PIN</label>
            <input
              type="text"
              name="pin"
              value={user.pin}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-black">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
