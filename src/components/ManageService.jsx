import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const ManageService = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);// Changed from an array to a single file
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // const files = Array.from(e.target.files);
    // setImages(file);
    const files = Array.from(e.target.files);

    if (files.length > 1) {
      setError("Please select only one image");
      e.target.value = null;
    } else {
      setImages(files);
      setError(""); // Clear error if only one file is selected
    }

  };

  const handleSubmit = async () => {
    if (title === "") {
      setError("Please enter title");
    } else if (description === "") {
      setError("Please enter description");
    } else if (images.length !== 1) {
      setError("Please select one image");
    } else {
      const formData = new FormData();
      formData.append("userid", logUser.id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("services_img", images[0]); // Take only the first image

      // Append each file to the form data
      images.forEach((file, index) => {
        formData.append(`services_img[${index}]`, file);
      });

      try {
        const response = await axios.post(
          BACKEND_URL + "/add-service",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;
        if (data.status === "SUCCESS") {
          navigate("/dashboard");
        } else {
          setError("Something went wrong!");
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={"Manage Service"} />
      <div className="col-12">
        <div className="form-group mb-3">
          <label htmlFor="title" className="fs-12">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description" className="fs-12">
            Description
          </label>
          <textarea
            id="description"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="images" className="fs-12">
            Select Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            className="form-control bg-light-grey border-0 fs-12"
          />
        </div>
        {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
        <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
          Add Service
        </button>
      </div>
    </div>
  );
};

export default ManageService;
