import React, { useState, useEffect } from "react";
import styles from "./profilesetup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, FOOTER_URL } from "../../utilities/constants";

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
  const [qualification, setQualification] = useState("");
  const [pin, setPin] = useState("");
  const [conf_pin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [logUser, setLogUser] = useState(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLogUser(getUser());
  }, []);

  const checkUsernameAvailability = async () => {
    if (username === "") {
      return; // No need to check if the username is empty
    }

    try {
      const response = await axios.post(BACKEND_URL + "/check-username", {
        username,
      });
      console.log(response.data.available);
      setIsUsernameAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking username availability", error);
    }
  };

  const handleUsernameBlur = () => {
    checkUsernameAvailability();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = logUser.id;
    if (
      username === "" ||
      qualification === "" ||
      pin === "" ||
      conf_pin === ""
    ) {
      setError("Please fill out all fields.");
      return;
    }

    if (pin !== conf_pin) {
      setError("Pin and confirm pin should match");
      return;
    }

    setError("");

    const isAvailable = isUsernameAvailable;

    if (!isAvailable) {
      setError("Username is not available. Please choose another one.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(BACKEND_URL + "/update-user", {
        username,
        qualification,
        pin,
        userid,
      });

      if (response.data.status === "SUCCESS") {
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

  return (
    <div className="container">
      <div className="row">
        <div className="v-100 d-flex align-items-center flex-column justify-content-center">
          <h1 className="logo-text"><img src={FOOTER_URL}></img></h1>
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
            <input
              type="text"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Qualifications"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            <input
              type="number"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Set 4 Digit Login Pin"
              value={pin}
              maxLength={4}
              onChange={(e) => setPin(e.target.value)}
            />
            <input
              type="number"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Confirm Login Pin"
              value={conf_pin}
              maxLength={4}
              onChange={(e) => setConfirmPin(e.target.value)}
            />
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
