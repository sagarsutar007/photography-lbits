// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { BACKEND_URL } from "../utilities/constants";
// // // import { useParams } from "react-router-dom";

// // // const getUser = () => {
// // //   let user = localStorage.getItem("user");
// // //   if (user) user = JSON.parse(user);
// // //   else user = null;
// // //   return user;
// // // };

// // // const Portfolio = () => {
// // //   const [portfolio, setPortfolio] = useState([]);
// // //   const { username } = useParams();

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const user = getUser();
// // //         const response = await axios.post(BACKEND_URL + "/portfolio", {
// // //           userid: user.id,
// // //           username: username,
// // //         });

// // //         // Log the entire response to check its structure
// // //         console.log("Response:", response);

// // //         if (response.data && response.data.result) {
// // //           setPortfolio(response.data.result);
// // //         } else {
// // //           console.error("Invalid response data:", response.data);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching portfolio data:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [username]);

// // //   return (
// // //     <div className="v-95">
// // //       <h3 style={{ marginTop: "35px",color:'#678983',fontFamily:'sans-serif' }}>Portfolio</h3>

// // //       <table style={{ border: "none" }} className="table">
       
     
// // //           {portfolio.map((portfolioItem) => (
// // //             <React.Fragment key={portfolioItem.id}>
// // //               <tr>
               
// // //                 <td style={{paddingRight:'65px'}}>{portfolioItem.event}</td>
// // //                 <td >{portfolioItem.eventdate}</td>
// // //               </tr>
// // //               <tr>
// // //                 <td colSpan="3">
// // //                   <div style={{ display: "flex",marginTop:'20px' }}>
// // //                     {portfolioItem.images.map((image, index) => (
// // //                       <React.Fragment key={index}>
// // //                         <img
// // //                           src={BACKEND_URL + "/assets/images/" + image.file_name}
// // //                           className="mb-2"
// // //                           style={{ width: "85px",height:"80px", marginRight: "10px" }}
// // //                           alt=""
// // //                         />
// // //                       </React.Fragment>
// // //                     ))}
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             </React.Fragment>
// // //           ))}
       
// // //       </table>
// // //       <iframe width="200" height="250" src="http://example.com/your-video-url" frameborder="0" allowfullscreen></iframe>
      
// // //     </div>
// // //   );
// // // };

// // // export default Portfolio;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { BACKEND_URL } from "../utilities/constants";
// // import { useParams } from "react-router-dom";
// // import VideoPlayer from './VideoPlayer'; // Adjust the import path
// // import { Youtube } from "react-bootstrap-icons";

// // const getUser = () => {
// //   let user = localStorage.getItem("user");
// //   if (user) user = JSON.parse(user);
// //   else user = null;
// //   return user;
// // };

// // const Portfolio = () => {
// //   const [portfolio, setPortfolio] = useState([]);
// //   const { username } = useParams();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const user = getUser();
// //         const response = await axios.post(BACKEND_URL + "/portfolio", {
// //           userid: user.id,
// //           username: username,
// //         });

// //         // Log the entire response to check its structure
// //         console.log("Response:", response);

// //         if (response.data && response.data.result) {
// //           setPortfolio(response.data.result);
// //         } else {
// //           console.error("Invalid response data:", response.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching portfolio data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [username]);

// //   return (
// //     <div className="v-95">
// //       <h3 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>Portfolio</h3>

// //       <table style={{ border: "none" }} className="table">

// //         {portfolio.map((portfolioItem) => (
// //           <React.Fragment key={portfolioItem.id}>
// //             <tr>

// //               <td style={{ paddingRight: '65px' }}>{portfolioItem.event}</td>
// //               <td >{portfolioItem.eventdate}</td>
// //             </tr>
// //             <tr>
// //               <td colSpan="3">
// //                 <div style={{ display: "flex", marginTop: '20px' }}>
// //                   {portfolioItem.images.map((image, index) => (
// //                     <React.Fragment key={index}>
// //                       <img
// //                         src={BACKEND_URL + "/assets/images/" + image.file_name}
// //                         className="mb-2"
// //                         style={{ width: "85px", height: "80px", marginRight: "10px" }}
// //                         alt=""
// //                       />
// //                     </React.Fragment>
// //                   ))}
// //                 </div>
// //               </td>
// //             </tr>
// //             <iframe width="200" height="200" src={portfolioItem.Youtube_urls} ></iframe>
// //           </React.Fragment>
          
// //         ))}
         
// //       </table>
      
// //     </div>
// //   );
// // };

// // export default Portfolio;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../utilities/constants";
// import { useParams } from "react-router-dom";
// import YouTube from "react-youtube";

// const getUser = () => {
//   let user = localStorage.getItem("user");
//   if (user) user = JSON.parse(user);
//   else user = null;
//   return user;
// };

// const Portfolio = () => {
//   const [portfolio, setPortfolio] = useState([]);
//   const { username } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = getUser();
//         const response = await axios.post(BACKEND_URL + "/portfolio", {
//           userid: user.id,
//           username: username,
//         });

//         // Log the entire response to check its structure
//         console.log("Response:", response);

//         if (response.data && response.data.result) {
//           setPortfolio(response.data.result);
//         } else {
//           console.error("Invalid response data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching portfolio data:", error);
//       }
//     };

//     fetchData();
//   }, [username]);

//   return (
//     <div className="v-95">
//       <h3 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>Portfolio</h3>

//       <table style={{ border: "none" }} className="table">

