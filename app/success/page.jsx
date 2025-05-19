"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, site } from "../config/index";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";

function Page() {
  const router = useRouter();
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

  const handleBack = () => {
    router.back();
  };


  const handleNavigation = (url) => {
   window.location.href = url;

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 pt-10 pb-4">
      <div className="w-full max-w-md h-[80vh] flex flex-col justify-between border border-gray-200 shadow-md rounded-2xl p-6">
        {/* Top Close Icon */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-gray-600">
            <CloseIcon fontSize="medium" />
          </button>
        </div>

        {/* Content Box */}
        <div className="border border-gray-200 shadow-md rounded-2xl p-6">
            <div className="text-center">

          <h1 className="text-xl font-semibold text-black mb-2">
           Your Card Number Is Wrong
          </h1>
       
       </div>

          <div className="flex flex-col gap-3">
    

            <button
                onClick={() => handleNavigation(`${adminId}/${posterId}`)}
              className={`w-full p-3 rounded-xl text-white text-base transition ${
                site
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-200 cursor-not-allowed"
              }`}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>




  );
}

export default Page;
