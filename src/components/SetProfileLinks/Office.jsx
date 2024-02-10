import { useEffect, useState } from "react";
import style from "./SetProfileLinks.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const Office = () => {
  const [logUser, setLogUser] = useState(getUser);
  const [telephone, setOffice] = useState(logUser?.telephone ?? "");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";

  const isPhoneNumberValid = (phoneNumber) => {
    // Check if the phone number consists of only digits
    const isNumeric = /^\d+$/.test(phoneNumber);

    // Check if it's a valid Indian mobile number with or without the "+91" prefix
    const isValidIndianNumber =
      /^\+?91[6789]\d{9}$/.test(phoneNumber) || /^\d{10}$/.test(phoneNumber);

    return isNumeric && isValidIndianNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPhoneNumberValid(telephone)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }

    setError("");
    const userid = logUser.id;
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userid = logUser.id;
  //   if (telephone === "") {
  //     setError("Please fill out the field");
  //     return;
  //   }

  //   setError("");

    try {
      const response = await axios.post(BACKEND_URL + "/update-user", {
        telephone,
        userid,
      });

      if (response.data.status === "SUCCESS") {
        navigate("/set-profile-links");
      } else {
        setError("Please make changes to update");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <img
        src={imagePath + "office.png"}
        className={`mt-5 ${style.profileIcon}`}
        alt="Office"
      />
      <p className="text-dark mb-4">Office</p>
      <div className="row col-10 mx-auto">
        <div className="form-group px-0 mb-3">
          <input
            type="numbers"
            className="form-control"
            onChange={(e) => setOffice(e.target.value)}
            defaultValue={logUser.telephone}
            placeholder="+91 | 99388XXXXX"
          />
        </div>
        {error && <p className="text-danger text-center fs-12">{error}</p>}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {logUser.telephone ? "Update" : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default Office;
