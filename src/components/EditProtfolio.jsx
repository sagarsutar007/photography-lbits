// import { Link, useNavigate,useParams } from "react-router-dom";

// import Topbar from "./Topbar/Topbar";
// // import avatar from "./avatar.png";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../utilities/constants";
// // import { BACKEND_URL } from "../../utilities/constants";
// const getUser = () => {
//   let user = localStorage.getItem("user");

//   if (user) {
//     user = JSON.parse(user);
//   } else {
//     user = null;
//   }
//   return user;
// };
// const EditProtfolio = () => {
//   const [Portfolio, setPortfolio] = useState([]);
//   const [logUser, setLogUser] = useState(null);
//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const { username } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userFromStorage = getUser();
//     setLogUser(userFromStorage);

//     const fetchData = async () => {
//       try {
//         const user = getUser();
//         const response = await axios.post(BACKEND_URL + "/portfolio", {
//           userid: user.id,
//           username: username,
//         });

//         if (response.data && response.data.result) {
//           setPortfolio(response.data.result);
//            // Set the initial user data when portfolio data is fetched
//         setUserData(response.data.result[0]); // Assuming the data is an array and you want the first item
//         setLoading(false); // Set loading to false once data is received
//         } else {
//           console.error("Invalid response data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching portfolio data:", error);
//       }
//     };

//     fetchData();
//   }, []);
  

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
//   // };
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     setUserPortfolios((prevPortfolios) => {
//       const updatedPortfolios = [...prevPortfolios];
//       updatedPortfolios[index] = {
//         ...updatedPortfolios[index],
//         [name]: value,
//       };
//       return updatedPortfolios;
//     });
//   };
//   const handleSave = async () => {
//     const userFromStorage = getUser();
//     try {
//       // Process each portfolio
//       for (const portfolio of userPortfolios){}
//       const formData = new FormData();
      
//       formData.append("id", userFromStorage.id);
//       formData.append("name", userData.name || "");
//       formData.append("event", userData.event || "");
//       formData.append("location", userData.location || "");
//       formData.append("eventdescription", userData.eventdescription|| "");
//       formData.append("YoutubeUrls", userData.YoutubeUrls || "");
//       formData.append("qualification", userData.qualification || "");
//       formData.append("eventdate", userData.eventdate || "");

//       const fileInput = document.getElementById("file");

//       portfolio.images.forEach((file, index) => {
//         formData.append(`portfolio_img[${index}]`, file);
//       });

//       const response = await axios.post(
//         BACKEND_URL + "/update-protfolio",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (response.data.status !== "SUCCESS") {
//         console.error("Error updating portfolio:", response.data.message);
//         // Handle error as needed
//       }
//     navigate("/manageportfolio");
//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// };

//   //     if (response.data.status === "SUCCESS") {
//   //       navigate("/manageportfolio");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error saving data:", error);
//   //   }
//   // };

//   return (
//     <div>
//       <Topbar prevPage={"/dashboard"} pageTitle={"Edit Protfolio"} />
//       <form action="#" method="post" encType="multipart/form-data">
//         <div className="row my-2">
//           <div className="col-3">
//             <label
//               htmlFor="event"
//               className="fs-10 fw-bold text-start py-2 text-uppercase"
//             >
//               Event:
//             </label>
//           </div>
//           <div className="col-9">
//             <input
//               type="text"
//               id="Event"
//               value={loading ? "Loading..." : userData.event || ""}
//               onChange={handleInputChange}
//               className="form-control bg-light-grey border-0 fs-12"
//             />
//           </div>
//         </div>
//         <div className="row my-2">
//           <div className="col-3">
//             <label
//               htmlFor="location"
//               className="fs-10 fw-bold text-start py-2 text-uppercase"
//             >
//               Location:
//             </label>
//           </div>
//           <div className="col-9">
//             <input
//               type="text"
//               name="location"
//               id="location"
//               value={loading ? "Loading..." : userData.location || ""}
//               onChange={handleInputChange}
//               className="form-control bg-light-grey border-0 fs-12"
//             />
//           </div>
//         </div>
//         <div className="row my-2">
//           <div className="col-3">
//             <label
//               htmlFor="eventdate"
//               className="fs-10 fw-bold text-start py-2 text-uppercase"
//             >
//               Event Date:
//             </label>
//           </div>
//           <div className="col-9">
//             <input
//               type="date"
//               name="eventdate"
//               id="eventdate"
//               value={loading ? "Loading..." : userData.eventdate || ""}
//               onChange={handleInputChange}
//               className="form-control bg-light-grey border-0 fs-12"
//             />
//           </div>
//         </div>
//         <div className="row my-2">
//           <div className="col-3">
//             <label
//               htmlFor="event description"
//               className="fs-10 fw-bold text-start py-2 text-uppercase"
//             >
//               Event Description:
//             </label>
//           </div>
//           <div className="col-9">
//             <textarea
//               type="date"
//               name="event description"
//               id="event description"
//               value={loading ? "Loading..." : userData.eventdescription || ""}
//               onChange={handleInputChange}
//               className="form-control bg-light-grey border-0 fs-12"
//             />
//           </div>
//         </div>
//         <div className="row my-2">
//           <div className="col-3">
//             <label
//               htmlFor="Event Media"
//               className="fs-10 fw-bold text-start py-2 text-uppercase"
//             >
//               Event Media:
//             </label>
//           </div>
//           <div className="col-9">
//             <input
//               type="file"
//               name="Event Media"
//               id="file"
//               className="form-control bg-light-grey border-0 fs-12"
//             />
//             // if image exisit display
//           </div>

//         </div>
//         <div className="row my-2">
//           <div className="col-3">
//             <label
//               htmlFor="Youtube URL"
//               className="fs-10 fw-bold text-start py-2 text-uppercase"
//             >
//               Youtube URl's:
//             </label>
//           </div>
//           <div className="col-9">
//             <input
//               type="link"
//               name="Youtube URL"
//               id="Youtube URL"
//               value={loading ? "Loading..." : userData.YoutubeUrls || ""}
//               onChange={handleInputChange}
//               className="form-control bg-light-grey border-0 fs-12"
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-4 ms-auto">
//             <button
//               type="button"
//               className="btn btn-primary btn-sm w-100 mb-4 mt-1 fs-12"
//               onClick={handleSave}
//             >
//               SAVE
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProtfolio;


import {  useNavigate,useLocation } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import Topbar from "./Topbar/Topbar";
// import avatar from "./avatar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import Portfolio from "./Portfolio";
// import { BACKEND_URL } from "../../utilities/constants";
const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: 'linen',
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
          borderRadius:'10px'
        }}
      >
        <p>Are you sure, want to delete this image?</p>
        <div style={{display:'flex',justifyContent:'space-evenly'}} ><button className="btn btn-danger" onClick={onConfirm}>Yes</button>
        <button onClick={onClose} className="btn btn-secondary">No</button>
        </div>
      </div>
    )
  );
};

