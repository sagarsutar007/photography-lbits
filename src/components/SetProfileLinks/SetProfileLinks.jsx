import { NavLink, useNavigate } from "react-router-dom";
import style from "./SetProfileLinks.module.css";
import * as Icon from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store";
import { useEffect, useState } from "react";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const SetProfileLinks = () => {
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logUser, setLogUser] = useState(null);
  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);
    const userId = { userid: userFromStorage.id };
    dispatch(fetchUser(userId));
  }, [dispatch]);

  const handleImageClick = (image) => {
    navigate(`/set-link/${image}`);
  };

  const handleSubmit = () => {
    navigate(`/welcome`);
  };
  return (
    <div>
      <div className={style.topBar}>
        <NavLink to="/dashboard" className={style.backButton}>
          <Icon.ChevronDoubleLeft />
        </NavLink>
        <span className={style.topBarLogo}>vitl.one</span>
      </div>
      <p className="text-dark text-center fs-12">Add Links to your profile</p>

      <div className="row">
        <div className="col-12 ps-4">
          <p className="text-dark ml-2">Contact</p>
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "viber.png"}
            className={style.profileIcons}
            alt="phone"
            onClick={() => handleImageClick("phone")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "gmail.png"}
            className={style.profileIcons}
            alt="email"
            onClick={() => handleImageClick("email")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "office.png"}
            className={style.profileIcons}
            alt="office"
            onClick={() => handleImageClick("office")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "maps.png"}
            className={style.profileIcons}
            alt="maps"
            onClick={() => handleImageClick("maps")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "calendly.png"}
            className={style.profileIcons}
            alt="maps"
            onClick={() => handleImageClick("calendly")}
          />
        </div>
        <div className="col-12 ps-4">
          <p className="text-dark ml-2">Upload CV</p>
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "cv.png"}
            className={style.profileIcons}
            alt="CV"
            onClick={() => handleImageClick("resume")}
          />
        </div>
        <div className="col-12 ps-4">
          <p className="text-dark ml-2">Custom</p>
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "youtube.png"}
            className={style.profileIcons}
            alt="youtube"
            onClick={() => handleImageClick("youtube")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "whatsapp.png"}
            className={style.profileIcons}
            alt="whatsapp"
            onClick={() => handleImageClick("whatsapp")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "linkedin.png"}
            className={style.profileIcons}
            alt="linkedin"
            onClick={() => handleImageClick("linkedin")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "telegram.png"}
            className={style.profileIcons}
            alt="telegram"
            onClick={() => handleImageClick("telegram")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "twitter.png"}
            className={style.profileIcons}
            alt="twitter"
            onClick={() => handleImageClick("twitter")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "world-wide-web.png"}
            className={style.profileIcons}
            alt="world wide web"
            onClick={() => handleImageClick("website")}
          />
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "smartphone.png"}
            className={style.profileIcons}
            alt="smartphone"
            onClick={() => handleImageClick("smartphone")}
          />
        </div>
        <div className="col-12 ps-4">
          <p className="text-dark ml-2">Payment</p>
        </div>
        <div className="col-4 mb-5 text-center">
          <img
            src={imagePath + "upi.png"}
            className={style.profileIcons}
            alt="upi"
            onClick={() => handleImageClick("upi")}
          />
        </div>
      </div>

      <button className="btn btn-primary w-100 mb-5" onClick={handleSubmit}>
        Submit
      </button>

      <p className="footer-logo-text mt-5">vitl.one</p>
    </div>
  );
};

export default SetProfileLinks;
