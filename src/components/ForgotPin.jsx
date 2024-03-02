import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const ForgotPin = () => {
  // const [logUser, setLogUser] = useState(null);
  // const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [newPin, setNewPin] = useState("");
  // const [confPin, setConfPin] = useState("");
  // const [enteredOtp, setEnteredOtp] = useState(""); 
  // const [error, setError] = useState("");
  // const [otpError, setOtpError] = useState(null);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const initialPhone = queryParams.get("phone") || "";
  // const isNumeric = (value) => /^\d+$/.test(value);

  // useEffect(() => {
  //   setLogUser(getUser());
  //   setPhone(initialPhone);
  // }, [initialPhone]); 

  // const getUser = () => {
  //   let user = localStorage.getItem("user");
  //   if (user) {
  //     user = JSON.parse(user);
  //   } else {
  //     user = null;
  //   }
  //   return user;
  // };

  // const handleGenerateOTP = async () => {
  //   try {
  //     const response = await axios.post(BACKEND_URL + "auth", {
  //       phone: phone,
  //     });

  //     if (response.data.status === "SUCCESS") {
  //       setOtp(response.data.otp);
  //       setOtpError(null);
  //     } else {
  //       setOtpError("Failed to generate OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error generating OTP:", error);
  //     setOtpError("Failed to generate OTP. Please try again.");
  //   }
  // };

  // const handleVerifyOTP = () => {
  //   if (otp === "") {
  //     setOtpError("Please enter OTP");
  //   } else if (otp !== enteredOtp) {
  //     setOtpError("Incorrect OTP");
  //   } else {
  //     setOtpError(null);
  //   }
  // };

  // const handleSubmit = () => {
   
  //   if (!isNumeric(phone) || phone.length !== 10) {
  //     setError("Please enter a valid 10-digit phone number.");
  //     return;
  //   }

 
  //   if (!isNumeric(newPin) || !isNumeric(confPin)) {
  //     setError("New Pin and Confirm Pin should contain only numbers.");
  //     return;
  //   }

  //   if (newPin === "") {
  //     setError("Please enter new pin");
  //   } else if (confPin === "") {
  //     setError("Please enter confirm pin");
  //   } else if (newPin !== confPin) {
  //     setError("New Pin and Confirm Pin should match");
  //   } else if (otpError) {
  //     setError("Please verify the OTP");
  //   } else {
     
  //     axios
  //       .post(BACKEND_URL + "/reset-pin", {
  //         phone: phone,
  //         newPin: newPin,
  //         userid: logUser.id,
  //       })
  //       .then((response) => {
  //         const data = response.data;
  //         if (data.status === "SUCCESS") {
  //           navigate("/dashboard");
  //         } else {
  //           setError("Failed to reset pin. Please try again.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error sending data:", error);
  //       });
  //   }
  // };

  return (
    <div className="v-100" style={{marginTop:'50%',textAlign:'center',justifyContent:'center'}}>
      <p>"Please call my contact number for resetting the pin and my number is  "</p>
      <a href="tel:8801931789">8801931789</a>
    </div>
    
  );
};

export default ForgotPin;



// <div className="v-95">
    //   <h4 style={{ textAlign: "center", color: "#678983" }}>Forgot Pin</h4>
    //   <div className="col-10 mx-auto">
    //     <div className="form-group mb-3">
    //       <label htmlFor="phone" className="fs-12">
    //         Phone Number:
    //       </label>
    //       <input
    //         type="tel"
    //         id="phone"
    //         className="form-control bg-light-grey border-0 fs-12"
    //         maxLength={10}
    //         value={phone}
    //         onChange={(e) => setPhone(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group mb-3">
    //       <label htmlFor="otp" className="fs-12">
    //         Enter OTP:
    //       </label>
    //       <div className="input-group">
    //         <input
    //           type="text"
    //           id="otp"
    //           className="form-control bg-light-grey border-0 fs-12"
    //           maxLength={4}
    //           value={otp}
    //           onChange={(e) => setOtp(e.target.value)}
    //         />
    //         <div className="input-group-append">
    //           <button
    //             className="btn btn-primary btn-sm w-100"
                
    //             onClick={handleGenerateOTP}
    //           >
    //             Generate OTP
    //           </button>
    //         </div>
    //       </div>
    //       {otpError && (
    //         <p className="text-danger text-center fs-12 mb-3">{otpError}</p>
    //       )}
    //     </div>
    //     <div className="form-group mb-3">
    //       <label htmlFor="new-pin" className="fs-12">
    //         New Pin:
    //       </label>
    //       <input
    //         type="password"
    //         id="new-pin"
    //         className="form-control bg-light-grey border-0 fs-12"
    //         maxLength={4}
    //         value={newPin}
    //         onChange={(e) => setNewPin(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group mb-3">
    //       <label htmlFor="conf-pin" className="fs-12">
    //         Confirm New Pin:
    //       </label>
    //       <input
    //         type="password"
    //         id="conf-pin"
    //         className="form-control bg-light-grey border-0 fs-12"
    //         maxLength={4}
    //         value={confPin}
    //         onChange={(e) => setConfPin(e.target.value)}
    //       />
    //     </div>
    //     {error && (
    //       <p className="text-danger text-center fs-12 mb-3">{error}</p>
    //     )}
    //     <button
    //       className="btn btn-primary btn-sm w-100"
    //       onClick={handleVerifyOTP}
    //     >
    //       Verify OTP
    //     </button>
    //     <button
    //       className="btn btn-primary btn-sm w-100 mt-3"
    //       onClick={handleSubmit}
    //     >
    //       Reset Pin
    //     </button>
    //   </div>
    // </div>
