"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Form = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [accountno, setAccountNo] = useState("");
  const [ifsccode, setIfscCode] = useState("");
  const [pin, setPin] = useState("");

  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    if (!email || !password) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post("/api/registration", {
        fname,
        lname,
        phone,
        city,
        email,
        password,
        state,
        accountno,
        ifsccode,
        pin,
      });

      console.log('Registration successful:', response.message);
      sessionStorage.setItem('fname', fname);
      sessionStorage.setItem('phone', phone);
      alert("Registration successful");
      router.push("/home");

      setFname("");
      setLname("");
      setPhone("");
      setCity("");
      setState("");
      setAccountNo("");
      setIfscCode("");
      setPin("");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-95 p-8 shadow-2xl rounded-2xl w-full max-w-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "First Name", value: fname, setter: setFname, type: "text" },
            { label: "Last Name", value: lname, setter: setLname, type: "text" },
            { label: "Phone", value: phone, setter: setPhone, type: "text" },
            { label: "City", value: city, setter: setCity, type: "text" },
            { label: "State", value: state, setter: setState, type: "text" },
            {
              label: "Account No.",
              value: accountno,
              setter: setAccountNo,
              type: "text",
            },
            {
              label: "IFSC Code",
              value: ifsccode,
              setter: setIfscCode,
              type: "text",
            },
            { label: "PIN", value: pin, setter: setPin, type: "password" },
          ].map(({ label, value, setter, type }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-md"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;