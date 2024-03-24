import React,{useEffect,useState} from "react";
import WebFont from 'webfontloader';
import * as Icon from "react-bootstrap-icons";
// import { Helmet } from "react-helmet";
import axios from "axios";
import { BACKEND_URL } from "../../utilities/constants";
import { useParams,useLocation, useNavigate } from "react-router-dom";
// import Modal from 'react-modal';
import { Helmet } from "react-helmet-async";


const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) return true;
  else
  return false;

};


// const timelineData = [
  // { date: " NOVEMBER 5TH, 9:00 AM ONWARDS", title: "Groom Making", description: "Warangal Groom home", imageUrl:"https://i.postimg.cc/3xSRrDG9/gh.png" },
  // { date: " NOVEMBER 5TH, 11:00 AM ONWARDS", title: "Groom Haldi", description: "Warangal Groom home",imageUrl:"https://i.postimg.cc/HxwVd3SV/gm.png" },
  // { date: "NOVEMBER 7TH, 9:00 AM ONWARDS", title: "Bride Haldi", description: "Chilkaluripet Bride Home",imageUrl:"https://i.postimg.cc/TYqFgbsg/gh1.png" },
  // { date: "NOVEMBER 7TH, 5:00 PM ONWARDS", title: "Mehendi", description: "Chilkaluripet Bride Home",imageUrl:"https://i.postimg.cc/TwDHw5my/gh2.png "},
  // { date: "NOVEMBER 8TH, 7:00 AM ONWARDS", title: "Pellikuthuru Making", description: "Chilkaluripet Bride Home",imageUrl:"https://i.postimg.cc/BvyV4B89/gh3.png" },
  // { date: "NOVEMBER 8TH, 9:54 PM ONWARDS", title: "Wedding", description: "A1 Function Hall SR Nagar Main Road,Hyderabad",imageUrl:"https://i.postimg.cc/N0Lz3zjk/gh4.png" },
  // { date: " NOVEMBER 10TH, 7:00 PM ONWARDS", title: "Reception", description: "Assuntha Bhavan, Opp. D-Mart, Hanumakonda.",imageUrl:"https://i.postimg.cc/7hrtTPMK/gh5.png" }
// ];
// const TimelineEvent = ({ date, title, description, imageUrl }) => (
//   <div className="timeline-event" style={{ width: '300px',height:'220px',marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', position: 'relative' }}>
//     <div className="event-date" style={{ fontSize: '12px', fontWeight: 'bold',backgroundColor:'#EABF86',textTransform:'uppercase',color:'#fff',fontFamily:'"Alice", Sans-serif',padding:'5px' }}> <Icon.ClockFill size={18} />{date}</div>
//     <div className="event-content" style={{ marginBottom: '100px' }}>
//       <div className="event-title" style={{ fontSize: '26px', marginBottom: '10px', color: '#333',fontFamily:'"Alice", Sans-serif' }}>{title}</div>
//       <p className="event-description" style={{ fontSize: '16px', color: '#7A7A7A',fontWeight:'400',boxSizing:'border-box',overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>{description}</p>
//     </div>
//     {imageUrl && (
//       <div className="event-image" style={{ position: 'absolute', bottom: '5px', right: '2px', width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}>
//         <img src={imageUrl} alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', left: '10px' }} />
//       </div>
//     )}
//   </div>
// );

// // Component for rendering the entire timeline
// const Timeline = ({ events }) => (
//   <ul className="timeline" style={{ listStyle: 'none', paddingLeft: 0 }}>
//     {events.map((event, index) => (
//       <li key={index} style={{ position: 'relative', display: 'flex', marginBottom: '20px' }}>
//         <div className="bullet" style={{ width: '10px', height: '10px', backgroundColor: '#EABF86', borderRadius: '50%', marginRight: '20px' }} />
//         <div>
//           <TimelineEvent {...event} />
//         </div>
//       </li>
//     ))}
//   </ul>
// );

// const Carousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds (adjust as needed)

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div style={carouselContainerStyle}>
//       {images.map((imageUrl, index) => (
//         <img
//           key={index}
//           src={imageUrl}
//           alt={`Slide ${index + 1}`}
//           style={{
//             ...imageStyle,
            // opacity: index === currentIndex ? 1 : 0,
            // transition: "opacity 1s ease-in-out",
            // clipPath: "circle(45% at center)",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const carouselContainerStyle = {
//   position: "relative",
//   width: "100%",
//   height: "400px", // Adjust height as needed
//   overflow: "hidden",
// };


