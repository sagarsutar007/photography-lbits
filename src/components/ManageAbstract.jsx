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

const ManageAbstract = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_at, setPublishedAt] = useState("");
  const [published_year, setPublishedYear] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const handleSubmit = async () => {
    if (title === "") {
      setError("Please enter title");
    } else if (description === "") {
      setError("Please enter description");
    } else {
      const formData = new FormData();
      formData.append("userid", logUser.id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("published_at", published_at);
      formData.append("published_year", published_year);
      formData.append("author", author);

      // Append each file to the form data
      images.forEach((file, index) => {
        formData.append(`abstract_img[${index}]`, file);
      });

      files.forEach((file, index) => {
        formData.append(`abstract_files[${index}]`, file);
      });

      try {
        const response = await axios.post(
          BACKEND_URL + "/add-abstract",
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
      <Topbar prevPage={"/dashboard"} pageTitle={"Manage Abstract"} />
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
          <label htmlFor="author" className="fs-12">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pub_at" className="fs-12">
            Published At
          </label>
          <input
            type="text"
            id="pub_at"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setPublishedAt(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="year" className="fs-12">
            Published Year
          </label>
          <input
            type="text"
            maxLength={4}
            id="year"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setPublishedYear(e.target.value)}
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
        <div className="form-group mb-3">
          <label htmlFor="files" className="fs-12">
            Select Files
          </label>
          <input
            type="file"
            id="files"
            multiple
            onChange={handleFilesChange}
            className="form-control bg-light-grey border-0 fs-12"
          />
        </div>
        {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
        <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
          Add Abstract
        </button>
      </div>
    </div>
  );
};

export default ManageAbstract;
