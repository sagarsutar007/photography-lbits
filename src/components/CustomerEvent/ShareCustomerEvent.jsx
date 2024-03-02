// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Topbar from "../Topbar/Topbar";
// import { Card, CardBody } from 'reactstrap';

// import axios from "axios";
// import { BACKEND_URL } from "../../utilities/constants";
// import { useParams } from "react-router-dom";

// const getUser = () => {
//   let user = localStorage.getItem("user");
//   if (user) user = JSON.parse(user);
//   else user = null;
//   return user;
// };
// const ShareCustomerEvent = () => {
//   const [customer, setCustomer] = useState([]);
//   const { username } = useParams();
 
  
//   const navigate = useNavigate();
//   const handleClick = (eventId) => {
//     // Navigate to the ManageCustomerEvent page with the event ID as query parameters
//     navigate(`/manage-customer-event?eventId=${eventId}`);
//   };
  
//   // const handleClick = (event) => {
//   //   const eventDataForNavigation = {
//   //     eventDescription: event.eventdescription,
//   //     eventDate: event.eventdate,
//   //     // Add other relevant data as needed
//   //   };
//   //   try {
//   //     // Attempt to stringify the extracted data
//   //     const eventDataString = JSON.stringify(eventDataForNavigation);
      
//   //     // Navigate to the ManageCustomerEvent page with the stringified data as query parameters
//   //     navigate(`/manage-customer-event?event=${encodeURIComponent(eventDataString)}`);
//   //   } catch (error) {
//   //     // Handle the error, log it, or take appropriate action
//   //     console.error("Error stringifying data:", error);
//   //   }
//   // };

//   // const handleClick = () => {
//   //   // Navigate to the ManageCustomerEvent page
//   //   navigate("/manage-customer-event");
//   // };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = getUser();
//         const response = await axios.post(BACKEND_URL + "/customer", {
//           userid: user.id,
//           username: username,
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

  
//   return (
//     <div className="v-95">
//       <Topbar prevPage={"/dashboard"} pageTitle={"customerevent"} />
//       <div className="d-flex align-items-center">
//         <div className="mr-4"> {/* Adjust margin as needed */}
//           <b>CustomerEvent:</b>
//         </div>
//         <div>
//           <button
//             style={{ marginLeft: "20px", width: "200px" }}
//             onClick={handleClick}
//             className="btn btn-primary btn-sm"
//           >
//             Create
//           </button>
//         </div>
//       </div>
   
//       <div style={{marginTop:'20px'}}>
//       <Card>
//         <CardBody>
//          <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
//             <p>Event Description </p>
//             <p> Event Date</p>
//          </div>
      
//          <div  >
//          {customer.map((event, index) => (
//             <div  style={{display:'flex', justifyContent:'space-between'}}key={index}>
//               <p>{event.eventdescription}</p>
//               <p>{event.eventdate}</p>

//          </div>
        

//          ))}
//          </div>
//          <div>
//        <p style={{fontWeight:'bold'}}> Event Date</p>
//        </div>
//          <div>
//           {customer.map((event, index) => (
//          <p>{event.event}</p>
//           ))}
//           </div>
        
//         </CardBody>
//       </Card>
//     </div>
      
//     </div>
//   );
// };

// export default ShareCustomerEvent;



// // <table>
// //         <thead>
// //           <tr>
//             // <th>Event Description</th>
// //             </tr>
// //             <tr>
// //             <th>Event Date</th>
// //             </tr>
// //             <tr>
// //             <th>Event </th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {customer.map((event, index) => (
// //             <tr key={index}>
// //               <td>{event.eventdescription}</td>
// //               <td>{event.eventdate}</td>
// //               <td>{event.event}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../Topbar/Topbar";
import { Card, CardBody } from 'reactstrap';

import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
import { useParams } from "react-router-dom";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};
const ShareCustomerEvent = () => {
  const [customer, setCustomer] = useState([]);
  const { username } = useParams();
 
  
  const navigate = useNavigate();


  const handleClick = () => {
    // Navigate to the ManageCustomerEvent page
    navigate("/manage-customer-event");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUser();
        const response = await axios.post(BACKEND_URL + "/customer", {
          userid: user.id,
          username: username,
        });

        if (response.data && response.data.result) {
          setCustomer(response.data.result);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, [username]);

  
  return (
    <div >
      <Topbar prevPage={"/dashboard"} pageTitle={"customerevent"} />
      <div className="d-flex align-items-center">
        <div className="mr-4"> {/* Adjust margin as needed */}
          <b>CustomerEvent:</b>
        </div>
        <div>
          <button
            style={{ marginLeft: "20px", width: "200px" }}
            onClick={handleClick}
            className="btn btn-primary btn-sm"
          >
            Create
          </button>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {customer.map((event, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardBody>
              <div >
                <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>Event Description: <p style={{fontWeight:'lighter',textTransform: 'capitalize'}}>{event.eventdescription}</p></p>
                <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>Event Date:<p style={{fontWeight:'lighter'}}> {event.eventdate}</p></p>
                <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>Event: <p style={{fontWeight:'lighter',textTransform: 'capitalize'}}>{event.event}</p></p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
   
  );
};

export default ShareCustomerEvent;