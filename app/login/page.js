"use client";

import React, { useState } from 'react'
import axios from "axios";
import { motion } from "framer-motion";
import "../component_css/login.css";


const Login = () => {
  let [email, setemail] = useState('');
  let [password, setpassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        if (!isSignUp) {
          const res = await axios.post("/api/login", { email, password });

          if (res.status === 200 || res.status === 201) {
            alert("logged in successfully");
            setemail('');
            setpassword('');
          } else {
            if (res.data && res.data.message) {
              alert(res.data.message);
            } else {
              alert("incorrect Credentials");
            }
          }
        } else {
          const res = await axios.post("/api/signup", { email, password });

          // console.log(res);
          if (res.status === 200 || res.status === 201 || res.status === 202) {
            alert("Signed up successfully");
            setemail('');
            setpassword('');
          } else {
            if (res.data && res.data.message) {
              alert(res.data.message);
            } else {
              alert("Failed to sign up. Please try again");
            }
          }
        }
      }
      else {
        alert("please fill the details");
      }
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <div className="login relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* <motion.div
        animate={{ x: isSignUp ? "100%" : "0%" }}

        className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md"
      ></motion.div> */}

      <motion.div
        animate={{ x: isSignUp ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className='details relative bg-white p-10 shadow-lg rounded-md w-96 z-10'>
        <h2 className='text2'>{isSignUp ? "Sign Up" : "Login"}</h2>
        <input type="email" name="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Enter your email" className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" placeholder="Enter your password" className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input type="submit" onClick={handleSubmit} value={isSignUp ? "Sign Up" : "Login"} className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </motion.div>

      <motion.div
        animate={{ x: isSignUp ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className='gradient relative z-0 text-white p-10 rounded-md shadow-lg w-96 bg-blue-500 flex flex-col items-center justify-center'
      >
        <h1>Welcome Friend</h1>
        {isSignUp? <p>If not have account then SignUp</p>: <p> Already have account Login</p>}
        <input type="submit" value={isSignUp ? "Login" : "Signup"} onClick={toggleForm} className="bg-white text-blue-500 p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white" />
      </motion.div>
    </div>
  );
}

export default Login;
