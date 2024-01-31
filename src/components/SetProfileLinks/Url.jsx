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

const Url = ({ field, image, label }) => {
  const [logUser, setLogUser] = useState(getUser());
  const [url, setUrl] = useState(logUser ? logUser[field] : null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";

  const isValidUrl = (inputUrl) => {
    try {
      new URL(inputUrl);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = logUser.id;
    if (field === "") {
      setError("Please fill out the field");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");

    try {
      const response = await axios.post(BACKEND_URL + "/update-user", {
        [field]: url,
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
        src={imagePath + image}
        className={`mt-5 ${style.profileIcon}`}
        alt={field}
      />
      <p className="text-dark mb-4">{label}</p>
      <div className="row col-10 mx-auto">
        <div className="form-group px-0 mb-3">
          <input
            type="url"
            className="form-control"
            onChange={(e) => setUrl(e.target.value)}
            defaultValue={url}
            placeholder="Enter URL"
          />
        </div>
        {error && <p className="text-danger text-center fs-12">{error}</p>}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {logUser[field] ? "Update" : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default Url;
