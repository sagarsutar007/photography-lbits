// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utilities/constants";
// import { useParams } from "react-router-dom";
// import Modal from 'react-modal';
// import { FaTimes } from "react-icons/fa";
// import { toPng } from 'html-to-image';

// const getUser = () => {
//   let user = localStorage.getItem("user");
//   if (user) user = JSON.parse(user);
//   else user = null;
//   return user;
// };

// const GOOGLE_MAPS_API_KEY = "";

// const ShareEvent = () => {
//   const [customer, setCustomer] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalImage, setModalImage] = useState('');
//   const [youtubeError, setYoutubeError] = useState(false); // State to track YouTube embed errors
//   const { username ,id} = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//          // Extract the id parameter from the URL
//       const urlParams = new URLSearchParams(window.location.search);
//       const eventId = urlParams.get('id');
//         const user = getUser();
//         const response = await axios.post(BACKEND_URL + "/customer", {
//           userid: user.id,
//           username: username,
//           eventId: eventId, // Pass the extracted id to the backend
//         });

//         if (response.data && response.data.result) {
//           setCustomer(response.data.result);
//         } else {
//           console.error("Invalid response data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//       }
//     };

//     fetchData();
//   }, [username]);

//   const openModal = (image) => {
//     setModalImage(image);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalImage('');
//     setModalIsOpen(false);
//   };

//   const shareEvent = async () => {
//     try {
//       const node = document.getElementById('event-details');

//       if (!node) {
//         console.error('Element with id "event-details" not found');
//         return;
//       }

//       const dataUrl = await toPng(node);

//       // Here you can do something with the dataUrl, like uploading it or displaying it
//       console.log(dataUrl);

//       // If you want to send the image data to others, you can use a sharing mechanism here
//       // For example, you can upload the image to a server and then share the link to the uploaded image
//       // Or you can use a messaging API to directly send the image to other users

//       // After sharing, you can close the modal if it's open
//       closeModal();
//     } catch (error) {
//       console.error('Error converting to image:', error);
      
//       // Check if the error object exists and has the message property before calling includes method
//       if (error && error.message && error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
//         // Handle ad blocker error or other relevant error if needed
//       } else {
//         console.error('Unexpected error occurred:', error);
//       }
//     }
//   };
//   const filteredCustomer = customer.filter((customerItem) => customerItem.id === id);
//   return (
//     <div >
//       <h3 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>Customer</h3>

//       <div id="event-details">
//         {customer.map((customerItem, index) => (
//           <div key={index}>
//             <p>{customerItem.eventdescription}</p>
//             <div>
//               {customerItem.images.map((image, idx) => (
//                 <img
//                   key={idx}
//                   src={BACKEND_URL + "/assets/images/" + image.file_name}
//                   className="mb-2"
//                   style={{ width: "85px", alignItems: 'center', height: "80px", marginRight: "35px", cursor: 'pointer' }}
//                   alt=""
//                   onClick={() => openModal(BACKEND_URL + "/assets/images/" + image.file_name)}
//                 />
//               ))}
//             </div>
//             {customerItem.location && (
//               <iframe   
//                width="200"
//                 height="100"
//                 src={`https://www.google.com/maps/embed/v1/place?q=${customerItem.location}&key=${GOOGLE_MAPS_API_KEY}`}
//                 allowFullScreen
//                 title="Location"
//                 frameBorder="1"
//               ></iframe>
//             )}
//             {customerItem.Youtube_urls && (
//               <iframe
//                 width="100%"
//                 height="200"
//                 src={`https://www.youtube.com/embed/${customerItem.Youtube_urls}`}
//                 allowFullScreen
//                 title="YouTube Video"
//                 frameBorder="0"
//                 onError={() => setYoutubeError(true)} // Track errors in loading YouTube videos
//               ></iframe>
//             )}
//                  <div>
//                  <button onClick={shareEvent}>Share Event</button>
//                  </div>
//           </div>
          
//         ))}
//       </div>

     

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//           }
//         }}
//       >
//         <button
//           onClick={closeModal}
//           style={{
//             border: "none",
//             background: "none",
//             cursor: "pointer",
//             position: "absolute",
//             top: "-5px",
//             right: "10px",
//           }}
//         >
//           <FaTimes size={30} style={{ color: "#333" }} />
//         </button>
//         <img src={modalImage} alt="Zoomed In" style={{ width: "450px" }} />
//       </Modal>

//       {youtubeError && (
//         <p style={{ color: 'red' }}>Oops! It seems that there was an error loading the YouTube video. Please check your browser settings or try again later.</p>
//       )}
//     </div>
//   );
// };

// export default ShareEvent;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa";
import * as Icon from "react-bootstrap-icons";
import { Helmet } from "react-helmet-async";
import celebration from "../../assets/celebration.gif";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) return true;
  else
  return false;

};

const GOOGLE_MAPS_API_KEY = "AIzaSyAoYQVZtYNzXjpFx7dUCNe_eFqcEepwOp0";

