import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import Topbar from "../Topbar/Topbar";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
import { useNavigate, useParams } from "react-router-dom";
const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const ViewProfile = () => {
  const [logUser, setLogUser] = useState(null);
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const { username } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = {
          username: username !== undefined ? username : "",
        };

        const response = await axios.post(
          BACKEND_URL + "/get-user",
          requestData
        );

        if (response.data.status === "SUCCESS") {
          setProfile(response.data.user);
        }

        // } else {
        //   navigate("/logout");
        // }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [username, navigate]);

  const handleClick = (type) => {
    console.log(type);
    switch (type) {
      case "whatsapp":
        window.location.href = "https://wa.me/+91" + profile.whatsapp;
        break;
      case "phone":
        window.location.href = "tel:+91" + profile.phone;
        break;
      case "email":
        window.location.href = "mailto:" + profile.email;
        break;
      case "maps":
        window.location.href = profile.maps;
        break;
      case "youtube":
        window.location.href = profile.youtube;
        break;
      case "linkedin":
        window.location.href = profile.linkedin;
        break;
      case "telegram":
        window.location.href = profile.telegram;
        break;
      case "twitter":
        window.location.href = profile.twitter;
        break;
      case "website":
        window.location.href = profile.website;
        break;
      // case "upi":
      //   window.location.href = profile.upi;
      //   break;

      default:
        break;
    }
  };
  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={"View Profile"} />
      <div className="col-4 mx-auto">
        <div className="text-center my-2">
          {profile.profile_img && (
            <img
              src={
                profile && profile.profile_img
                  ? profile.profile_img
                  : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt=""
              className="w-100 rounded-circle"
            />
          )}
        </div>
      </div>

      <div className="text-center fw-bold">{profile.name}</div>
      <div className="text-center fs-10">Medical Consultant</div>
      <p className="mt-2 fs-12 text-center">{profile.description}</p>

      <div className="row mt-2">
        {profile.whatsapp && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "whatsapp.png"}
              className="w-50"
              alt="whatsapp"
              onClick={() => {
                handleClick("whatsapp");
              }}
            />
          </div>
        )}
        {profile.phone && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "viber.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("phone");
              }}
            />
          </div>
        )}
        {profile.email && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "gmail.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("email");
              }}
            />
          </div>
        )}
        {profile.maps && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "maps.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("maps");
              }}
            />
          </div>
        )}
        {profile.youtube && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "youtube.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("youtube");
              }}
            />
          </div>
        )}
        {profile.linkedin && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "linkedin.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("linkedin");
              }}
            />
          </div>
        )}
        {profile.telegram && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "telegram.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("telegram");
              }}
            />
          </div>
        )}
        {profile.twitter && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "twitter.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("twitter");
              }}
            />
          </div>
        )}
        {profile.website && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "website.png"}
              className="w-50"
              alt="viber"
              onClick={() => {
                handleClick("website");
              }}
            />
          </div>
        )}
      </div>
      <div className="row mt-3">
        <div className="col-10 mx-auto">
          {profile.services > 0 && (
            <button
              className="btn btn-outline-primary rounded-pill w-100 fs-12 mb-3"
              onClick={(e) => {
                navigate("/" + profile.username + "/services");
              }}
            >
              Services
            </button>
          )}

          {profile.abstracts > 0 && (
            <button
              className="btn btn-outline-primary rounded-pill w-100 fs-12 mb-3"
              onClick={(e) => {
                navigate("/" + profile.username + "/abstracts");
              }}
            >
              Abstracts
            </button>
          )}
          <button
            className="btn btn-outline-primary rounded-pill w-100 fs-12"
            onClick={(e) => {
              navigate("/" + profile.username + "/send-message/");
            }}
          >
            Send Message
          </button>
        </div>
        {profile.calendly && (
          <div className="App mt-4 v-120">
            <InlineWidget url={profile.calendly} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
