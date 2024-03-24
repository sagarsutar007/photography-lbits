// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Import axios library
// import Topbar from "../Topbar/Topbar";
// import { BACKEND_URL } from "../../utilities/constants";




// const getUser = () => {
//   let user = localStorage.getItem("user");

//   if (user) {
//     user = JSON.parse(user);
//   } else {
//     user = null;
//   }
//   return user;
// };
// const GOOGLE_MAPS_API_KEY = "AIzaSyAoYQVZtYNzXjpFx7dUCNe_eFqcEepwOp0";


// const ManageCustomerEvent = () => {
//   const [logUser, setLogUser] = useState(getUser());
//   const [event, setEvent] = useState("");
//   const [location, setLocation] = useState("");
//   const [eventdate, setEventDate] = useState("");
//   const [eventdescription, setEventDescription] = useState("");
//   const [Youtubeurls, setYoutubeURLs] = useState("");
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState("");
//   const [view, setView] = useState(false);
//   const [displayImages, setDisplayImages] = useState(false);

//   const navigate = useNavigate();
//   useEffect(() => {
//     // Retrieve event information from query parameters
//     const queryParams = new URLSearchParams(window.location.search);
//   const eventId = queryParams.get("eventId");

//      if (eventId) {
//       // Fetch event details based on eventId and set the form fields accordingly
//       fetchEventDetails(eventId);
//     }
//      // Set the tab title when the component mounts
//      document.title = "Create Customer Event";
//   }, []);
//   const fetchEventDetails = async (eventId) => {
//     try {
//       const user = getUser();
//       const response = await axios.post(BACKEND_URL + "/customer", {
//         userid: user.id,
//         eventId: eventId,
//       });
  
//       if (response.data && response.data.result && response.data.result.length > 0) {
//         const event = response.data.result[0];
//         setEvent(event.event);
//         setLocation(event.location);
//         setEventDate(event.eventdate);
//         setEventDescription(event.eventdescription);
//         setYoutubeURLs(event.YoutubeUrls);
//         setDisplayImages(!!event.customer_img && event.customer_img.length > 0);
//         setImages(event.customer_img || []);
//       } else {
//         console.error("Invalid response data:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     if (files.length > 1 ) {
//       setError("Upload  1 image only.");
//       e.target.value = null;
//     } else {
//       setImages(files);
//       setError(""); // Clear error if images are within the limit
//     }
//   };

//   const extractYoutubeVideoId = (url) => {
//     const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(youtubeUrlRegex);

//     if (match && match[5]) {
//       // match[5] contains the video ID
//       return match[5];
//     } else {
//       // Return null or handle the case when no match is found
//       return null;
//     }
//   };

//   const validateYoutubeURL = (url) => {
//     if (url.trim() === "") {
//       return true; // If URL is empty or contains only spaces, consider it as valid
//     }

//     const videoId = extractYoutubeVideoId(url);
//     return !!videoId; // Returns true if a valid video ID is extracted
//   };
//   // const formatDate = (dateString) => {
//   //   const date = new Date(dateString);
//   //   const day = date.getDate().toString().padStart(2, '0');
//   //   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//   //   const year = date.getFullYear().toString().slice(-2);
//   //   return `${day}-${month}-${year}`;
//   // };

//   const handleSubmit = async () => {
//     console.log("submit clicked");

//     if (event === "") {
//       setError("Please enter event");
//     }else if (location === "") {
//       setError("Please enter location");
//     }else if (eventdescription === "") {
//       setError("Please enter eventdescription");
//     }else if (eventdate === "") {
//         setError("Please enter eventdate");
//     }else if (images.length === 0) {
//       setError("Please select  one image only");
//     }else if (Youtubeurls === "") {
//       setError("Please enter the Youtube URL");
//     }else if (!validateYoutubeURL(Youtubeurls)) {
//       setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
//     }else if (images.length > 1) {
//       setError("Upload only 1 image.");
//     }else {
//       setError("");
//       const formData = new FormData();
//       formData.append("userid", logUser.id);
//       formData.append("event", event);
//       formData.append("location", location);
//       formData.append("eventdescription", eventdescription);
//       formData.append("YoutubeUrls",extractYoutubeVideoId(Youtubeurls));
//       formData.append("eventdate", eventdate);
     

//       // Append each file to the form data
      // images.forEach((file, index) => {
      //   formData.append(`customer_img[${index}]`, file);
      // });