// const imageStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
// };
// const imagePath = BACKEND_URL + "/assets/images/" ;
// const images = [
//   imagePath + "p1.jpeg",
//   imagePath + "p2.jpg",
//   imagePath + "p3.jpg",
//   imagePath + "p4.jpg",
//   imagePath + "p5.jpg",
//   imagePath + "p6.jpg"

// ];





const ShareEvent = () => {
  const [customer, setCustomer] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timelineData, setTimelineData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  // const [youtubeError, setYoutubeError] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [imageUrl,setImageUrl] = useState("")
   let { type } = useParams();
  console.log(type);
  const splittedData = type.split(/[&-]/);
console.log(splittedData);
const firstValue = splittedData[0];
const secondValue = splittedData[1];
console.log(firstValue, secondValue);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Alice:400,700', 'Cedarville:400,700','Ojuju:400,700','Alex Brush:400,700', 'Nanum Myeongjo:400,700','EB Garamond:400,700','Sans-serif:400,500,700', 'Cursive:400,500,700'], // Replace with your selected font and variants
      },
    });
    
  }, []);

  document.title = customer.groomName + "-" + customer.brideName+ "-"+" Wedding Invitation";
  useEffect(() => {
    const generateTimelineData = () => {
      if (customer) {
        const timelineEvents = [];
        if (customer.GroomMakingDate && customer.GroomMakingTime != "00:00:00") {
          timelineEvents.push({
             date: customer.GroomMakingDate+ " " + convertTimeToAMPM(customer.GroomMakingTime), title: "Groom Making", description: customer.GroomMakingLocation, imageUrl:"https://i.postimg.cc/3xSRrDG9/gh.png" 
          });
        }
if (customer.GroomHaldiDate && customer.GroomHaldiTime != "00:00:00") {
  timelineEvents.push({
    date: customer.GroomHaldiDate+ " " + convertTimeToAMPM(customer.GroomHaldiTime), title: "Groom Haldi", description: customer.GroomHaldiLocation,imageUrl:"https://i.postimg.cc/HxwVd3SV/gm.png"
  });
}
if (customer.BrideHaldiDate && customer.BrideHaldiTime != "00:00:00") {
  timelineEvents.push({
    date: customer.BrideHaldiDate+ " " + convertTimeToAMPM(customer.BrideHaldiTime), title: "Bride Haldi", description: customer.BrideHaldiLocation,imageUrl:"https://i.postimg.cc/TYqFgbsg/gh1.png"
  });
}
if (customer.MehandiDate && customer.MehandiTime != "00:00:00") {
  timelineEvents.push({
    date: customer.MehandiDate+ " " + convertTimeToAMPM(customer.MehandiTime), title: "Mehendi", description: customer.MehendiLocation,imageUrl:"https://i.postimg.cc/TwDHw5my/gh2.png "
  });
}

if (customer.GroomMakingDate && customer.GroomMakingTime != "00:00:00") {
  timelineEvents.push({ 
    date: customer.BrideMakingDate+ " " + convertTimeToAMPM(customer.BrideMakingTime) , title: "Bride Making", description:customer.BrideMakingLocation,imageUrl:"https://i.postimg.cc/BvyV4B89/gh3.png"
  });
}
  
if (customer.weddingDate!="0000-00-00" && customer.weddingTime != "00:00:00") {
  timelineEvents.push({ 
   date: customer.weddingDate+ " " + convertTimeToAMPM(customer.weddingTime), title: "Wedding", description: customer.WeddingLocation,imageUrl:"https://i.postimg.cc/N0Lz3zjk/gh4.png" 
  });
}
if (customer.ReceptionDate && customer.ReceptionTime != "00:00:00") {
  timelineEvents.push({ 
   date: customer.ReceptionDate+ " " + convertTimeToAMPM(customer.ReceptionTime) , title: "Reception", description: customer.ReceptionLocation,imageUrl:"https://i.postimg.cc/7hrtTPMK/gh5.png"
  });
  }
      setTimelineData(timelineEvents);
    }
    };


    generateTimelineData();
  }, [customer]);

  const TimelineEvent = ({ date, title, description, imageUrl }) => (
   
    <div className="timeline-event" style={{ width: '300px',height:'220px',marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', position: 'relative' }}>
      <div className="event-date" style={{ fontSize: '18px', fontWeight: 'bold',backgroundColor:'#EABF86',textTransform:'uppercase',color:'#fff',fontFamily:'"Alice", Sans-serif',padding:'5px' }}> <Icon.ClockFill size={18} />{date}</div>
      <div className="event-content" style={{ marginBottom: '100px' }}>
        <div className="event-title" style={{ fontSize: '26px', marginBottom: '10px', color: '#333',fontFamily:'"Alice", Sans-serif' }}>{title}</div>
        <p className="event-description" style={{ fontSize: '16px', color: '#7A7A7A',fontWeight:'400',boxSizing:'border-box',overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>{description}</p>
      </div>
      {imageUrl && (
        <div className="event-image" style={{ position: 'absolute', bottom: '5px', right: '2px', width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}>
          <img src={imageUrl} alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', left: '10px' }} />
        </div>
        )}
     
    </div>

  );
  
  // Component for rendering the entire timeline
  const Timeline = ({ events }) => (
    <ul className="timeline" style={{ listStyle: 'none', paddingLeft: 0 }}>
      {events.map((event, index) => (
        <li key={index} style={{ position: 'relative', display: 'flex', marginBottom: '20px' }}>
          <div className="bullet" style={{ width: '10px', height: '10px', backgroundColor: '#EABF86', borderRadius: '50%', marginRight: '20px' }} />
        
          <div>
            <TimelineEvent {...event} />
          </div>
        
        </li>
      ))}
    </ul>
  );
  useEffect(() => {
    const interval = setInterval(() => {
      if (customer && customer.images) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % customer.images.length);
   } }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [customer]);
  const carouselContainerStyle = {
    position: "relative",
    width: "100%",
    height: "400px", // Adjust height as needed
    overflow: "hidden",
  };

  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(BACKEND_URL + "/assets/images/" + images.file_name); // Adjust the endpoint URL accordingly
  //       setImages(response.data.images); // Assuming the response data contains an array of image URLs
  //     } catch (error) {
  //       console.error('Error fetching images:', error);
  //     }
  //   };

  //   fetchImages();

  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 3000); // Change image every 3 seconds (adjust as needed)

  //   return () => clearInterval(interval);
  // }, []);

  // return (
  //   <div style={carouselContainerStyle}>
  //     {images.map((imageUrl, index) => (
  //       <img
  //         key={index}
  //         src={imageUrl}
  //         alt={`Slide ${index + 1}`}
  //         style={{
  //           ...imageStyle,
  //           opacity: index === currentIndex ? 1 : 0,
  //           transition: "opacity 1s ease-in-out",
  //           clipPath: "circle(45% at center)",
  //         }}
  //       />
  //     ))}
  //   </div>
  // );
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(id);
        console.log(type);
        const response = await axios.post(`${BACKEND_URL}/customerByName?GroomName=${firstValue}&BrideName=${secondValue}` );
        // const response = await axios.post(`${BACKEND_URL}/customerById?id=${id}`);
        if (response.data && response.data.result) {
          // console.log(response.data.result);
          setCustomer(response.data.result);
          console.log(response.data.result);
          setImageUrl(BACKEND_URL + "assets/images/" + response.data.result.images[0].file_name)
          
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    

    fetchData();
  }, [id]);
  const openModal = (image) => {
        setModalImage(image);
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalImage('');
        setModalIsOpen(false);
      };
      // const handleClick = (type) => {
      //   if (type === "dashboard") {
      //     navigate("/dashboard");
      //   }
      // };
      // const generateShareLink = () => {
      //  // Construct the shareable link based on the current state of the customer object
      //  if (!modalImage) {
      //   // Construct the shareable link based on the current state of the customer object
      //   const link = `${window.location.origin}/share-event?id=${customer.id}`;
      //   setShareableLink(link);
      // }
      // };
      // const copyToClipboard = () => {
      //   if (shareableLink) {
      //     navigator.clipboard.writeText(shareableLink);
      //     alert("Link copied to clipboard!");
      //   }
      // };
      
    

useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementOffset = document.getElementById('fade-in').offsetTop;
      const distance = scrollTop + window.innerHeight - elementOffset;

      if (distance > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
       // Reset visibility when scrolling back to the top
       if (scrollTop === 0) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function convertTimeToAMPM(time24) {
    if (!time24) {
        return "Invalid input";
    }

    const [hours, minutes] = time24.split(':');
    let suffix = 'AM';
    let hours12 = parseInt(hours, 10);
    
    if (hours12 >= 12) {
        suffix = 'PM';
        if (hours12 > 12) {
            hours12 -= 12;
        }
    }
    if (hours12 === 0) {
        hours12 = 12; // 12 AM
    }
    
    return `${hours12}:${minutes} ${suffix}`;
}
  
function formatDate(inputDateString) {
  // Parse input date string into a Date object
  const date = new Date(inputDateString);
  
  // Months array for converting month index to month name
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Extract year, month (as index), and day from the Date object
  // const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();
  
  // Convert month index to month name
  const monthName = months[monthIndex];
  
  // Construct the formatted date string
  // const formattedDateString = `${year} ${monthName} ${day}`;
  const formattedDateString = ` ${monthName} ${day}`;

  return formattedDateString;
}

// function DateConverter({ dateString }) {
//   // Call formatDate function to get formatted date
//   const formattedDate = formatDate(dateString);
// }


  
  
  return(
    <>
    <Helmet>
        <title>{type}</title>
        <meta property="og:title" content="Sai & Pavani's Wedding Invitation" />
        <meta property="og:description" content="Join us in celebrating the wedding of Sai and Pavani!" />
        <meta property="og:image" content="https://i.postimg.cc/0jdh42zf/m6.jpg" /> 
        <meta property="og:url" content="https://chromagz.com/sai-pavani-wedding-invitation" />
      </Helmet>

      {/* {type ===  customer.groomName+ "-" + customer.brideName+ "-"+" Wedding Invitation" } */}
    <div style={{marginTop:'10px'}}>
    
           <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           {customer.images &&
      <img
      key={id}
      src={BACKEND_URL + "/assets/images/" + customer.images[0].file_name}
      className="mb-4"
      width="100%"
      height="auto"
      // style={{  marginRight: "35px", cursor: 'pointer' }}
      alt=""
      onClick={() => openModal(BACKEND_URL + "/assets/images/" + customer.images[0].file_name)}
    />
  }
        </div>
        <div style={{textAlign:'center',justifyContent:'center'}} className="mt-3">
          <h6 style={{fontSize:'18px', fontFamily:'"Alice", Sans-serif',letterSpacing:'2px',boxSizing:'border-box'}}>TOGETHER WITH THEIR FAMILIES</h6>
          <h2 style={{fontSize:'60px',fontFamily:'"Alex Brush", Sans-serif',padding:'0px',lineHeight:'1',boxSizing:'border-box',color:'#52956B'}}>{customer.groomName}</h2>
          <h2 style={{fontSize:'60px',fontFamily:'"Alex Brush", Sans-serif',padding:'0px',lineHeight:'1',boxSizing:'border-box',color:'#C1D57F'}}>&</h2>
          <h2 style={{fontSize:'60px',fontFamily:'"Alex Brush", Sans-serif',padding:'0px',lineHeight:'1',boxSizing:'border-box',color:'#52956B'}}>{customer.brideName}</h2>
          <h6 style={{fontSize:'18px',letterSpacing:'2px',fontFamily:'"Alice", Sans-serif',lineHeight:'1',boxSizing:'border-box'}}>Invite  You To Celebrate</h6>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{  padding: '10px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px',fontWeight:'800',lineHeight:'1.2rem',fontFamily:'"Nanum Myeongjo", Sans-serif' }}>{formatDate(customer.weddingDate)}</h2>
          </div>
          <div style={{ padding: '10px', textAlign: 'center',fontWeight:'bold',borderLeft: '4px solid gold',borderRight: '4px solid gold' }}>
            <h6 style={{ fontSize: '14px',lineHeight:'1.2rem',fontFamily:'"Nanum Myeongjo", Sans-serif',boxSizing:'border-box' }}>{customer.weddingLocation}</h6>
            {/* <p style={{ fontSize: '18px' }}>SR Nagar Main Road,<br/> Hyderabad</p> */}
          </div>
          <div style={{ padding: '25px', textAlign: 'center' ,fontWeight:'bold'}}>
            <h2 style={{ fontSize: '20px',lineHeight:'1.2rem',fontWeight:'800' }}>{convertTimeToAMPM(customer.weddingTime)}</h2>
          </div>
        </div>
        </div>
        <div>
          <h3 className="mt-3" style={{color:'#52956B',fontFamily: '"Alex Brush", Sans-serif',textAlign:'center',lineHeight:'1'}}>Save The Date</h3>
        </div>
      
      {/* <div style={{position:'relative', width: '100%', height: '100%'}}>
          <img
          src='https://i.postimg.cc/sDh08Y2w/bg1.jpg'
          alt='no image found'
          width='100%'
          height='100%'
          style={{ transition: 'opacity 1s ease-in-out' }}

          />
          <img
          //  src='https://i.postimg.cc/nzNNj0z9/card.jpg'
           src='https://i.postimg.cc/V6D62zn1/mce.jpg'
           alt='no image found'
           style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(-30%)',
            maxWidth: '80%', // Adjust as needed
            maxHeight: '80%', // Adjust as needed
            transition: 'transform 1s ease-in-out', // Apply transition to transform property
          }}
          />
        </div> */}
       
       <div style={{ position: 'relative', textAlign: 'center', height: '25vh', overflow: 'hidden' }}>
      <style>
        {`
          @keyframes fade-in-top {
            0% {
              opacity: 0;
              transform: translateY(-50%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-bottom {
            0% {
              opacity: 0;
              transform: translateY(50%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div>
      <div id="fade-in" style={{ position: 'absolute', top: '10%', left: '20%', transform: 'translateX(-50%)', opacity: isVisible ? 1 : 0, animation: isVisible ? 'fade-in-top 2s forwards' : 'none' }}>
        <h2 style={{ fontSize: '80px', color: '#EFEFEF', fontStyle: 'italic', letterSpacing: '-2.5px', fontFamily: '"Alice", Sans-serif' }}>LOVE</h2>
      </div>
      <div style={{ position: 'absolute',bottom:'10%', transform: 'translateX(-50%)', opacity: isVisible ? 1 : 0, animation: isVisible ? 'fade-in-bottom 2s forwards' : 'none' }}>
        <div>
          <h3 style={{ fontFamily: '"EB Garamond", Sans-serif' }}>Our Story</h3>
          <p style={{ fontSize: '16px', lineHeight: '1.5rem', letterSpacing: '2px', fontWeight: '500', fontFamily: '"EB Garamond", Sans-serif' }}>We invite you to join us in celebrating our love</p>
        </div>
      </div>
    </div>
    </div>
    {/* <div  style={carouselContainerStyle}>
    <Carousel images={images} />
    </div> */}
    <div style={carouselContainerStyle}>

    {customer.images && customer.images.slice(1).map((image, index) => (
      <img
      key={index}
      src={`${BACKEND_URL}/assets/images/${image.file_name}`}
      className="mb-4"
      width="100%"
      height="auto"
      alt={`Slide ${index + 1}`}
          style={{
            ...imageStyle,
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            clipPath: "circle(45% at center)",
          }}
      onClick={() => openModal(`${BACKEND_URL}/assets/images/${image.file_name}`)}
    />
  ))}
  </div>
    
    <div>
          
         
      
      </div>

      
    
    <div style={{ position: 'relative', textAlign: 'center', height: '20vh', overflow: 'hidden' }}>
      <style>
        {`
          @keyframes fade-in-top {
            0% {
              opacity: 0;
              transform: translateY(-50%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-bottom {
            0% {
              opacity: 0;
              transform: translateY(50%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    <div id="fade-in" style={{ position: 'absolute', top: '10%', left: '20%', transform: 'translateX(-50%)', opacity: isVisible ? 1 : 0, animation: isVisible ? 'fade-in-top 2s forwards' : 'none'  }}>
      <img id= "fade-in" src="https://i.postimg.cc/tJdCJd2Z/splatter-bg.png" alt="background" style={{width:'100%',height:'auto'}} />
      </div>
      <div  style={{ position: 'absolute', top: '15%', left:'10%', textAlign: 'center',transform: 'translateX(-50%)', opacity: isVisible ? 1 : 0, animation: isVisible ? 'fade-in-bottom 2s forwards' : 'none'  }}>
        <p style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '3px', lineHeight: '1', boxSizing: 'border-box', margin: 0 }}>THE WEDDING CEREMONY OF</p>
        <h2 style={{ fontFamily: '"Alex Brush", Sans-serif', lineHeight: '1', fontSize: '2rem', margin: '10px 0' }}>{customer.groomName} & {customer.brideName}</h2>
        <p style={{ fontSize:'14px',fontWeight:'600',letterSpacing:'3px',lineHeight:'1',boxSizing:'border-box',color:'#000' }}>{customer.weddingDate}</p>
    </div>
    </div>
    <div className="mt-3">
    {customer && (
    <Timeline events={timelineData} />
    )}
   </div>
    <div>
      <h6 style={{fontFamily: '"Alice", Sans-serif',lineHeight: 1,boxSizing: 'border-box',color: 'inherit',fontSize:'1rem',textAlign:'center'}}>We look forward to seeing you!</h6>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img src="https://i.postimg.cc/qR9nJjHK/leaves-divider.png" alt="No image found" /></div>
    </div>
</div>
</>
  );
};

export default ShareEvent;

