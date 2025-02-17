"use client";

import React, { useState, useEffect } from 'react'
import axios from "axios";
import "../component_css/login.css";

const Login = () => {

  let [email, setemail] = useState('');
  let [password, setpassword] = useState('');

  // const data = await sql.query('SELECT * FROM employee');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {

        const res = await axios.post("/api/login", { email, password });

        // console.log(res);
        if (res.status === 200 || res.status === 201) {
          alert("logged in successfully");
          setemail('');
          setpassword('');
        }
        else {
          if (res.data && res.data.message) {
            alert(res.data.message);
          } else {
            alert("incorrect Credentials");
          }
        }

        // console.log(res);
      }
      else {
        alert("please fill the details");
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login">
      <div className='details'>
        <h2 className='text2'>Login to your Account</h2>
        {/* <label htmlForfor="email" className='mr-32'>Email</label> */}
        <input type="email" name="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Enter your email" className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />

        {/* <label htmlForfor="password" className='mr-32'>Password</label> */}
        <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" placeholder="Enter your password" className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input type="submit" onClick={handleSubmit} value="Login" className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className='gradient'>
        <h1>Welcome Friend</h1>
        <p>If not have account then SignUp?</p>
        <input type="submit" value="Signup" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  )
}

export default Login;