"use client";

import React, { useState, useEffect } from 'react'
import axios from "axios";

const Signup = () => {

  let [email, setemail] = useState('');
  let [password, setpassword] = useState('');

  // const data = await sql.query('SELECT * FROM employee');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        // console.log(email, password)
        const res = await axios.post("/api/signup", { email, password });

        console.log(res);
        if (res.status === 200 || res.status === 201) {
          alert("Signed up successfully");
          setemail('');
          setpassword('');
        } else {
          alert("Failed to sign up. Please try again");
        }
      }
      else {
        alert("please fill the details");
      }
    }
    catch (err) {
      alert('error: ' + err.message)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <h1> Login </h1> */}
        {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" value={email} autoComplete="email" onChange={(e) => { setemail(e.target.value) }} required className="block w-full border-4 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} name="password" id="password" autoComplete="current-password" required className="block w-full border-4 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;