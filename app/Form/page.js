"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [accountno, setAccountNo] = useState('');
  const [ifsccode, setIfscCode] = useState('');
  const [pin, setPin] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    useEffect(() => {
      const email = sessionStorage.getItem('email');
      const password = sessionStorage.getItem('password');
      if (!email || !password) {
        router.back();
        return;
      }
    }, []);

    try {

      if (!email || !fname || !lname || !phone || !accountno || !pin) {
        alert('All fields are required');
      }

      const response = await axios.post('/api/registration', {
        fname,
        lname,
        phone,
        city,
        email,
        password,
        state,
        accountno,
        ifsccode,
        pin
      });

      console.log('Registration successful:', response.message);
      sessionStorage.setItem('fname', fname);
      sessionStorage.setItem('phone', phone);
      alert("Registration successful");

      router.push('/home');

      setFname('');
      setLname('');
      setPhone('');
      setCity('');
      setState('');
      setAccountNo('');
      setIfscCode('');
      setPin('');
    } catch (error) {
      console.error('Registration failed:', error);
      alert("Registration failed: ", response.message);
    }
  };

  return (
    <div className="form relative flex items-center justify-center h-screen max-h-screen">
      <div className="details relative bg-white p-6 shadow-lg rounded-md w-[80vw] max-w-lg overflow-auto h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4 mx-auto block text-center">Registration</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="Fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter your First name"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="Lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter your Last name"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter your state"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Account No.</label>
          <input
            type="text"
            name="accountNo"
            value={accountno}
            onChange={(e) => setAccountNo(e.target.value)}
            placeholder="Enter your accountno"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={ifsccode}
            onChange={(e) => setIfscCode(e.target.value)}
            placeholder="Enter your IFSC Code"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">PIN</label>
          <input
            type="password"
            name="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your PIN"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 mx-auto block">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;