const ShareEvent = () => {
  const [customer, setCustomer] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [youtubeError, setYoutubeError] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  // const { username } = useParams();
  // const  id  = useLocation(); // Extract the id parameter from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [imageUrl,setImageUrl] = useState("")
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    // seconds: 0,
  });
  

  function calculateCountdown(response) {
    const eventDate = new Date(response?.data?.result?.eventdate); // Use optional chaining
          const now = new Date();
          const timeDiff = eventDate.getTime() - now.getTime();
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          // const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setCountdown({ days, hours, minutes, 
            // seconds 
          });
          return {
            days,
            hours,
            minutes,
            // seconds,
          };
        }
      
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(id);
        const response = await axios.post(`${BACKEND_URL}/customerById?id=${id}`);
        // , {
          // userid: user.id,
          // username: username,
        //   eventId: id, // Pass the id to the backend for filtering
        // });

        if (response.data && response.data.result) {
          // console.log(response.data.result);
          setCustomer(response.data.result);
          console.log(response.data.result);
          setImageUrl(BACKEND_URL + "assets/images/" + response.data.result.images[0].file_name)
          calculateCountdown(response); // Calculate the countdown with the response
              // Update countdown every second
        const countdownInterval = setInterval(() => {
          calculateCountdown(response);
        }, 1000);
        // Clear the interval when the component is unmounted or when there's an error
        return () => clearInterval(countdownInterval);
          
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // If an error occurs, set default values for countdown
        calculateCountdown({ data: { result: { eventdate: new Date() } }});
      }
    };
    

    fetchData();
  }, [id]);
  // }, [username]);

  // const filteredCustomer = customer.filter((customerItem) => customerItem.id === id);

  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalImage('');
    setModalIsOpen(false);
  };
  const handleClick = (type) => {
    if (type === "dashboard") {
      navigate("/dashboard");
    }
  };
  const generateShareLink = () => {
   // Construct the shareable link based on the current state of the customer object
   if (!modalImage) {
    // Construct the shareable link based on the current state of the customer object
    const link = `${window.location.origin}/share-event?id=${customer.id}`;
    setShareableLink(link);
  }
  };
  const copyToClipboard = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink);
      alert("Link copied to clipboard!");
    }
  };
  
  
  

 

 // Check if the page is accessed directly
 const isAccessedDirectly =  getUser();
  return (
    <>
    <div style={{ backgroundColor: 'rgba(200, 168, 152, 0.1)', margin: '0px' }}>
     { customer && 
     <Helmet>
       <title>{`Take a Peek into ${customer.event} Celebration`} </title>
       <meta name='description' content={customer.eventdescription} />
       <meta property="og:title" content={`Take a Peek into ${customer.event} Celebration`} />
       <meta property="og:description" content={customer.eventdescription} />
       <meta property="og:type" content={"website"} />
       <link rel="canonical" href={`https://chromagz.com/share-event?id=${customer.id}`} />
     </Helmet>}
     <div style={{ position: 'relative' }}>
       <div style={{ position: 'absolute', top: 5 }}><img style={{ width: '100%' }} src={celebration} alt="" /></div>
       <div style={{display:'flex',justifyContent:'space-between', paddingTop: '20px'}}>
        <p></p>
        {/* {isAccessedDirectly && (<div style={{marginTop: "10px"}} onClick={() => {handleClick("dashboard")}}><Icon.X size={25}  /></div>)} */}
        </div>
      {/* <h3 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>{customer.eventdescription}</h3> */}
      <h1 style={{ fontFamily: 'Almendra Display', color: '#678983',marginTop: "10px", textAlign:"center", fontSize: '28px' }}> Join us <br/> on</h1>
      <h2 style={{ fontFamily: 'Almendra Display', color: '#678983',marginTop: "10px", textAlign:"center", fontSize: '14px' }}>{customer.eventdate}</h2>
     
      </div>
      {customer && (
        <div  className="content">
          <div className="mb-4"> 
            {/* <p style={{textAlign:'center',fontFamily:'monospace'}}>{customer.eventdate}</p> */}
            </div>
            { 
            countdown.hours>=0 && countdown.days>=0 && 
            <div style={{ display: 'flex', justifyContent:'space-evenly'}}>
              <div className="mb-3" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', background: '#e0e0e0', padding: '8px', borderRadius: '8px' }}>{countdown.days}</span>
                <span style={{ fontSize: '14px' }}>Days</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', background: '#e0e0e0', padding: '8px', borderRadius: '8px' }}>{countdown.hours}</span>
                <span style={{ fontSize: '14px' }}>Hours</span>
             </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', background: '#e0e0e0', padding: '8px', borderRadius: '8px' }}>{countdown.minutes}</span>
              <span style={{ fontSize: '14px' }}>Mins</span>
            </div>
              {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', background: '#e0e0e0', padding: '8px', borderRadius: '8px'}}>{countdown.seconds}</span>
                <span style={{ fontSize: '14px' }}>Seconds</span>
              </div> */}
          </div>}
          {/* <div style={{display:'flex',justifyContent:'space-between'}}>
          <p>{customer.event}</p><p>{customer.eventdate}</p>
          </div> */}
      <div>
        {customer.images &&
      <img
      key={id}
      src={BACKEND_URL + "/assets/images/" + customer.images[0].file_name}
      className="mb-4"
      width="100%"
      height="auto"
      style={{  marginRight: "35px", cursor: 'pointer' }}
      alt=""
      onClick={() => openModal(BACKEND_URL + "/assets/images/" + customer.images[0].file_name)}
    />
  }
      
    </div>
    <div className="mb-4">
    <p style={{ color: '#678983', paddingLeft: '6px' }}>See the glimpse of {customer.event}</p>
        <iframe
      width="100%"
      height="200"
      src={`https://www.youtube.com/embed/${customer.Youtube_urls}`}
      allowFullScreen
      title="YouTube Video"
      frameBorder="0"
      onError={() => setYoutubeError(true)}
    ></iframe>
    </div>
    <div className="mb-5">
      <p style={{ color: '#678983',  paddingLeft: '6px' }}>Click on the following view larger map to see the details in google map</p>
      <iframe   
        width="100%"
          height="200"
          src={`https://www.google.com/maps/embed/v1/place?q=${customer.location}&key=${GOOGLE_MAPS_API_KEY}`}
          allowFullScreen
          title="Location"
          frameBorder="1"
        ></iframe>
      </div>
      {!isAccessedDirectly ? (
            <p></p>
          ) : (
                <div>
                <button onClick={generateShareLink} className="mb-3">Share Event</button>
              {shareableLink && (
            <div>
              <div className="form-group mb-3 input-group">
          <input
            type="link"
            id="shareableLink"
            value={shareableLink}
            className="form-control fs-12 text-center"
            readOnly
           
          />
          <div className="input-group-append">
              <button
                className="btn btn-primary btn-sm w-100 " 
                onClick={copyToClipboard}
              >
                COPY
              </button>
            </div>
            </div>
            <div className="fs-12">Share via:-</div>
            <a
            className="btn btn-link fs-12 text-dark"
          //   href={`whatsapp://send?text=${encodeURIComponent(
          //     `Hi, Attend our auspicious event '${customer.event}' on '${customer.eventdate}' for more details. Click on the link below: ${shareableLink}`
          //     )}%0a${encodeURIComponent(imageUrl)}`}
          //   target="_WhatsUpPage"
          // >
          href={`https://api.whatsapp.com/send?&text=${shareableLink}`}
          // ://send?text=${encodeURIComponent(
          //   `Hi, Attend our auspicious event '${customer.event}' on '${customer.eventdate}' for more details. Click on the link below: ${shareableLink}`
          // )}%0a${encodeURIComponent(`${BACKEND_URL}/assets/images/${customer.images[0].file_name}`)}`}
            target="_WhatsUpPage"
           > 
            <img
              src={imagePath + "whatsapp.png"}
              width="40"
              height="40"
              alt="whatsapp"
              className="d-flex flex-column align-items-center"
            />
          </a>
            </div>
          )}
        </div>
      )}
      </div>
      )}
<Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                
              }
            }}
          >
            <button
              onClick={closeModal}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                position: "absolute",
                top: "-3px",
                right: "10px",
               
              }}
            >
              <FaTimes size={30} style={{ color: "#333" }} />
            </button>
            <img src={modalImage} alt="Zoomed In" style={{ width: "350px",padding:'10px' }} />
          </Modal>
     

      {youtubeError && (
        <p style={{ color: 'red' }}>Oops! It seems that there was an error loading the YouTube video. Please check your browser settings or try again later.</p>
      )}
    </div>

    </>
 
  );
};

