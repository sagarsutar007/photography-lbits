import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import Topbar from "../Topbar/Topbar";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
import { useNavigate, useParams } from "react-router-dom";
import Portfolio from "../Portfolio";
import { Helmet } from "react-helmet-async";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const ViewProfile = () => {
  const [logUser, setLogUser] = useState(null);
  const [highlightedIcon, setHighlightedIcon] = useState(null);
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
           // Set the tab title when the component mounts
           document.title = `${response.data.user.name}'s Profile - CHROMAGZ`;
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

  const handleIconHover = (type) => {
    setHighlightedIcon(type);
  };

  const handleIconLeave = () => {
    setHighlightedIcon(null);
  };

  const getIconStyles = (iconType) => {
    const baseStyle = { width: "50%" };

    if (highlightedIcon === iconType) {
      return { ...baseStyle, border: "2px solid #ffcc00", borderRadius: "8px" };
    }

    return baseStyle;
  };
  return (
    <div >
    { profile && 
     <Helmet>
       <title>CHROMAGZ</title>
       <meta name='description' content={profile.description} />
       <meta property="og:title" content={profile.name} />
       <meta property="og:description" content={profile.description} />
       <meta property="og:type" content={"website"} />
       <link rel="canonical" href={`https://chromagz.com/${username}`} />
     </Helmet>}
      <Topbar prevPage={"/dashboard"} pageTitle={""} />
      <div className="col-4 mx-auto">
        <div className="text-center my-2">
          {profile.profile_img && (
            <img
              src={
                profile && profile.profile_img
                  ? profile.profile_img
                  : "https://i.postimg.cc/ryZWWrhb/pexels-omar-houchaimi-752525.jpg"
              }
              alt=""
              // className="w-100 rounded-circle"
              style={{ width: '100px' }}
            />
          )}
        </div>
      </div>

      <div className="text-center fw-bold">{profile.name}</div>
      <p className="mt-2 fs-12 text-center">{profile.description}</p>

      <div className="row mt-5 d-flex justify-content-center">
        {profile.whatsapp && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "whatsapp.png"}
              style={getIconStyles("whatsapp")}
              alt="whatsapp"
              onClick={() => {
                handleClick("whatsapp");
              }}
              onMouseEnter={() => handleIconHover("whatsapp")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
        {profile.phone && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "viber.png"}
              style={getIconStyles("phone")}
              alt="viber"
              onClick={() => {
                handleClick("phone");
              }}
              onMouseEnter={() => handleIconHover("phone")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
        {profile.email && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "gmail.png"}
              style={getIconStyles("gmail")}
              alt="viber"
              onClick={() => {
                handleClick("email");
              }}
              onMouseEnter={() => handleIconHover("gmail")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
        {profile.maps && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "maps.png"}
              style={getIconStyles("maps")}
              alt="viber"
              onClick={() => {
                handleClick("maps");
              }}
              onMouseEnter={() => handleIconHover("maps")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
        {profile.youtube && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "youtube.png"}
              style={getIconStyles("youtube")}
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
              style={getIconStyles("linkedin")}
              alt="viber"
              onClick={() => {
                handleClick("linkedin");
              }}
              onMouseEnter={() => handleIconHover("linkedin")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
        {/* {profile.telegram && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "telegram.png"}
              style={getIconStyles("telegram")}
              alt="viber"
              onClick={() => {
                handleClick("telegram");
              }}
              onMouseEnter={() => handleIconHover("telegram")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )} */}
        {profile.twitter && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "twitter.png"}
              style={getIconStyles("twitter")}
              alt="viber"
              onClick={() => {
                handleClick("twitter");
              }}
              onMouseEnter={() => handleIconHover("twitter")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
        {profile.website && (
          <div className="col-3 text-center mb-4">
            <img
              src={imagePath + "website.png"}
              style={getIconStyles("website")}
              alt="viber"
              onClick={() => {
                handleClick("website");
              }}
              onMouseEnter={() => handleIconHover("website")}
              onMouseLeave={handleIconLeave}
            />
          </div>
        )}
      {/* </div>
      <div className="row mt-3"> */}
        {/* <div className="col-10 mx-auto"> */}
          {/* {profile.services > 0 && (
            <button
              className="btn btn-outline-primary rounded-pill w-100 fs-12 mb-3"
              onClick={(e) => {
                navigate("/" + profile.username + "/services");
              }}
            >
              Services
            </button>
          )} */}

          {/* {profile.abstracts > 0 && (
            <button
              className="btn btn-outline-primary rounded-pill w-100 fs-12 mb-3"
              onClick={(e) => {
                navigate("/" + profile.username + "/abstracts");
              }}
            >
              Abstracts
            </button>
          )} */}
          {/* <button
            className="btn btn-outline-primary rounded-pill w-100 fs-12"
            onClick={(e) => {
              navigate("/" + profile.username + "/send-message/");
            }}
          >
            Send Message
          </button> */}

          <Portfolio source="viewProfile" />
          


        {/* </div> */}
        {/* {profile.calendly && (
          <div className="App mt-4 v-120">
            <InlineWidget url={profile.calendly} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ViewProfile;
