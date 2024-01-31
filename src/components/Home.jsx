import React from "react";
import { Link } from "react-router-dom";
const Home = (props) => {
  //check if props is false
  if (props.logout) {
    localStorage.removeItem("user");
  }
  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text">photography.me</h1>
      <div className="mt-5">
        <Link to="/sign-in" className="btn btn-outline-primary btn-sm">
          Login
        </Link>
        <Link to="/sign-up" className="btn btn-primary btn-sm ms-2">
          Register
        </Link>
        <div className="footer-logo-text">photography.me</div>
      </div>
    </div>
  );
};

export default Home;
