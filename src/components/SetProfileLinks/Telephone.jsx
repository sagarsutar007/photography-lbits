import { useEffect, useState } from "react";
import style from "./SetProfileLinks.module.css";
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

const Telephone = () => {
  const [logUser, setLogUser] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";

  useEffect(() => {
    setLogUser(getUser());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = logUser.id;
    if (telephone === "") {
      setError("Please fill out the field");
      return;
    }

    setError("");

    try {
      const response = await axios.post(BACKEND_URL + "/update-user", {
        telephone,
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
        src={imagePath + "office.png"}
        className={`mt-5 ${style.profileIcon}`}
        alt="phone"
      />
      <p className="text-dark mb-4">Telephone</p>
      <div className="row col-8 mx-auto">
        <div className="form-group px-0 mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 | 99388XXXXX"
          />
        </div>
        {error && <p className="text-danger text-center fs-12">{error}</p>}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Telephone;
