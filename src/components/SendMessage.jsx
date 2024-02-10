import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const SendMessage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState(getUser());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (message === "") {
      setError("Please enter a message");
    } else {
      if (username !== logUser.id) {
        const payload = {
          userid: logUser.id,
          to_user: username,
          message: message,
        };

        try {
          const response = await axios.post(
            BACKEND_URL + "/send-message",
            JSON.stringify(payload),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = response.data;
          if (data.status === "SUCCESS") {
            navigate("/dashboard");
          } else {
            setError("Something went wrong!");
          }
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        setError("You can not send message to your own account");
      }
    }
  };

  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={"Send Message"} />
      <div className="col-12">
        <div className="form-group mb-3">
          <label htmlFor="name" className="fs-12">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={logUser.name}
            className="form-control bg-light-grey border-0 fs-12"
            readOnly
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="fs-12">
            Mobile:
          </label>
          <textarea
            id="phone"
            className="form-control bg-light-grey border-0 fs-12" style={{height:'10px'}}
            value={logUser.phone}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="msg" className="fs-12">
            Message:
          </label>
          <textarea
            id="msg"
            className="form-control bg-light-grey border-0 fs-12" style={{height:'70px'}}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
        <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
