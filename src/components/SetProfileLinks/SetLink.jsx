import { NavLink, useParams,useNavigate } from "react-router-dom";
import style from "./SetProfileLinks.module.css";
import * as Icon from "react-bootstrap-icons";
import Phone from "./Phone";
import Email from "./Email";
import Office from "./Office";
import Url from "./Url";
import Upi from "./Upi";
import Resume from "./Resume";
import Whatsapp from "./Whatsapp";
import Telegram from "./Telegram";
import { FOOTER_URL } from "../../utilities/constants";
import Smartphone from "./Smartphone";
const SetLink = () => {
  let { type } = useParams();
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard"); // Replace "/dashboard" with the actual path of your dashboard page
  };
  return (
    <div className="v-90">
      <div className={style.topBar}>
        <NavLink to="/set-profile-links" className={style.backButton}>
          <Icon.ChevronDoubleLeft />
        </NavLink>
        <span className={style.topBarLogo}><img src={FOOTER_URL} onClick={navigateToDashboard} alt="Footer Logo" /></span>
      </div>
      {type === "phone" && <Phone />}
      {type === "email" && <Email />}
      {type === "office" && <Office />}
      {type === "maps" && (
        <Url image={"maps.png"} label={"Google Maps"} field={"maps"} />
      )}
      {type === "calendly" && (
        <Url image={"calendly.png"} label={"Calendly"} field={"calendly"} />
      )}
      {type === "resume" && <Resume />}
      {type === "youtube" && (
        <Url image={"youtube.png"} label={"YouTube"} field={"youtube"} />
      )}
      {type === "whatsapp" && <Whatsapp />}
      {type === "linkedin" && (
        <Url image={"linkedin.png"} label={"LinkedIn"} field={"linkedin"} />
      )}
      {/* {type === "telegram" && <Telegram />}
      {type === "twitter" && (
        <Url image={"twitter.png"} label={"Twitter"} field={"twitter"} />
      )} */}
      {type === "website" && (
        <Url image={"website.png"} label={"Website"} field={"website"} />
      )}
      {type === "upi" && <Upi/>}
      {type === "smartphone" && <Smartphone />}
      <div className="my-5"></div>
    </div>
  );
};

export default SetLink;
