import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FOOTER_URL } from "../../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const Dashboard = () => {
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  const [logUser, setLogUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);
  }, []);

  const handleClick = (type) => {
    if (type === "edit-profile") {
      navigate("/edit-profile");
    }

    if (type === "share-profile") {
      navigate("/share-profile");
    }

    if (type === "reset-pin") {
      navigate("/reset-pin");
    }

    if (type === "edit-links") {
      navigate("/set-profile-links");
    }

    if (type === "messages") {
      navigate("/messages");
    }

    if (type === "manage-service") {
      navigate("/manage-service");
    }

    if (type === "manage-abstract") {
      navigate("/manage-abstract");
    }

    if (type === "view-profile") {
      navigate("/" + logUser.username);
    }

    if (type === "scan-qr") {
      navigate("/scan-qr");
    }
  };

  return (
    <div style={{ minHeight: "97vh" }}>
      <div className={style.topBar}>
        <img
          src={
            logUser && logUser.profile_img
              ? logUser.profile_img
              : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          height="40px"
          width="40px"
          alt=""
        />
        <div className={style.topBarLogo}><img src={FOOTER_URL}></img></div>
      </div>
      {logUser && <div className={style.username}>Hi, {logUser.name}</div>}
      <div className="banner my-3">
        <img src={imagePath + "banner.png"} className="img-fluid" alt="" />
      </div>
      <div className="row bg-lightgrey">
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("view-profile");
          }}
        >
          <Icon.PersonCheck size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">View Profile</p>
        </div>
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("edit-profile");
          }}
        >
          <Icon.PersonGear size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">Edit Profile</p>
        </div>
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("messages");
          }}
        >
          <Icon.ChatRightDots size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">Messages</p>
        </div>
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("manage-service");
          }}
        >
          <Icon.ListUl size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">
            Manage <br /> Services
          </p>
        </div>
      </div>
      <div className="row bg-white">
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("reset-pin");
          }}
        >
          <Icon.Key size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">Edit PIN</p>
        </div>
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("share-profile");
          }}
        >
          <Icon.QrCode size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">Share Profile</p>
        </div>
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("manage-abstract");
          }}
        >
          <Icon.Clipboard size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">
            Manage
            <br />
            Abstract
          </p>
        </div>
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("edit-links");
          }}
        >
          <Icon.PersonLinesFill size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">
            Edit <br />
            Links
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mx-auto text-center">
          {logUser?.qrcode && (
            <img src={logUser.qrcode} className="img-fluid" alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
