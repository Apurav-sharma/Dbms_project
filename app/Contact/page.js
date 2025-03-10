"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

<<<<<<< HEAD
const contact = () => {
=======
const Contact = () => {

  const [users, setusers] = useState([]);
  const [search, setsearch] = useState("");

  const router = useRouter();

  const email = sessionStorage.getItem('email');
  const phone = sessionStorage.getItem('phone');
  if (!email) {
    router.push('/login');
  }

  if (!phone) {
    router.push('/form');
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/users');
        // console.log(res);
        setusers(res.data);
        // console.log(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const handlePayment = async (n, p) => {
    try {

      // console.log(n, p)

      if (p === phone) {
        alert("You cannot select this");
        return;
      }

      sessionStorage.setItem("p_name", n);
      sessionStorage.setItem("p_phone", p);

      router.push('/transaction');

    } catch (err) {
      console.error(err);
    }
  }


>>>>>>> fad9d80e1b7bcfc9e3e4e257111d758f2ceaffbd
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <form className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="search"
              value={search}
              onChange={(e) => { setsearch(e.target.value) }}
              id="default-search"
              className="w-full p-4 pl-12 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by mobile number or name..."
              required
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 19l-4-4m0-7A7 7 0 111 8a7 7 0 0114 0Z"
                />
              </svg>
            </div>
          </div>
          {/* <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button> */}
        </form>
      </div>

<<<<<<< HEAD

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-6">
       
        <textarea
          className="w-full h-32 p-4 text-base border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter contact details..."
        ></textarea>
=======
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden mt-6">
        {users.length > 0 ? (
          users.filter(({ name, phone }) => {
            if (search === "") {
              return true;
            } else {
              if (name.toLowerCase().includes(search.toLowerCase()) || phone.includes(search.toLowerCase())) {
                return true;
              } else {
                return false;
              }
            }
          }).map(({ name, phone }, index) => (
            <div
              key={index}
              onClick={() => handlePayment(name, phone)}
              className="p-4 border-b last:border-none hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">{name}</p>
                  <p className="text-sm text-gray-500">{phone}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">Loading users...</p>
        )}
>>>>>>> fad9d80e1b7bcfc9e3e4e257111d758f2ceaffbd
      </div>
    </div>
  );
};

export default contact;
