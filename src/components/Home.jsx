import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import {  LOGO_URL,FOOTER_URL } from "../utilities/constants";
const Home = (props) => {
  useEffect(() => {
    // Set the tab title when the component mounts
    document.title = "Home Page";
  }, []);
  if (props.logout) {
    localStorage.removeItem("user");
  }
  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text" ><img src={LOGO_URL} ></img></h1>
      <div className="mt-5" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Link to="/sign-in" className="btn btn-outline-primary btn-sm" style={{ width: '200px' }}>
          Login
        </Link>
        <Link to="/sign-up" className="btn btn-primary btn-sm" style={{ width: '200px' }}>
          Register
        </Link>
        <div className="footer-logo-text"><img src={FOOTER_URL} ></img></div>
      </div>
    </div>
  );
};

export default Home;
