"use client";
import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 p-6">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        <form className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="search"
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
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>


      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-6">
       
        <textarea
          className="w-full h-32 p-4 text-base border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter Contact details..."
        ></textarea>
      </div>
    </div>
  );
};

export default Contact;
