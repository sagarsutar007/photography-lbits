import React, { useState, useEffect } from "react";
import styles from "./profilesetup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import { BACKEND_URL, FOOTER_URL, LOGO_URL } from "../../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const CredentialsSetup = () => {
  const [username, setName] = useState("");
  // const [qualification, setQualification] = useState("");
  const [pin, setPin] = useState("");
  const [conf_pin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [logUser, setLogUser] = useState(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
 

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  useEffect(() => {
    setLogUser(getUser());
  }, []);
  const validateForm = () => {
    if (
      username.trim() === "" ||
      // qualification.trim() === "" ||
      pin.trim() === "" ||
      conf_pin.trim() === ""
    ) {
      setError("Please fill out all fields.");
      return false;
    }
    if (!/^\d+$/.test(pin) || !/^\d+$/.test(conf_pin)) {
      setError("Pin should be a 4-digit number.");
      return false;
    }

    if (pin.length !== 4 || conf_pin.length !== 4) {
      setError("Pin should be a 4-digit number.");
      return false;
    }

    if (pin !== conf_pin) {
      setError("Pin and confirm pin should match.");
      return false;
    }

    if (!isUsernameAvailable) {
      setError("Username is not available. Please choose another one.");
      return false;
    }

    setError("");
    return true;
  };
  const checkUsernameAvailability = async () => {
    if (username === "") {
      setIsUsernameAvailable(true); 
      return; 
    }

    try {
      const response = await axios.post(BACKEND_URL + "/check-username", {
        username,
      });
    
      setIsUsernameAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking username availability", error);
    }
  };

  const handleUsernameBlur = () => {
    checkUsernameAvailability();
  };

const handlePinChange = (e) => {
    const inputPin = e.target.value;
    if (!/^\d+$/.test(inputPin)) {
      setError("Pin should be a 4-digit number.");
    } else {
      setError("");
      setPin(inputPin);
    }
  };

  const handleConfirmPinChange = (e) => {
    const inputConfirmPin = e.target.value;
    if (!/^\d+$/.test(inputConfirmPin)) {
      setError("Pin should be a 4-digit number.");
    } else {
      setError("");
      setConfirmPin(inputConfirmPin);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const userid = logUser.id;

  
    try {
      setIsLoading(true);
      const response = await axios.post(BACKEND_URL + "/update-user", {
        username,
        // qualification,
        pin,
        userid,
      });

      if (response.data.status === "SUCCESS") {
        setCurrentStep(currentStep + 1);
        navigate("/set-profile-links");
      } else {
        setIsLoading(false);
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred. Please try again later.", error);
    }
  };
  const handleBack = () => {
    navigate(-1); 
  };
 

  return (
    <div className="container">
       <div style={{display:'flex'}}><Icon.ChevronDoubleLeft  onClick={handleBack}/>
      <div style={{marginLeft:'200px'}}>Step {currentStep}/3</div></div>
      <div className="row">
        <div className="v-100 d-flex align-items-center flex-column justify-content-center">
          <h1 className="logo-text"><img src={LOGO_URL}></img></h1>
          <p className="mb-5 title-txt">
            Just few more details to get you started...
          </p>
          <form onSubmit={handleSubmit} className="w-100">
            <input
              type="text"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Username, This will be your profile URL"
              value={username}
              onBlur={handleUsernameBlur}
              onChange={(e) => setName(e.target.value)}
            />
            {!isUsernameAvailable &&  (
              <p className="text-danger text-center fs-12">
                This username is not available. Please choose another one.
              </p>
            )}
            {/* <input
              type="text"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Qualifications"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            /> */}
             <div className={`input-group mb-3 ${styles.form_control}`} style={{ display: 'flex', flexDirection:'row' }}>
            <input
             
              type="password"
              className="form-control"
              placeholder="Set 4 Digit Login Pin"
              value={pin}
              maxLength={4}
              onChange={(e) => setPin(e.target.value)}
              
              ></input>
        </div>
        <div className={`input-group mb-3 ${styles.form_control}`}>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Login Pin"
              value={conf_pin}
              maxLength={4}
              onChange={(e) => setConfirmPin(e.target.value)}
              
            />
        </div>
            {error && <p className="text-danger text-center fs-12">{error}</p>}
            <button className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CredentialsSetup;
