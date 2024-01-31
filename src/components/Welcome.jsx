import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store";
const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const Splash = () => {
  const [logUser, setLogUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);

    const timeoutId = setTimeout(() => {
      console.log(logUser);
      const userId = { userid: userFromStorage.id };

      dispatch(fetchUser(userId))
        .then((user) => {
          console.log("User fetched successfully", user);
        })
        .catch((error) => {
          console.error("Error fetching user", error);
        })
        .finally(() => {
          navigate("/dashboard");
        });
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, navigate]);

  return (
    <div className="v-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="logo-text mb-5">vitl.one</h1>
      <p className="subtitle-text mt-5">Welcome onboard!</p>
      <p className="subtitle-text">Your Registration is complete</p>
    </div>
  );
};

export default Splash;