export default ShareEvent;

{/* <img
  key={id}
  src={modalImage && BACKEND_URL + "/assets/images/" + customer.images.file_name}
  className="mb-2"
  style={{ width: "200px", alignItems: 'center', height: "100px", marginRight: "35px", cursor: 'pointer' }}
  alt=""
  onClick={() => openModal(modalImage && BACKEND_URL + "/assets/images/" + customer.images.file_name)}
/> */}
      {/* <img
      key={id}
      src={BACKEND_URL + "/assets/images/" + customer.image.file_name}
      className="mb-2"
      style={{ width: "200px", alignItems: 'center', height: "100px", marginRight: "35px", cursor: 'pointer' }}
      alt=""
      onClick={() => openModal(BACKEND_URL + "/assets/images/" + customer.image.file_name)}
    /> */}
  //   <Modal
  //   isOpen={modalIsOpen}
  //   onRequestClose={closeModal}
  //   style={{
  //     content: {
  //       top: '50%',
  //       left: '50%',
  //       right: 'auto',
  //       bottom: 'auto',
  //       marginRight: '-50%',
  //       transform: 'translate(-50%, -50%)',
  //     }
  //   }}
  // >
  //   <button
  //     onClick={closeModal}
  //     style={{
  //       border: "none",
  //       background: "none",
  //       cursor: "pointer",
  //       position: "absolute",
  //       top: "-5px",
  //       right: "10px",
  //     }}
  //   >
  //     <FaTimes size={30} style={{ color: "#333" }} />
  //   </button>
  //   <img src={modalImage} alt="Zoomed In" style={{ width: "450px" }} />
  // </Modal>