import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FOOTER_URL, LOGO_URL } from "../../utilities/constants";

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
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);
  }, [logUser]);
  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);

    // Set tab title when component mounts
    if (userFromStorage) {
      document.title = `Welcome, ${userFromStorage.name}!`;
    } else {
      document.title = "Your Dashboard";
    }
  }, []);

  const handleClick = (type) => {
    if (type === "edit-profile") {
      navigate("/edit-profile");
    }
    if (type === "share-customer-event") {
      navigate("/share-customer-event");
    }

    if (type === "share-profile") {
      navigate("/share-profile");
    }

    if (type === "reset-pin") {
      navigate("/reset-pin");
    }

    if (type === "edit-links") {
      navigate("/set-profile-links?viewType=edit");
    }

    if (type === "messages") {
      navigate("/messages");
    }

    if (type === "manage-service") {
      navigate("/manage-service");
    }

    if (type === "manage-portfolio") {
      navigate("/manage-portfolio");
    }

    if (type === "view-profile") {
      navigate("/" + logUser.username);
    }

    if (type === "scan-qr") {
      navigate("/scan-qr");
    }
    if (type === "logout") {
     
      localStorage.removeItem("user");
      navigate("/home");
    }
  };
  const handleProfileImageClick = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <div style={{ minHeight: "97vh" }}>
      <div className={style.topBarLogo} style={{display:'flex',height:'20px',marginTop:'30px'}}><img src={LOGO_URL}></img>
      <div className={style.topBar} style={{marginLeft:'120px'}}>
      <div
            className={style.profileImageContainer}
            onClick={handleProfileImageClick}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
        <img
          src={
            logUser && logUser.profile_img
              ? logUser.profile_img
              : "https://i.postimg.cc/ryZWWrhb/pexels-omar-houchaimi-752525.jpg"
          }
          height="40px"
          width="40px"
          alt=""
        />
        {showDropdown && (
              <div className={style.dropdown}>
                <div onClick={() => handleClick("edit-profile")}>Edit Profile</div>
                <div onClick={() => handleClick("logout")}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {logUser && <div className={style.username} style={{marginTop:'15px'}}>Hi, {logUser.name}</div>}
      <div className="banner my-3">
         <img src={imagePath + "banner.jpg"} className="img-fluid" style={{borderRadius:'10px',height:'170px',width:'100%' , alignSelf: 'center'}}  alt="" />{/* */}
      </div>
      <div className="row bg-lightgrey d-flex align-items-center justify-content-center">
        <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("view-profile");
          }}
        >
          <Icon.PersonCheck size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">View Profile</p>
        </div>
        {/* <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("edit-profile");
          }}
        >
          <Icon.PersonGear size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">Edit Profile</p>
        // </div> */}


<div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("share-customer-event");
          }}
        >
          <Icon.PersonVcard size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">ShareCustomer
            <br />
            Event</p>
        </div>

           <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
         onClick={() => {
         handleClick("manage-portfolio");
         }}
        >
       
          <Icon.Clipboard size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">
            Manage
            <br />
            Portfolio
          </p>
        </div>
        {/* <div
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
        </div> */}
      </div>
      <div className="row bg-white d-flex align-items-center justify-content-center">
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
          <Icon.ShareFill size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">Share Profile</p>
        </div>
        {/* <div
          className="col-3 d-flex align-items-center justify-content-center flex-column p-3"
          onClick={() => {
            handleClick("manage-portfolio");
          }}
        >
          <Icon.Clipboard size={25} />
          <p className="fs-10 mb-0 mt-1 text-center">
            Manage
            <br />
            Portfolio
          </p>
        </div> */}
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
