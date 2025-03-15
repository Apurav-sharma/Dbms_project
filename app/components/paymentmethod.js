"use client";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaUniversity } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { HiBanknotes } from "react-icons/hi2";

export default function TransferMoney() {
  const router = useRouter();

  const MakePayment = () => {
    localStorage.setItem("self", 0);
    router.push("/contact");
    return;
  }

  const checkBalance = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      router.push("/login");
      return;
    }

    localStorage.setItem("self", 1);
    router.push("/pin");
    return;

    // const balance = await axios.post('/api/payment', {email});

    // console.log(balance);
  }


  return (
    <div className="bg-gray-800 min-h-40 flex justify-left items-center p-4">
      <div className=" text-white p-6 rounded-lg w-full max-w-600px shadow-lg">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4"></h2>

        {/* Money Transfer Options */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <div className="bg-purple-800 p-3 rounded-full" onClick={MakePayment}>
              <FaUserAlt className="text-gray-300 text-3xl" />
            </div>
            <p className="text-xs mt-2 text-gray-300">To Mobile Number</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-800 p-3 rounded-full" onClick={MakePayment}>
              <FaUniversity className="text-gray-300 text-3xl" />
            </div>
            <p className="text-xs mt-2 text-gray-300">To Bank/ UPI ID</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-800 p-3 rounded-full" onClick={MakePayment}>
              <IoReload className="text-gray-300 text-3xl" />
            </div>
            <p className="text-xs mt-2 text-gray-300">To Self Account</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-800 p-3 rounded-full" onClick={checkBalance}>
              <HiBanknotes className="text-gray-300 text-3xl" />
            </div>
            <p className="text-xs mt-2 text-gray-300">Check Bank Balance</p>
          </div>
        </div>


        {/* UPI Lite & UPI ID Section */}
        <div className="flex justify-between items-center bg-purple-800 p-3 rounded-lg">
          <p className="text-sm">
            UPI Lite: <span className="text-blue-400 cursor-pointer">Try Now</span>
          </p>
        </div>
        <div className="flex justify-between items-center bg-purple-800 p-3 rounded-lg mt-2">
          <p className="text-sm">UPI ID: <span className="text-gray-300">8306205670@ybl</span></p>
          <button className="text-gray-300">&gt;</button>
        </div>
      </div>
    </div>
  );
}
