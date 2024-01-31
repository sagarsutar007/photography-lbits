import React, { useState, useEffect } from "react";
import styles from "./profilesetup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [logUser, setLogUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLogUser(getUser());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = logUser.id;
    if (name === "" || email === "" || state === "" || city === "") {
      setError("Please fill out all fields.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(BACKEND_URL + "/update-user", {
        name,
        email,
        state,
        city,
        userid,
      });

      if (response.data.status === "SUCCESS") {
        navigate("/set-credentials");
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="v-100 d-flex align-items-center flex-column justify-content-center">
          <h1 className="logo-text">photography.me</h1>
          <p className="mb-5 title-txt">
            Just few more details to get you started...
          </p>
          <form onSubmit={handleSubmit} className="w-100">
            <input
              type="text"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              className={`form-control mb-3 ${styles.form_control}`}
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {error && <p className="text-danger text-center fs-12">{error}</p>}
            <button className="btn btn-primary w-100">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