//       try {
//         const response = await axios.post(
//           BACKEND_URL + "/add-customer",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         const data = response.data;
//         if (data.status === "SUCCESS") {
//           navigate("/share-event?id="+ response.data["id"]);
//         } else {
//           setError("Something went wrong!");
//         }
//       } catch (error) {
//         console.error("Error sending data:", error);
//       }
//     }
//   };


//   const handleView = () => {
//     setView(true);
//     setDisplayImages(true);
//   };

//   return (
//     <div >
//       <Topbar prevPage={"/share-customer-event"} pageTitle={"ManageCustomerEvent"} />

//       <div className="row my-2">
//         <div className="col-3">
//           <label htmlFor="Event" className="fs-10 fw-bold text-start py-2 text-uppercase">
//             Event :
//           </label>
//         </div>
//         <div className="col-9">
//           <select
//             id="Event"
//             className="form-control bg-light-grey border-0 fs-12"
//             onChange={(e) => setEvent(e.target.value)}
//           >
//             <option value="">Select Event</option>
//             <option value="Birthday">Birthday</option>
//             <option value="Marriage">Marriage</option>
//             <option value="Engagement">Engagement</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//       </div>
//       <div className="row my-2">
//         <div className="col-3">
//           <label htmlFor="Location" className="fs-10 fw-bold text-start py-2 text-uppercase">
//             Location :
//           </label>
//         </div>

//         <div className="col-9">
//           <input
//             type="text"
//             id="Location"
//             className="form-control bg-light-grey border-0 fs-12"
//             onChange={(e) => setLocation(e.target.value)}
//           />

//         </div>
//         <div style={{  marginLeft:'100px',marginTop:'10px' }}>
//         {view && (<iframe
//           width="200"
//           height="100"
//           src={`https://www.google.com/maps/embed/v1/place?q=${location}&key=${GOOGLE_MAPS_API_KEY}`}
//           allowFullScreen
//           title="Location"
//           frameBorder="1"
//         ></iframe>)}
//         </div>
//       </div>

//       <div className="row my-2">
//         <div className="col-3">
//           <label htmlFor="EventDate" className="fs-10 fw-bold text-start py-2 text-uppercase">
//             Event Date:
//           </label>
//         </div>
//         <div className="col-9">
//           <input
//             type="date"
//             id="EventDate"
//             className="form-control bg-light-grey border-0 fs-12"
//             onChange={(e) => setEventDate(e.target.value)}
//           />
//         </div>
       
//       </div>

//       <div className="row my-2">
//         <div className="col-3">
//           <label htmlFor="EventDescription" className="fs-10 fw-bold text-start py-2 text-uppercase">
//             Event Description:
//           </label>
//         </div>
//         <div className="col-9">
//           <textarea
//             id="EventDescription"
//             className="form-control bg-light-grey border-0 fs-12"
//             onChange={(e) => setEventDescription(e.target.value)}
//           ></textarea>
//         </div>
      
//       </div>

//       <div className="row my-2">
//         <div className="col-3">
//           <label htmlFor="EventMedia" className="fs-10 fw-bold text-start py-2 text-uppercase">
//             Event Media
//           </label>
//         </div>
//         <div className="col-9">
//           <input
//             type="file"
//             id="EventMedia"
//             multiple
//             onChange={handleImageChange}
//             className="form-control bg-light-grey border-0 fs-12"
//           />
//         </div>
//         {displayImages && images.length > 0 && (
//         <div>
          
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={URL.createObjectURL(image)}
//               alt={`Selected ${index}`}
//               style={{ maxWidth: '250px',maxHeight: '100px', marginLeft:'100px',marginTop:'10px' }} // Set max width and height
//             />
//           ))}
//         </div>
//       )}
       
//       </div>

//       <div className="row my-2">
//         <div className="col-3">
//           <label htmlFor="YoutubeUrls" className="fs-10 fw-bold text-start py-2 text-uppercase">
//             Youtube Urls:
//           </label>
//         </div>
//         <div className="col-9">
//           <input
//             type="text"
//             id="YoutubeUrls"
//             className="form-control bg-light-grey border-0 fs-12"
//             value={Youtubeurls}
//             onChange={(e) => setYoutubeURLs(e.target.value)}
//           />
//           {view && (<div  style={{ paddingTop:'20px' }}>
//             {Youtubeurls && (
//               <iframe
//                 width="250"
//                 height="100"
//                 src={`https://www.youtube.com/embed/${extractYoutubeVideoId(Youtubeurls)}`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write;  gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>)}
//           </div>)}
//         </div>
//       </div>

