import React, { useRef, useState,useEffect } from "react";
import Styles from "./Verify.module.css";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { LOGO_URL } from "../../utilities/constants";


const Verify = ({ userId }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation(); 
  const otpBoxReference = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignInFlow = location.search.includes("viewType=signin");
  const isSignUpFlow = location.search.includes("viewType=signup");

  useEffect(() => {
    document.title = isSignInFlow ? " Login Verify " : isSignUpFlow ? "SignUp Verify " : "Verify";
  }, [isSignInFlow, isSignUpFlow]);


  function handleChange(value, index) {
    let newArr = [...otp];
    // Check if the entered value is a number
  if (!/^\d*$/.test(value)) {
    setOtpError("Please enter numbers only");
    return; // Stop further processing
  }
    newArr[index] = value;
    newArr = newArr.slice(0, 4);
    setOtpError(null); // Clear error if the entered value is a number
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
  // const handleResetPinClick = () => {
  //   // Display your custom message instead of navigating
  //   alert("Please call my contact number for resetting the pin and my number is 8801931789 ");
  // };
  const handleVerification = () => {
    const enteredOtp = parseInt(otp.join(""), 10);
    if (!otp.every((x) => x) || otp.length < 4) {
      setOtpError("Please enter a valid OTP");
    } else {
      setIsLoading(true);
      let userCredentials = { enteredOtp, userId };
      dispatch(loginUser(userCredentials)).then((result) => {
        console.log("Verification Result:", result);

        if (result.payload) {
          if (result.payload.pin === null) {
            console.log("Navigating to setup-profile");
            navigate("/setup-profile");
          } else {
            console.log("Navigating to dashboard");
            navigate("/dashboard");
          }
        } else {
          console.error("Invalid OTP or Unauthorized:", result);
          setOtpError("Invalid OTP or Unauthorized");
          setIsLoading(false);
        }
      });
    }
  };

  

  

  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text"><img src={LOGO_URL}></img></h1>
      {isSignInFlow ? (
        <p className="mb-5 title-txt">Enter code to confirm it’s you</p>
      ) : isSignUpFlow ? (
        <p className="mb-5 title-txt">Please enter OTP sent to your mobile</p>
      ) : null}


      {/* {issignin &&<p className="mb-5 title-txt">Please enter otp sent to your mobile</p> :  <p className="mb-5 title-txt">Enter code to confirm it’s you</p>} */}
      <div className="d-flex align-items-center gap-4 mb-3">
        {otp.map((digit, index) => (
          <input
            type="digit"
            key={index}
            maxLength={1}
            pattern="[0-9]*"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`p-3 rounded-md ${Styles.cell}` }
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
      {isSignInFlow && (
      //    <p className={`mt-5`}>
      //    Forget your pin: <span onClick={handleResetPinClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>Reset pin</span>
      //  </p>
      <p className={`mt-5`}>
          Forget your pin: <Link to="/forgot-pin">Reset pin</Link>
        </p>
      )}
    </div>
  );
};

export default Verify;