const EditProtfolio = () => {
  const [logUser, setLogUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [youtubeUrls, setYoutubeUrls] = useState("");
  const [error, setError] = useState("");
  // const { username } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
 
// const handleDeleteImage = (index) => {
//   setSelectedImageIndex(index);
//   const isConfirmed = window.confirm("Are you sure you want to delete this image?");
//   if (isConfirmed) {
//     // Perform deletion
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//   }
// };
const handleDeleteImage = (index) => {
  setSelectedImageIndex(index);
  setIsConfirmationOpen(true);
  document.body.style.overflow = "hidden"; // Prevent scrolling
};

// const handleConfirmDelete = () => {
//   const updatedImages = [...images];
//   updatedImages.splice(selectedImageIndex, 1);
//   setImages(updatedImages);
//   setIsConfirmationOpen(false);
//   document.body.style.overflow = "auto"; // Prevent scrolling
// };
const handleConfirmDelete = async () => {
  try {
    const userFromStorage = getUser();
    const imageToDelete = images[selectedImageIndex];

    const response = await axios.get(
      `${BACKEND_URL}deleteImageById?id=${imageToDelete.id}`

    );

    if (response.data.status === "SUCCESS") {
      console.log("Image deleted successfully");
      
      // const updatedImages = [...images];
      // updatedImages.splice(selectedImageIndex, 1);
      // setImages(updatedImages);
      // setIsConfirmationOpen(false);
      // window.location.reload();
      
    } else {
      console.error("Error deleting image:", response.data.message);
      // Handle error, show error message, etc.
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    // Handle other errors
  }
};

const handleCancelDelete = () => {
  setIsConfirmationOpen(false);
  document.body.style.overflow = "auto"; // Prevent scrolling
};

  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);

    const fetchData = async () => {
      try {
        console.log("Fetching data for id:", id);
        const user = getUser();
        const response = await axios.post(`${BACKEND_URL}/portfolioById?id=${id}`, {
          id: userFromStorage.id,
        });
        console.log("Response from backend:", response.data);
        // , {
          // userid: user.id,
          // username: username,
        // });

        if (response.data && response.data.result) {
          // setPortfolio(response.data.result);
          // setUserData(response.data.result[0]); // Assuming the data is an array and you want the first item
          // setLoading(false); // Set loading to false once data is received
          // Set userData directly with the result property
          setImages(response.data.result.images || []);
          setYoutubeUrls(response.data.result.Youtube_urls || "");
        setUserData(response.data.result);
        setLoading(false); // Set loading to false once data is received
        
        // Set the tab title dynamically based on the event name
        document.title = `Edit Portfolio - ${response.data.result.event || "Loading..."}`;
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleImageChange = (e) => {
  
    const files = Array.from(e.target.files);

    if (files.length > 6) {
      setError("Upload only 6 images.");
      e.target.value = null;
    } else {
      setImages(prevImages => [...prevImages, ...files]);
      setError(""); 
    }
  };
  // const handleView = () => {
  
  //   setDisplayImages(true);
  // };

  const handleSave = async () => {
    // const userFromStorage = getUser();
    try {
      const formData = new FormData();
      formData.append("id", id);
      // formData.append("name", userData.name || "");
      formData.append("event", userData.event || "");
      formData.append("location", userData.location || "");
      formData.append("eventdescription", userData.eventdescription|| "");
      formData.append("Youtube_urls", youtubeUrls || "");
      // formData.append("qualification", userData.qualification || "");
      formData.append("eventdate", userData.eventdate || "");
      // const fileInput = document.getElementById("file");

      // if (fileInput.files.length > 0) {
      //   formData.append("protfolio_img", fileInput.files[0]);
      // }
      // const images = fileInput.files
      // images.forEach((file, index) => {
      //   formData.append(`portfolio_img[${index}]`, file);
      // });
      images.forEach((file, index) => {
        // Check if file is valid
        if (file && file.name) {
            const currentDate = new Date();
            const timestamp = currentDate.getTime(); // Get current timestamp
    
            // Extract file extension
            const fileExtension = file.name.split('.').pop();
    
            // Construct new file name with timestamp
            const newFileName = `file_${timestamp}.${fileExtension}`;
    
            // Create a new File object with the renamed file
            const renamedFile = new File([file], newFileName, { type: file.type });
    
            // Append the renamed file to FormData
            formData.append(`portfolio_img[${index}]`, renamedFile);
        } else {
            console.error('Invalid file:', file);
        }
    });
      const response = await axios.post(
        `${BACKEND_URL}update-portfolio?id=${id}`,
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
      
      // if (response.data && response.data.status === 'SUCCESS') {
      //   const portfolioData = response.data.result;
  
      //   if (portfolioData.images && portfolioData.images.length > 0 && portfolioData.images[0].file_name) {
      //     const imageUrl = `http://localhost/chroma-cheer-b/assets/images/${portfolioData.images[0].file_name}`;
      //     console.log('Image URL:', imageUrl);
      //   } else {
      //     console.error('Image URL not found in the response.');
      //   }
  
      //   // Format the date using JavaScript Date object or moment.js
      //   const formattedDate = new Date(portfolioData.eventdate).toLocaleDateString();
      //   console.log('Formatted Date:', formattedDate);
  
      //   // Handle other success scenarios if needed
      // } else {
      //   console.error('Error in the response:', response.data.message);
      // }
    // } catch (error) {
    //   console.error('Error saving data:', error);
  
    //   // Handle specific error scenarios if needed
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     console.error('Server responded with:', error.response.status);
    //     console.error('Response data:', error.response.data);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     console.error('No response received:', error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an error
    //     console.error('Error setting up the request:', error.message);
    //   }
    // }
  };
  
      // console.log('Axios Config:', {
      //   method: 'put',
      //   url: 'http://localhost/chroma-cheer-b/update-portfolio',
      //   data: formData,
      // });

      // const response = await axios.post(
      //   BACKEND_URL + "/update-portfolio",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

  //     if (response.data.status === "SUCCESS") {
  //       navigate("/manageportfolio");
  //     }
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };
  
    // Check for successful response
//     if (response.data && response.data.status === 'SUCCESS') {
//       const portfolioData = response.data.result;

//       // Check if images array is not empty and contains the required properties
//       if (portfolioData.images && portfolioData.images.length > 0 && portfolioData.images[0].file_name) {
//         const imageUrl = `http://localhost/chroma-cheer-b/assets/images/${portfolioData.images[0].file_name}`;
        
//         // Use imageUrl as needed (e.g., display in your UI)
//         console.log('Image URL:', imageUrl);
//       } else {
//         console.error('Image URL not found in the response.');
//       }

//       // Format the date using JavaScript Date object or moment.js
//       const formattedDate = new Date(portfolioData.eventdate).toLocaleDateString();
//       console.log('Formatted Date:', formattedDate);
//     } else {
//       console.error('Error in the response:', response.data.message);
//     }
//   } catch (error) {
//     console.error('Error saving data:', error);
//   }
// };

  return (
    <div>
      <Topbar prevPage={"/manage-portfolio"} pageTitle={"Edit Protfolio"} />
      <form action="#" method="post" encType="multipart/form-data">
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="event"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Event:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              id="event"
              value={loading ? "Loading..." : userData.event || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="location"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Location:
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="location"
              id="location"
              value={loading ? "Loading..." : userData.location || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="eventdate"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Event Date:
            </label>
          </div>
          <div className="col-9">
            <input
              type="date"
              name="eventdate"
              id="eventdate"
              value={loading ? "Loading..." : userData.eventdate || ""}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="event description"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Event Description:
            </label>
          </div>
          <div className="col-9">
            <textarea
              type="date"
              name="event description"
              id="event description"
              value={loading ? "Loading..." : userData.eventdescription || ""}
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
              Event Media:
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
            {images && images.length > 0 && (
      <div className="my-2">
        {/* <p>Selected Images:</p> */}
        {images.map((image, index) => (
          <div key={index} className="position-relative my-2">
            <button type="button" style={{color:'darkgray',marginLeft:'90%',borderRadius:'0px'}} className="btn btn-sm position-relative top-0 "onClick={() => handleDeleteImage(index)} >
            <Icon.TrashFill size={25} /></button>
          <img
            key={index}
            // src={URL.createObjectURL(image)}
            src={BACKEND_URL + "/assets/images/" + image.file_name}
            alt={`Image ${index + 1}`}
            className="img-thumbnail"
          />
         
              </div>
        ))}
      </div>
    )}
    {/* Confirmation Modal
  {isModalOpen && (
    <div className="modal fade show" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation</h5>
            <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this image?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
              No
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
              Yes
            </button>
          </div>
        </div>
          </div>
        </div>
  )} */}
        </div>
        </div>

        <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="Youtube URL"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Youtube URl's:
            </label>
          </div>
          <div className="col-9">
            <input
              type="link"
              name="Youtube URL"
              id="Youtube URL"
              placeholder="No Youtube Url"
              value={loading ? "Loading..." : youtubeUrls || ""}
              // onChange={(e) => setYoutubeUrls(e.target.value)}
              onChange={handleInputChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
             {youtubeUrls && (
              <div className="my-2">
                <iframe
                  title="YouTube Video"
                  width="250"
                  height="200"
                  src={`https://www.youtube.com/embed/${youtubeUrls}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
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
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
        />
      </form>
    </div>
  );
};

export default EditProtfolio;


        {/* <div className="row my-2">
          <div className="col-3">
            <label
              htmlFor="Event Media"
              className="fs-10 fw-bold text-start py-2 text-uppercase"
            >
              Event Media:
            </label>
          </div>
          <div className="col-9">
            <input
              type="file"
              name="Event Media"
              id="file"
              onChange={handleFileChange}
              className="form-control bg-light-grey border-0 fs-12"
            />
            {images.length > 0 && (
              <div className="my-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    className="img-thumbnail"
                  />
                ))}
          </div>
            )}
            </div>
        </div> */}