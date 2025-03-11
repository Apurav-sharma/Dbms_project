import React from "react";

const transactions = [
  {
    id: 1,
    date: "2023-12-20",
    description: "Grocery Shopping",
    amount: -50.0,
    paidBy: "John Doe",
    paidTo: "Supermarket XYZ",
    bank: "Chase Bank",
  },
  {
    id: 2,
    date: "2023-12-19",
    description: "Salary",
    amount: 2500.0,
    paidBy: "Tech Corp",
    paidTo: "John Doe",
    bank: "Bank of America",
  },
  {
    id: 3,
    date: "2023-12-18",
    description: "Online Purchase",
    amount: -120.5,
    paidBy: "John Doe",
    paidTo: "Amazon",
    bank: "Wells Fargo",
  },
];

const TransactionHistory = () => {
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
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/80 backdrop-blur-lg shadow-md rounded-lg p-4 border-l-4 
            hover:shadow-lg transition duration-300 ease-in-out
            border-green-500"
          >
            <p className="text-sm text-gray-500">{transaction.date}</p>
            <p className="text-lg font-semibold">{transaction.description}</p>
            <p className="text-sm">
              <span className="font-semibold">Paid By:</span> {transaction.paidBy}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Paid To:</span> {transaction.paidTo}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Bank:</span> {transaction.bank}
            </p>
            <p
              className={`text-lg font-bold ${
                transaction.amount > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {transaction.amount > 0
                ? `+${transaction.amount.toFixed(2)}`
                : `${transaction.amount.toFixed(2)}`}
            </p>
            <p
              className={`text-md font-semibold ${
                transaction.amount > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {transaction.amount > 0 ? "Received" : "Paid"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
