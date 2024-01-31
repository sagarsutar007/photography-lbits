import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
import style from "./SetProfileLinks.module.css";
import { useNavigate } from "react-router-dom";
const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};
const Resume = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [file, setFile] = useState(null);
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userid", logUser.id);
      const response = await axios.post(
        BACKEND_URL + "/update-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "SUCCESS") {
        navigate("/set-profile-links");
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <img
        src={imagePath + "cv.png"}
        className={`mt-5 ${style.profileIcon}`}
        alt="cv"
      />
      <p className="text-dark mb-4">Resume</p>
      <div className="row col-10 mx-auto">
        <div className="form-group px-0 mb-3">
          <input
            type="file"
            onChange={handleFileChange}
            placeholder="Choose file"
          />
        </div>
        {error && <p className="text-danger text-center fs-12">{error}</p>}
        <button className="btn btn-primary w-100" onClick={handleFileUpload}>
          {logUser.resume ? "Update" : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default Resume;
