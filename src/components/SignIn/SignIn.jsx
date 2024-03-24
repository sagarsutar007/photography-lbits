import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import axios from "axios";
import { BACKEND_URL, LOGO_URL } from "../../utilities/constants";


const SignIn = ({ type, onOtpReceived }) => {
  document.title = type === "sign-in" ? "Login" : "Sign Up";
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const LoginPage = () => {
    const navigate = useNavigate();
   
  const handleForgotPin = () => {
    navigate(`/forgot-pin?phone=${phone}`);
  };

  return (
  
    <button onClick={handleForgotPin}>Forgot Pin</button>
  );
  };

  const handleSubmit = () => {
    if (phone === "") {
      setError("Please enter phone number");
    } else {
      if (phone.length !== 10) {
        setError("Phone number should be exactly 10 digits long");
      } else {
        setIsLoading(true);
        axios
          .post(BACKEND_URL + (type ==="sign-up"? "search-phone":"user-existance"), {
            phone: phone,
          })
          .then((response) => {
            const data = response.data;
            console.log(response.data);
            console.log("Server Response:", response); 
            console.log("Data:", data)
            if (type === "sign-in" && data.status === "SUCCESS" && data.message === "Phone number not found!" ) {
              
        
              setError("User not found. Please register first.");
             

            }else if(type === "sign-up"  && data.user_code === 'EXISTING')
            {
              console.log("User already exisit. Please go to login page.");
              window.alert("User already exisit. Please go to login page.");
         
            }
            // else if (data.status === "SUCCESS") {
            //   console.log("Navigating to Verify:");
            //   onOtpReceived(data.user_code, data.user_id);
           

            //   navigate("/verify?viewType=signin : sign up");
            
            else if (data.status === "SUCCESS") {
              console.log("Navigating to Verify:");
              const viewType = type === "sign-in" ? "signin" : type === "sign-up" ? "signup" : "";
              onOtpReceived(data.user_code, data.user_id);
              navigate(`/verify?viewType=${viewType}`);            

            } else {
              console.error("Unexpected server response:", data);
              setError("Something went wrong!");
            }
          })
          .catch((error) => {
            console.error("Error sending data:", error);
            setError("Something went wrong!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text"><img src={LOGO_URL}></img></h1>
      {type === "sign-in" && <p className="fs-5 mb-5 title-txt">Login</p>}
      {type === "sign-up" && <p className="fs-5 mb-5 title-txt">Sign Up</p>}
      <div className="form-group w-100">
        <label htmlFor="phone" className="form-group w-100 label-txt">
          Enter Your Number
        </label>
        <div className="input-group mb-3">
          <span className={`input-group-text ${style.input_group_text}`}>
            +91
          </span>
          <input
            type="number"
            id="phone"
            className={`form-control ${style.form_control}`}
            autoComplete="off"
            maxLength={10} // Add maxLength attribute
            value={phone} 
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d{0,10}$/.test(inputValue)) {
                  setPhone(inputValue);
              // setPhone(e.target.value);
              setError("");
              }
            }}
          />
        </div>
      </div>
      {error && <p className={`text-danger ${style.fs_12}`}>{error}</p>}
      <button
        className={`btn btn-primary w-100`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Continue"}
      </button>
      


      {type === "sign-up" && (
        <p className={`mt-5 ${style.footer_link}`}>
          Already have an account? <Link to="/sign-in">Log In</Link>
        </p>
      )}

      {type === "sign-in" && (
        <p className={`mt-5 ${style.footer_link}`}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      )}
    </div>
  );
};

export default SignIn;
