import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FOOTER_URL } from "../../utilities/constants";
const Topbar = (props) => {
  const navigate = useNavigate();

  const handleFooterClick = () => {
    // Navigate to the dashboard page when the footer is clicked
    navigate("/dashboard");
  };
  return (
    <div className={"top-bar"}>
      <NavLink to={props.prevPage} className={"back-button"}>
        <Icon.ChevronDoubleLeft />
      </NavLink>
      {props.pageTitle && <span className="page-title">{props.pageTitle}</span>}
      <span className={"top-bar-logo"} onClick={handleFooterClick}><img src={FOOTER_URL}></img></span>
    </div>
  );
};

export default Topbar;
