import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text">photography.me</h1>
      <p className="subtitle-text">share profile simple!</p>
    </div>
  );
};

export default Splash;
