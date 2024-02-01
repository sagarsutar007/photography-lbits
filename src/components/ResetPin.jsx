import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const ResetPin = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [oldPin, setOldPin] = useState(""); // Add state for oldPin
  const [newPin, setNewPin] = useState(""); // Add state for newPin
  const [confPin, setConfPin] = useState(""); // Add state for confPin
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (oldPin === "") {
      setError("Please enter old pin");
    } else if (newPin === "") {
      setError("Please enter new pin");
    } else if (confPin === "") {
      setError("Please enter confirm pin");
    } else {
      if (newPin !== confPin) {
        setError("New Pin and Confirm Pin should match");
      } else {
        axios
          .post("http://localhost/chroma-cheer-backend/reset-pin", {
            oldPin: oldPin,
            newPin: newPin,
            confPin: confPin,
            userid: logUser.id,
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "SUCCESS") {
              navigate("/dashboard");
            } else {
              setError("Something went wrong!");
            }
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
      }
    }
  };

  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={"Reset Pin"} />
      <div className="col-10 mx-auto">
        <div className="form-group mb-3">
          <label htmlFor="old-pin" className="fs-12">
            Old Pin
          </label>
          <input
            type="password"
            id="old-pin"
            className="form-control bg-light-grey border-0 fs-12"
            maxLength={4}
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="new-pin" className="fs-12">
            New Pin
          </label>
          <input
            type="password"
            id="new-pin"
            className="form-control bg-light-grey border-0 fs-12"
            maxLength={4}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="conf-pin" className="fs-12">
            Confirm New Pin
          </label>
          <input
            type="password"
            id="conf-pin"
            className="form-control bg-light-grey border-0 fs-12"
            maxLength={4}
            value={confPin}
            onChange={(e) => setConfPin(e.target.value)}
          />
        </div>
        {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
        <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
          Reset Pin
        </button>
      </div>
    </div>
  );
};

export default ResetPin;
