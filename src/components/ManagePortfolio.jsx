import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import VideoPlayer from "./VideoPlayer";
import { Youtube } from "react-bootstrap-icons";

const getUser = () => {
    let user = localStorage.getItem("user");
  
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  };
  const ManagePortfolio = () => {
    const [logUser, setLogUser] = useState(getUser());
    
    const [event, setEvent] = useState("");
    const [location, setLocation] = useState("");
    const [eventdate, setEventDate] = useState("");

    const [eventdescription, setEventDescription] = useState("");
    const [Youtubeurls, setYoutubeURLs] = useState("");
    const [images, setImages] = useState([]);
    
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    // const handleImageChange = (e) => {
    //   const files = Array.from(e.target.files);
    //   setImages(files);
    // };
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
  
      if (files.length > 6) {
        setError("Upload only 6 images.");
        e.target.value = null;
      } else {
        setImages(files);
        setError(""); // Clear error if images are within the limit
      }
    };
    const extractYoutubeVideoId = (url) => {
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeUrlRegex);

  if (match && match[5]) {
    // match[5] contains the video ID
    return match[5];
  } else {
    // Return null or handle the case when no match is found
    return null;
  }
};
const validateYoutubeURL = (url) => {
  if (url.trim() === "") {
    return true; // If URL is empty or contains only spaces, consider it as valid
  }

  const videoId = extractYoutubeVideoId(url);
  return !!videoId; // Returns true if a valid video ID is extracted
};
    const handleSubmit = async () => {
      console.log("submit clicked");
  
      if (event === "") {
        setError("Please enter event");
      }else if (location === "") {
        setError("Please enter location");
      }else if (eventdescription === "") {
        setError("Please enter eventdescription");
      }else if (eventdate === "") {
          setError("Please enter eventdate");
      }else if (images.length === 0) {
        setError("Please select at least one image and upto 6 images");
      }else if (Youtubeurls === "") {
        setError("Please enter the Youtube URL");
      }else if (!validateYoutubeURL(Youtubeurls)) {
        setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
      }else if (images.length > 6) {
        setError("Upload only 6 images.");
      }else {
        setError("");
        const formData = new FormData();
        formData.append("userid", logUser.id);
        formData.append("event", event);
        formData.append("location", location);
        formData.append("eventdescription", eventdescription);
        formData.append("YoutubeUrls",extractYoutubeVideoId(Youtubeurls));
        formData.append("eventdate", eventdate);
       
  
        // Append each file to the form data
        images.forEach((file, index) => {
          formData.append(`portfolio_img[${index}]`, file);
        });
  
  
        try {
          const response = await axios.post(
            BACKEND_URL + "add-portfolio",
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
        <Topbar prevPage={"/dashboard"} pageTitle={"Manage Portfolio"} />
       
        <div className="row my-2">
          <div className="col-3">
            <label htmlFor="Event" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Event :
            </label>
            </div>
            <div className="col-9">
            <input
              type="text"
              id="Event"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setEvent(e.target.value)}
            />
            </div>
          </div>
          <div className="row my-2">
          <div className="col-3">
            <label htmlFor="Location" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Location :
            </label>
            </div>
            <div className="col-9">
            <input
              type="text"
              id="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setLocation(e.target.value)}
            />
            </div>
          </div>
          <div className="row my-2">
          <div className="col-3">
            <label htmlFor="Event Date" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Event Date:
            </label>
            </div>
            <div className="col-9">
            <input
              type="date"
              id="Event Date"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setEventDate(e.target.value)}
            />
            </div>
          </div>
          <div className="row my-2">
          <div className="col-3">
            <label htmlFor="event description" className="fs-10 fw-bold text-start py-2 text-uppercase">
             Event Description
            </label>
            </div>
            <div className="col-9">
            <textarea
              id="event description"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
            </div>
          </div>
          <div className="row my-2">
          <div className="col-3">
            <label htmlFor="Event Media" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Event Media
            </label>
            </div>
            <div className="col-9">
            <input
              type="file"
              id="Event Media"
              multiple
              onChange={handleImageChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
          </div>
          <div className="row my-2">
          <div className="col-3">
            <label htmlFor="Youtube URL" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Youtube URl's
            </label>
            </div>
            <div className="col-9">
            <input
              type="link"
              id="Youtube_urls"
              multiple
              onChange={(e) => setYoutubeURLs(e.target.value)}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>


                   {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
          <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
            Add Portfolio
          </button>
      
</div>
      </div>
    );
  };
  
  export default ManagePortfolio;