//         {portfolio.map((portfolioItem) => (
//           <React.Fragment key={portfolioItem.id}>
//             <tr>
//               <td >{portfolioItem.event}</td>
//               <td style={{ paddingRight: '50px' }}> {portfolioItem.eventdate}</td>
//             </tr>
//             <tr>
//               <td colSpan="3">
//                 <div style={{ display: "flex", marginTop: '20px', flexWrap: 'wrap' }}>
//                   {portfolioItem.images.map((image, index) => (
//                     <React.Fragment key={index}>
//                       <img
//                         src={BACKEND_URL + "/assets/images/" + image.file_name}
//                         className="mb-2"
//                         style={{ width: "85px", height: "80px", marginRight: "10px" }}
//                         alt=""
//                       />
                      
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </td>
//             </tr>

//             <tr>
//               <td colSpan="3">
//               <iframe width="265" height="200"
// src={`https://www.youtube.com/embed/${portfolioItem.Youtube_urls}`}>
// </iframe>
//               </td>
//             </tr>
//           </React.Fragment>
          
          
//         ))}

//       </table>
//     </div>
//   );
// };

// export default Portfolio;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../utilities/constants";
// import { useParams } from "react-router-dom";

// import Modal from 'react-modal';

// const getUser = () => {
//   let user = localStorage.getItem("user");
//   if (user) user = JSON.parse(user);
//   else user = null;
//   return user;
// };

// const Portfolio = () => {
//   const [portfolio, setPortfolio] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalImage, setModalImage] = useState('');
//   const { username } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = getUser();
//         const response = await axios.post(BACKEND_URL + "/portfolio", {
//           userid: user.id,
//           username: username,
//         });

//         // Log the entire response to check its structure
//         console.log("Response:", response);

//         if (response.data && response.data.result) {
//           setPortfolio(response.data.result);
//         } else {
//           console.error("Invalid response data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching portfolio data:", error);
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

//   return (
//     <div className="v-95">
//       <h3 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>Portfolio</h3>

//       <table style={{ border: "none" }} className="table">

//         {portfolio.map((portfolioItem) => (
//           <React.Fragment key={portfolioItem.id}>
//             <tr>
//               <td>{portfolioItem.event}</td>
//               <td style={{ paddingRight: '50px' }}>{portfolioItem.eventdate}</td>
//             </tr>
//             <tr>
//               <td colSpan="3">
//                 <div style={{ display: "flex", marginTop: '20px', flexWrap: 'wrap' }}>
//                   {portfolioItem.images.map((image, index) => (
//                     <React.Fragment key={index}>
//                       <img
//                         src={BACKEND_URL + "/assets/images/" + image.file_name}
//                         className="mb-2"
//                         style={{ width: "85px", height: "80px", marginRight: "10px", cursor: 'pointer' }}
//                         alt=""
//                         onClick={() => openModal(BACKEND_URL + "/assets/images/" + image.file_name)}
//                       />
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </td>
//             </tr>

//             <tr>
//               <td colSpan="3">
//                 <iframe width="265" height="200"
//                   src={`https://www.youtube.com/embed/${portfolioItem.Youtube_urls}`}>
//                 </iframe>
//               </td>
//             </tr>
//           </React.Fragment>
//         ))}

//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           style={{
//             content: {
//               top: '50%',
//               left: '50%',
//               right: 'auto',
//               bottom: 'auto',
//               marginRight: '-50%',
//               transform: 'translate(-50%, -50%)',
//             }
//           }}
//         >
//           <button onClick={closeModal}>close</button>
//           <img src={modalImage} alt="Zoomed In" style={{ width: "450px" }} />
//         </Modal>
//       </table>
//     </div>
//   );
// };

// export default Portfolio;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa"; // Import the FaTimes cross-mark icon

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUser();
        const response = await axios.post(BACKEND_URL + "/portfolio", {
          userid: user.id,
          username: username,
        });

        if (response.data && response.data.result) {
          setPortfolio(response.data.result);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, [username]);

  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalImage('');
    setModalIsOpen(false);
  };

  return (
    <div className="v-95">
      <h3 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>Portfolio</h3>

      <table style={{ border: "none" }} className="table">

        {portfolio.map((portfolioItem) => (
          <React.Fragment key={portfolioItem.id}>
            <tr style={{display:'flex'}}>
              <td style={{ marginRight: '120px' }}>{portfolioItem.event}</td>
              <td >{portfolioItem.eventdate}</td>
            </tr>
            <tr>
              <td colSpan="3">
                <div style={{ display: "flex", marginTop: '20px', flexWrap: 'wrap' }}>
                  {portfolioItem.images.map((image, index) => (
                    <React.Fragment key={index}>
                      <img
                        src={BACKEND_URL + "/assets/images/" + image.file_name}
                        className="mb-2"
                        style={{ width: "85px",alignItems:'center',height: "80px", marginRight: "35px", cursor: 'pointer' }}
                        alt=""
                        onClick={() => openModal(BACKEND_URL + "/assets/images/" + image.file_name)}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="3">
                <iframe width="265" height="200"
                  src={`https://www.youtube.com/embed/${portfolioItem.Youtube_urls}`}>
                </iframe>
              </td>
            </tr>
          </React.Fragment>
        ))}

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
              top: "-5px",
              right: "10px",
            }}
          >
            <FaTimes size={30} style={{ color: "#333" }} />
          </button>
          <img src={modalImage} alt="Zoomed In" style={{ width: "450px" }} />
        </Modal>
      </table>
    </div>
  );
};

export default Portfolio;
