import { useState } from "react";
// import LineWithText from "../LineWithText/LineWithText";
import { Link, useNavigate } from "react-router-dom";
import style from "./Phone.module.css";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";

const Phone = ({ type, onOtpReceived }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (phone === "") {
      setError("Please enter phone number");
    } else {
      if (phone.length !== 10) {
        setError("Phone number should be exactly 10 digits long");
      } else {
        setIsLoading(true);
        axios
          .post(BACKEND_URL + "/search-phone", {
            phone: phone,
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "SUCCESS") {
              onOtpReceived(data.user_code, data.user_id);
              navigate("/verify");
            } else {
              setError("Something went wrong!");
            }
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text">vitl.one</h1>
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
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className={`text-danger ${style.fs_12}`}>{error}</p>}
      <button
        className={`btn btn-primary w-100 ${style.btn_primary}`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Continue"}
      </button>
      {/* <LineWithText text="or continue with" /> */}
      {/* <button className={`btn btn-outline-secondary w-100 ${style.fs_12}`}>
        Sign In with Google
      </button> */}

      {type === "sign-in" && (
        <p className={`mt-5 ${style.footer_link}`}>
          Already have an account? <Link to="/sign-in">Log In</Link>
        </p>
      )}

      {type === "login" && (
        <p className={`mt-5 ${style.footer_link}`}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      )}
    </div>
  );
};

export default Phone;
