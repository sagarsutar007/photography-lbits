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

const Telegram = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [telegram, setTelegram] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = logUser.id;
    if (telegram === "") {
      setError("Please fill out the field");
      return;
    }

    setError("");

    try {
      const response = await axios.post(BACKEND_URL + "/update-user", {
        telegram,
        userid,
      });

      if (response.data.status === "SUCCESS") {
        navigate("/set-profile-links");
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <img
        src={imagePath + "telegram.png"}
        className={`mt-5 ${style.profileIcon}`}
        alt="telegram"
      />
      <p className="text-dark mb-4">Telegram</p>
      <div className="row col-9 mx-auto">
        <div className="form-group px-0 mb-3">
          <input
            type="number"
            maxLength={10}
            className="form-control"
            onChange={(e) => setTelegram(e.target.value)}
            defaultValue={logUser.telegram}
            placeholder="+91 | 99388XXXXX"
          />
        </div>
        {error && <p className="text-danger text-center fs-12">{error}</p>}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {logUser.telegram ? "Update" : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default Telegram;
