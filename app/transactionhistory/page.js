"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {

  const transactions = [
    {
      id: 1,
      time: "2023-12-20",
      amount: -50.0,
      another_user: "Supermarket XYZ",
      payment_method: "Chase Bank",
      status: "success",
      type: "send"
    }
  ];

  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      alert("Please login to view your transaction history");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`/api/history/${email}`);
        setTrans(res.data);
      } catch (err) {
        console.error("Error fetching transaction history", err);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (trans.length === 0) return; // Avoid unnecessary fetch

    const fetchUsers = async () => {
      try {
        const updatedTransactions = await Promise.all(
          trans.map(async (t) => {
            const res = await axios.get(`/api/users/${t.another_user}`);
            return { ...t, another_user: res.data.fname }; // Return new object (avoid state mutation)
          })
        );

        setTrans(updatedTransactions); // Set updated transaction list
      } catch (err) {
        console.error("Error fetching user details", err);
      }
    };

    fetchUsers();
  }, [trans]);


  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img2.wallspic.com/previews/4/7/3/9/0/109374/109374-frost-sky-design-azure-illustration-x750.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold text-white bg-gray-900/60 px-4 py-2 rounded-md mb-6">
        Transaction History
      </h1>

      <div className="w-full max-w-3xl space-y-4">
        {trans.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/80 backdrop-blur-lg shadow-md rounded-lg p-4 border-l-4 
            hover:shadow-lg transition duration-300 ease-in-out
            border-green-500"
          >
            <p className="text-sm text-gray-500">{transaction.time}</p>
            {/* <p className="text-lg font-semibold">{transaction.description}</p> */}
            {/* <p className="text-sm">
              <span className="font-semibold">Paid By:</span> {transaction.paidBy}
            </p> */}
            <p className="text-sm">
              <span className="font-semibold">Paid To:</span> {transaction.another_user}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Bank:</span> {transaction.payment_method}
            </p>
            <p
              className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-500"
                }`}
            >
              {transaction.amount}
            </p>
            <p
              className={`text-md font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-500"
                }`}
            >
              {transaction.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
