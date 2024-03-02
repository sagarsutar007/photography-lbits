import { Link, useNavigate } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import avatar from "./avatar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};
const EditProfile = () => {
 
  const [logUser, setLogUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);

    const fetchData = async () => {
      try {
        const response = await axios.post(BACKEND_URL + "/get-user", {
          userid: userFromStorage.id,
        });

        if (response.data.user.profile_img == null) {
          response.data.user.profile_img = avatar;
        }
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSave = async () => {
    const userFromStorage = getUser();
    try {
      const formData = new FormData();
      formData.append("id", userFromStorage.id);
      formData.append("name", userData.name || "");
      formData.append("state", userData.state || "");
      formData.append("city", userData.city || "");
      formData.append("email", userData.email || "");
      formData.append("phone", userData.phone || "");
      formData.append("qualification", userData.qualification || "");
      formData.append("description", userData.description || "");

      const fileInput = document.getElementById("file");

      if (fileInput.files.length > 0) {
        formData.append("profile_img", fileInput.files[0]);
      }

      const response = await axios.post(
        BACKEND_URL + "/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "SUCCESS") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <Topbar prevPage={"/dashboard"} pageTitle={"Edit Profile"} />
      <div className="col-4 mx-auto">
        <div className="text-center my-2">
        <label htmlFor="file" className="profile-image-label">
          <img
            src={loading ? avatar : userData.profile_img || avatar}
            alt=""
            
            className="w-100 rounded-circle profile-image"
          />
          </label>

         
        </div>
      </div>
      <form action="#" method="post" encType="multipart/form-data">
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="name"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Name:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="name"
              id="name"
              value={loading ? "Loading..." : userData.name || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="state"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              State:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="state"
              id="state"
              value={loading ? "Loading..." : userData.state || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="city"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              City:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="city"
              id="city"
              value={loading ? "Loading..." : userData.city || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="email"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Email:
            </label>
          </div>
          <div className="col-9">
            <input
              type="email"
              name="email"
              id="email"
              value={loading ? "Loading..." : userData.email || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="phone"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Mobile:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="phone"
              id="phone"
              value={loading ? "Loading..." : userData.phone || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="file"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Profile Image:
            </label>
          </div>
          <div className="col-9">
            <input
              type="file"
              name="profile_img"
              id="file"
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="qualification"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Qualification:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="qualification"
              id="qualification"
              value={loading ? "Loading..." : userData.qualification || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="description"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Description:
            </label>
          </div>
          <div className="col-9">
            <textarea
              name="description"
              id="description"
              className="form-control bg-light-grey border-0 fs-12"
              value={loading ? "" : userData.description || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-4 ms-auto">
            <button
              type="button"
              className="btn btn-primary btn-sm w-100 mb-4 mt-1 fs-12"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
