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

const Phone = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [phone, setPhone] = useState(logUser?.phone ?? "");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";


  const isPhoneNumberValid = (phoneNumber) => {
  
    const isNumeric = /^\d+$/.test(phoneNumber);

   
    const isValidIndianNumber =
      /^\+?91[6789]\d{9}$/.test(phoneNumber) || /^\d{10}$/.test(phoneNumber);

    return isNumeric && isValidIndianNumber;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPhoneNumberValid(phone)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }

    setError("");
    const userid = logUser.id;
    try {
      const response = await axios.post(BACKEND_URL + "/update-user", {
        phone,
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
        src={imagePath + "viber.png"}
        className={`mt-5 ${style.profileIcon}`}
        alt="phone"
      />
      <p className="text-dark mb-4">Phone</p>
      <div className="row col-8 mx-auto">
        <div className="form-group px-0 mb-3">
          <input
            type="numbers"
            className="form-control"
            onChange={(e) => {
              // setPhone(e.target.value)
              const inputValue = e.target.value;
            if (/^\d{0,10}$/.test(inputValue)) {
            setPhone(inputValue);
            setError("");
            }
            }}
            placeholder="+91 | 99388XXXXX"
            defaultValue={logUser.phone ?? ""}
            maxLength={10} 
          />
        </div>
        {error && <p className="text-danger text-center fs-12">{error}</p>}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {logUser.phone ? "Update" : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default Phone;
