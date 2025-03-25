"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditProfile() {
  const [user, setUser] = useState({});
  const [pin, setpin] = useState("");

  const router = useRouter();

  useEffect(() => {

    const email = localStorage.getItem("email");
    const fname = localStorage.getItem("fname");

    if (!email) {
      router.push('/login');
      return;
    }

    if (!fname) {
      router.push('/form');
      return;
    }

    const fetch = async () => {
      try {
        const res = await axios.get(`/api/users/email/${email}`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetch();

  }, [])

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    // console.log("ok")

    if (name === "pin") {

      if (/^\d{0,6}$/.test(value)) {
        setUser({ ...user, [name]: value });
      }
    } else if (name === "phone") {

      if (/^\d{0,10}$/.test(value)) {
        setUser({ ...user, [name]: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (user.PIN.length !== 6) {
      alert("PIN must be exactly 6 digits.");
      return;
    }
    if (user && user.Phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // console.log("Updated User Data:", user);
    try {
      const res = await axios.post("/api/update", {
        fname: user.FName,
        lname: user.LName,
        email: user.Email,
        pin: user.PIN,
        phone: user.Phone,
        state: user.State,
        city: user.City
      });
      alert("Profile updated successfully!");
    } catch (err) {
      // console.error(err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-300 to-pink-300 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black">Username</label>
            <input
              defaultValue={"not known"}
              type="text"
              name="FName"
              value={user?.FName}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* <div>
            <label className="block text-black">Password</label>
            <input
              type="password"
              name="password"
              value={user ? user.Password: "not known"}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div> */}

          <div>
            <label className="block text-black">PIN</label>
            <input
              defaultValue={"not known"}
              type="text"
              name="PIN"
              value={user?.PIN}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-black">Phone</label>
            <input
              defaultValue={"not known"}
              type="tel"
              name="Phone"
              value={user?.Phone}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-black">City</label>
            <input
              defaultValue={"not known"}
              type="text"
              name="City"
              value={user?.City}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-30 text-black p-2 rounded border border-white focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-black">State</label>
            <input
              defaultValue={"not known"}
              type="text"
              name="State"
              value={user?.State}
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
