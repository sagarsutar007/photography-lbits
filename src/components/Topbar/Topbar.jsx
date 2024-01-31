import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
const Topbar = (props) => {
  return (
    <div className={"top-bar"}>
      <NavLink to={props.prevPage} className={"back-button"}>
        <Icon.ChevronDoubleLeft />
      </NavLink>
      {props.pageTitle && <span className="page-title">{props.pageTitle}</span>}
      <span className={"top-bar-logo"}>vitl.one</span>
    </div>
  );
};

export default Topbar;