//       {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
//       <div className="row">
//       {/* {view && ( */}
       
//         <div className="col">
//           <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
//            submit
//           </button>
//         </div>
       
//           {/* //  )} */}
//         {/* <div className="col">
//           <button className="btn btn-primary btn-sm w-100" onClick={handleView}>
//             View
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ManageCustomerEvent;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios library
import Topbar from "../Topbar/Topbar";
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
const GOOGLE_MAPS_API_KEY = "AIzaSyAoYQVZtYNzXjpFx7dUCNe_eFqcEepwOp0";


const ManageCustomerEvent = () => {
  const [logUser, setLogUser] = useState(getUser());
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [eventdate, setEventDate] = useState("");
  // const [eventdescription, setEventDescription] = useState("");
  // const [Youtubeurls, setYoutubeURLs] = useState("");
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingTime, setWeddingTime] = useState("");
  const [weddingLocation, setWeddingLocation] = useState("");
  const [GroomMakingDate, setGroomMakingDate] = useState("");
  const [GroomMakingTime, setGroomMakingTime] = useState("");
  const [GroomMakingLocation, setGroomMakingLocation] = useState("");
  const [GroomHaldiDate, setGroomHaldiDate] = useState("");
  const [GroomHaldiTime, setGroomHaldiTime] = useState("");
  const [GroomHaldiLocation, setGroomHaldiLocation] = useState("");
  const [BrideHaldiDate, setBrideHaldiDate] = useState("");
  const [BrideHaldiTime, setBrideHaldiTime] = useState("");
  const [BrideHaldiLocation, setBrideHaldiLocation] = useState("");
  const [MehandiDate, setMehandiDate] = useState("");
  const [MehandiTime, setMehandiTime] = useState("");
  const [MehandiLocation, setMehandiLocation] = useState("");
  const [BrideMakingDate, setBrideMakingDate] = useState("");
  const [BrideMakingTime, setBrideMAkingTime] = useState("");
  const [BrideMakingLocation, setBrideMakingLocation] = useState("");
  const [ReceptionDate, setReceptionDate] = useState("");
  const [ReceptionTime, setReceptionTime] = useState("");
  const [ReceptionLocation, setReceptionLocation] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [view, setView] = useState(false);
  const [displayImages, setDisplayImages] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve event information from query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const eventId = queryParams.get("eventId");

    if (eventId) {
      // Fetch event details based on eventId and set the form fields accordingly
      fetchEventDetails(eventId);
    }
    // Set the tab title when the component mounts
    document.title = "Create Customer Event";
  }, []);
  const fetchEventDetails = async (eventId) => {
    try {
      const user = getUser();
      const response = await axios.post(BACKEND_URL + "/customer", {
        userid: user.id,
        eventId: eventId,
      });

      if (response.data && response.data.result && response.data.result.length > 0) {
        const event = response.data.result[0];
        setGroomName(groomName.groomName);
        setBrideName(groomName.brideName);
        setWeddingDate(groomName.weddingDate);
        setWeddingTime(groomName.weddingTime);
        setWeddingLocation(groomName.weddingLocation);
        setGroomMakingDate(groomName.GroomMakingDate);
        setGroomMakingTime(groomName.GroomMakingTime);
        setGroomMakingLocation(groomName.GroomMakingLocation);
        setGroomHaldiDate(groomName.GroomHaldiDate);
        setGroomHaldiTime(groomName.GroomHaldiTime);
        setGroomHaldiLocation(groomName.GroomHaldiLocation);
        setBrideHaldiDate(groomName.BrideHaldiDate);
        setBrideHaldiTime(groomName.BrideHaldiTime);
        setBrideHaldiLocation(groomName.BrideHaldiLocation);
        setMehandiDate(groomName.MehandiDate);
        setMehandiTime(groomName.MehandiTime);
        setBrideMakingLocation(groomName.BrideMakingLocation);
        setReceptionDate(groomName.ReceptionDate);
        setReceptionTime(groomName.ReceptionTime);
        setReceptionLocation(groomName.ReceptionLocation);
        // setEvent(event.event);
        // setLocation(event.location);
        // setEventDate(event.eventdate);
        // setEventDescription(event.eventdescription);
        // setYoutubeURLs(event.YoutubeUrls);
        setDisplayImages(!!event.customer_img && event.customer_img.length > 0);
        setImages(event.customer_img || []);
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };
  const handleBannerImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 1) {
      setError("Please select one banner image");
      e.target.value = null; // Reset the file input to clear the selected files
    } else {
      setImages(files);
      setError(""); // Clear error if exactly one image is selected
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 3 || files.length > 5) {
      setError("Please select between 3 to 5 images for the event");
      e.target.value = null;
    } else {
      setImages([...images, ...files]);
      setError(""); // Clear error if the number of images is within the limit
    }
  };

  // const extractYoutubeVideoId = (url) => {
  //   const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  //   const match = url.match(youtubeUrlRegex);

  //   if (match && match[5]) {
  //     // match[5] contains the video ID
  //     return match[5];
  //   } else {
  //     // Return null or handle the case when no match is found
  //     return null;
  //   }
  // };

  // const validateYoutubeURL = (url) => {
  //   if (url.trim() === "") {
  //     return true; // If URL is empty or contains only spaces, consider it as valid
  //   }

  //   const videoId = extractYoutubeVideoId(url);
  //   return !!videoId; // Returns true if a valid video ID is extracted
  // };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  //   const year = date.getFullYear().toString().slice(-2);
  //   return `${day}-${month}-${year}`;
  // };

  const handleSubmit = async () => {
    console.log("submit clicked");
    if ( !groomName || !brideName || !weddingDate || !weddingTime ) {
      setError("Please enter all mandatory fields");
  }else if (groomName === "") {
      setError("Please enter GroomName");
    } else if (brideName === "") {
      setError("Please enter BrideName");
    } else if (weddingDate === "") {
      setError("PLease Enter WeddingDate ");
    }else if (weddingTime === ""){
      setError("Please Enter WeddingTime");
    // } else if (location === "") {
    //   setError("Please enter location");
      // }else if (eventdescription === "") {
      //   setError("Please enter eventdescription");
    // } else if (eventdate === "") {
    //   setError("Please enter eventdate");
    // } else if (images.length === 0) {
    //   setError("Please select one image only");
      // }else if (Youtubeurls === "") {
      //   setError("Please enter the Youtube URL");
      // }else if (!validateYoutubeURL(Youtubeurls)) {
      //   setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
    // } else if (images.length > 3) {
    //   setError("Upload event images minimum 3 images.");
    } else {
      setError("");
      const formData = new FormData();
      formData.append("userid", logUser.id);
      formData.append("groomName", groomName);
      formData.append("brideName", brideName);
      formData.append("weddingDate",weddingDate );
      formData.append("weddingTime",weddingTime );
      formData.append("weddingLocation",weddingLocation );
      formData.append("GroomMakingDate",GroomMakingDate );
      formData.append("GroomMakingTime",GroomMakingTime);
      formData.append("GroomMakingLocation",GroomMakingLocation);
      formData.append("GroomHaldiDate",GroomHaldiDate);
      formData.append("GroomHaldiTime",GroomHaldiTime);
      formData.append("GroomHaldiLocation",GroomHaldiLocation);
      formData.append("BrideHaldiDate",BrideHaldiDate);
      formData.append("BrideHaldiTime",BrideHaldiTime);
      formData.append("BrideHaldiLocation",BrideHaldiLocation);
      formData.append("MehandiDate",MehandiDate);
      formData.append("MehandiTime",MehandiTime);
      formData.append("MehandiLocation",MehandiLocation);
      formData.append("BrideMakingDate",BrideMakingDate);
      formData.append("BrideMakingTime",BrideMakingTime);
      formData.append("BrideMakingLocation",BrideMakingLocation);
      formData.append("ReceptionDate",ReceptionDate);
      formData.append("ReceptionTime",ReceptionTime);
      formData.append("ReceptionLocation",ReceptionLocation);
      images.forEach((file, index) => {
        formData.append(`customer_img[${index}]`, file);
      });

      // formData.append("",);
      // formData.append("",);
      // formData.append("location", location);
      // formData.append("eventdescription", eventdescription);
      // formData.append("YoutubeUrls",extractYoutubeVideoId(Youtubeurls));
      // formData.append("eventdate", eventdate);

       // Append banner image to form data
    // if (images.length > 0) {
    //  // Assuming the banner image is the first image in the array
    //  formData.append("customer_img[0]", images[0]);
    // }

    // // Append event images to form data
    // images.slice(1).forEach((file, index) => {
    //   formData.append(`customer_img[${index}]`, file);
    // });
      try {
        const response = await axios.post(
          BACKEND_URL + "add-customer",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;
        if (data.status === "SUCCESS") {
          navigate("/share-event?id=" + response.data["id"]);
        } else {
          setError("Something went wrong!");
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };


  const handleView = () => {
    setView(true);
    setDisplayImages(true);
  };

  return (
    <div >
      <Topbar prevPage={"/share-customer-event"} pageTitle={"ManageCustomerEvent"} />

      {/* <div className="row my-2">
        <div className="col-3">
          <label htmlFor="Event" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Event :
          </label>
        </div>
        <div className="col-9">
          <select
            id="Event"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setEvent(e.target.value)}
          >
            <option value="">Select Event</option>
            <option value="Birthday">Birthday</option>
            <option value="Marriage">Marriage</option>
            <option value="Engagement">Engagement</option> 
             Add more options as needed
          </select>
        </div>
      </div> */}
      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="BannerImage" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Banner <br />Image <a style={{ color: 'red' }}>*</a>
          </label>
        </div>
        <div className="col-9">
          <input
            type="file"
            id="BannerImage"
            multiple
            onChange={handleBannerImageChange}
            className="form-control bg-light-grey border-0 fs-12"
          />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="GroomName" className="fs-10 fw-bold text-start py-2 text-uppercase" >
            Groom <br />Name: <a style={{ color: 'red' }}>*</a>
          </label>
        </div>

        <div className="col-9">
          <input
            type="text"
            id="GroomName"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setGroomName(e.target.value)}
          />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="BrideName" className="fs-10 fw-bold text-start py-2 text-uppercase" >
            Bride <br />Name: <a style={{ color: 'red' }}>*</a>
          </label>
        </div>

        <div className="col-9">
          <input
            type="text"
            id="BrideName"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setBrideName(e.target.value)}
          />

        </div>
      </div>
      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="EventDate" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Wedding<br /> Date: <a style={{ color: 'red' }}>*</a>
          </label>
        </div>
        <div className="col-9">
          <input
            type="date"
            id="EventDate"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setWeddingDate(e.target.value)}
          />
        </div>

      </div>
      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="Wedding Time" className="fs-10 fw-bold text-start py-2 text-uppercase" >
            Wedding <br />Time: <a style={{ color: 'red', fontSize: '10px' }}>*</a>
          </label>
        </div>

        <div className="col-9">
          <input
            type="time"
            id="Wedding Time"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setWeddingTime(e.target.value)}
          />

        </div>
      </div>

      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="Location" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Weddiing Location :
          </label>
        </div>

        <div className="col-9">
          <input
            type="text"
            id="Location"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setWeddingLocation(e.target.value)}
          />

        </div>
        {/* <div style={{  marginLeft:'100px',marginTop:'10px' }}>
        {view && (<iframe
          width="200"
          height="100"
          src={`https://www.google.com/maps/embed/v1/place?q=${location}&key=${GOOGLE_MAPS_API_KEY}`}
          allowFullScreen
          title="Location"
          frameBorder="1"
        ></iframe>)}
        </div> */}
      </div>

      {/* <div className="row my-2">
        <div className="col-3">
          <label htmlFor="EventDescription" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Event Description:
          </label>
        </div>
        <div className="col-9">
          <textarea
            id="EventDescription"
            className="form-control bg-light-grey border-0 fs-12"
            onChange={(e) => setEventDescription(e.target.value)}
          ></textarea>
        </div>
      
      </div> */}

      <div className="row my-2">
        <div className="col-3">
          <label htmlFor="EventMedia" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Event Images: <a style={{ color: 'red' }}>*</a>
          </label>
        </div>
        <div className="col-9">
          <input
            type="file"
            id="EventImages"
            multiple
            onChange={handleImageChange}
            className="form-control bg-light-grey border-0 fs-12"
          />
        </div>
        {/* {displayImages && images.length > 0 && (
        <div>
          
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Selected ${index}`}
              style={{ maxWidth: '250px',maxHeight: '100px', marginLeft:'100px',marginTop:'10px' }} // Set max width and height
            />
          ))}
        </div>
      )} */}

      </div>

      {/* <div className="row my-2">
        <div className="col-3">
          <label htmlFor="YoutubeUrls" className="fs-10 fw-bold text-start py-2 text-uppercase">
            Youtube Urls:
          </label>
        </div>
        <div className="col-9">
          <input
            type="text"
            id="YoutubeUrls"
            className="form-control bg-light-grey border-0 fs-12"
            value={Youtubeurls}
            onChange={(e) => setYoutubeURLs(e.target.value)}
          />
          {view && (<div  style={{ paddingTop:'20px' }}>
            {Youtubeurls && (
              <iframe
                width="250"
                height="100"
                src={`https://www.youtube.com/embed/${extractYoutubeVideoId(Youtubeurls)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write;  gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>)}
          </div>)}
        </div>
      </div> */}

      {error && <p className="text-danger text-center fs-12 mb-3">{error}</p>}
      {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',fontWeight:'bold'}} className="mt-4">
        <p>Events</p>
        <p>Date</p>
        <p>Time</p>
        <p>Location</p>
      </div> */}
      <div className="mt-4">
        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="GroomMAking" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Groom Making :
            </label>
          </div>
        </div>
        <div className="row my-2">

          <div className="col-12">
            <input
              type="date"
              id="GroomMakingDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setGroomMakingDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">

          <div className="col-12">
            <input
              type="time"
              id="GroomMakingTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setGroomMakingTime(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-2">

          <div className="col-12 ">

            <input
              type="text"
              id="GroomMakingLocation"
              placeholder="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setGroomMakingLocation(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="GroomHaldi" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Groom Haldi:
            </label>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="date"
              id="GroomHaldiDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setGroomHaldiDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="time"
              id="GroomHaldiTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setGroomHaldiDate(e.target.value)}
            />
          </div>
        </div><div className="row my-2">
          <div className="col-12">
            <input
              type="text"
              id="GroomHaldiLocation"
              placeholder="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setGroomHaldiLocation(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="BrideHaldi" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Bride Haldi:
            </label>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="date"
              id="BrideHaldiDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setBrideHaldiDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="time"
              id="BrideHaldiTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setBrideHaldiTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="text"
              id="BrideHaldiLocation"
              placeholder="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setBrideHaldiLocation(e.target.value)}
            />
          </div>

        </div>
      </div>
      <div className="mt-4">
        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="Mehandi" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Mehandi:
            </label>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="date"
              id="MehandiDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setMehandiDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="time"
              id="MehandiTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setMehandiTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="text"
              id="MehandiLocation"
              placeholder="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setMehandiLocation(e.target.value)}
            />
          </div>

        </div>
      </div>
      <div className="mt-4">
        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="BrideMaking" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Bride Making:
            </label>
          </div>
        </div>
        <div className="row my-2">

          <div className="col-12">
            <input
              type="date"
              id="BrideMakingDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setBrideMakingDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">

          <div className="col-12">
            <input
              type="time"
              id="BrideMakingTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setBrideMAkingTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="text"
              id="BrideMakingLocation"
              placeholder="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setBrideMakingLocation(e.target.value)}
            />
          </div>

        </div>
      </div>
      <div className="mt-4">

        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="Wedding" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Wedding:
            </label>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="date"
              id="WeddingDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setWeddingDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="time"
              id="WeddingTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setWeddingTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="text"
              id="WeddingLocation"
              placeholder="Location"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setWeddingLocation(e.target.value)}
            />
          </div>

        </div>
      </div>
      <div className="mt-4">

        <div className="row my-2">
          <div className="col-9">
            <label htmlFor="Reception" className="fs-10 fw-bold text-start py-2 text-uppercase">
              Reception:
            </label>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="date"
              id="ReceptionDate"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setReceptionDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="time"
              id="ReceptionTime"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setReceptionTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-12">
            <input
              type="text"
              id="Location"
              placeholder="ReceptionLocation"
              className="form-control bg-light-grey border-0 fs-12"
              onChange={(e) => setReceptionLocation(e.target.value)}
            />
          </div>

        </div>
      </div>
      <div className="row">
        {/* {view && ( */}

        <div className="col">
          <button className="btn btn-primary btn-sm w-100" onClick={handleSubmit}>
            submit
          </button>
        </div>

        {/* //  )} */}
        {/* <div className="col">
          <button className="btn btn-primary btn-sm w-100" onClick={handleView}>
            View
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ManageCustomerEvent;
