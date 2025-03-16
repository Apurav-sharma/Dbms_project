"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from '../modal/page';

const Form = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [accountno, setAccountNo] = useState('');
  const [ifsccode, setIfscCode] = useState('');
  const [pin, setPin] = useState('');
  const [isMerchant, setIsMerchant] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setimagepath] = useState("");


  const router = useRouter();
  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    // const fname = localStorage.getItem('fname');
    if (!email || !password) {
      router.back();
      return;
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin.length !== 6 || isNaN(pin)) {
      alert('PIN must be exactly 6 digits');
      return;
    }

    if (accountno.length !== 12 || isNaN(accountno)) {
      alert('Account No. must be exactly 12 digits');
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert('Phone No. must be exactly 10 digits');
      return;
    }

    if (isMerchant) {
      setShowModal(true);
      return;
    }

    submitForm();
  };

  const submitForm = async () => {
    try {

      var uploadedImagePath = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await axios.post("/api/upload", formData);
        console.log("Upload Response:", uploadResponse.data);

        if (!uploadResponse.data.success) {
          alert("Image upload failed!");
          return;
        }
        uploadedImagePath = uploadResponse.data.path;
        setimagepath(uploadedImagePath);
      }

      if (!fname || !lname || !phone || !accountno || !pin || !uploadedImagePath) {
        alert('All fields are required');
        return;
      }


      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');

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
        pin,
        uploadedImagePath,
        isMerchant,
      });

      // console.log('Registration successful:', response.message);
      localStorage.setItem('fname', fname);
      localStorage.setItem('phone', phone);
      alert('Registration successful');

      router.push('/home');

      setFname('');
      setLname('');
      setPhone('');
      setCity('');
      setState('');
      setAccountNo('');
      setIfscCode('');
      setPin('');
      setImageLink('');
      setIsMerchant(false);
      return;
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    submitForm();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };


  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-[100vh] overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      ></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-[90vw] max-w-2xl overflow-y-auto max-h-[140vh] scrollbar-hide">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                placeholder="Enter your First name"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                placeholder="Enter your Last name"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter your phone"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                placeholder="Enter your city"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                placeholder="Enter your state"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account No.
              </label>
              <input
                type="text"
                value={accountno}
                onChange={(e) => setAccountNo(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter your account no."
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IFSC Code
              </label>
              <input
                type="text"
                value={ifsccode}
                onChange={(e) => setIfscCode(e.target.value)}
                placeholder="Enter your IFSC Code"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter your PIN"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image Link
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                placeholder="Enter image link"
                className="mt-1 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
          </div>




          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="merchantCheckbox"
              checked={isMerchant}
              onChange={(e) => setIsMerchant(e.target.checked)}
              className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="merchantCheckbox" className="text-sm text-gray-700">
              Register as Merchant
            </label>
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