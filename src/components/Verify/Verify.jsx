import React, { useRef, useState } from "react";
import Styles from "./Verify.module.css";
// import LineWithText from "../LineWithText/LineWithText";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { LOGO_URL } from "../../utilities/constants";

const Verify = ({ userId }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const otpBoxReference = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    if (value && index < otp.length - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < otp.length - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handleVerification = () => {
    const enteredOtp = parseInt(otp.join(""), 10);
    if (!otp.every((x) => x) || otp.length < 4) {
      setOtpError("Please enter a valid OTP");
    } else {
      setIsLoading(true);
      let userCredentials = { enteredOtp, userId };
      dispatch(loginUser(userCredentials)).then((result) => {
        if (result.payload) {
          if (result.payload.pin === null) {
            navigate("/setup-profile");
          } else {
            navigate("/dashboard");
          }
        } else {
          setOtpError("Invalid OTP");
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text"><img src={LOGO_URL}></img></h1>
      <p className="mb-5 title-txt">Enter code to confirm it’s you</p>
      <div className="d-flex align-items-center gap-4 mb-3">
        {otp.map((digit, index) => (
          <input
            type="number"
            key={index}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`p-3 rounded-md ${Styles.cell}`}
          />
        ))}
      </div>
      {otpError && <p className={`text-danger ${Styles.fs_12}`}>{otpError}</p>}
      <button
        className="btn btn-primary w-100"
        onClick={handleVerification}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Verify"}
      </button>
      {/* <LineWithText text="or continue with" />
      <button className="btn btn-outline-secondary w-100 fs-12">
        Sign In with Google
      </button> */}
    </div>
  );
};

export default Verify;
