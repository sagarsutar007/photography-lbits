import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import { useParams,useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa"; 

import { Carousel } from 'react-bootstrap';

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const Portfolio = ({source}) => {
  const [portfolio, setPortfolio] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const { username } = useParams();
 
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // const user = getUser();
        const response = await axios.post(BACKEND_URL + "/portfolio", {
          // userid: user.id,
          username: username,
        });
        console.log("Response data:", response.data); // Log the response for debugging
        if (response.data && response.data.result) {
          setPortfolio(response.data.result);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
    const fetchDataForManage = async () => {
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

    if (source === "managePortfolio")
    {
      fetchDataForManage();
    }
    else{
      fetchData();
    }
  }, [username]);

  
  const navigate = useNavigate();
 
  
  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalImage('');
    setModalIsOpen(false);
  };

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };
const handleClick =(id)=>{
  navigate("/manage-portfolio/edit-portfolio?id="+ id)} 

  const CustomCarousel = ({ images }) => {
    console.log("Images in CustomCarousel:", images); // Log images for

    const [activeIndex, setActiveIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setActiveIndex(selectedIndex);
    };
    useEffect(() => {
      const interval = setInterval(() => {
        handleNext();
      }, 3000); // Adjust the interval time as needed
  
      return () => clearInterval(interval);
    }, [activeIndex]);
  
    
  
    const handlePrev = () => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    const handleNext = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleSlideEnd = (direction) => {
      if (direction === 'left' && activeIndex === 0) {
        setActiveIndex(images.length - 1);
      } else if (direction === 'right' && activeIndex === images.length - 1) {
        setActiveIndex(0);
      }
    };
    return (
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        {/* <div
        className="prev-button"
        style={{ cursor: 'pointer' }}
        onClick={handlePrev}
      >
        &lt;
      </div> */}
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={null}
        pause="hover"
        wrap={false}
        keyboard={true}
        controls={false}
        indicators={false} 
        pauseOnHover={false}
        onSlideEnd={(direction) => handleSlideEnd(direction)}
      >
        {images.map((image, imgIndex) => (
          <Carousel.Item key={imgIndex}>
            <img
              className="d-block mx-auto"
              src={BACKEND_URL + "/assets/images/" + image.file_name}
              alt={`Slide ${imgIndex}`}
              onClick={() => openModal(BACKEND_URL + "/assets/images/" + image.file_name)}
              style={{ cursor: 'pointer', width:'100%', maxHeight: '150px' }}
            />
             {/* <div
        className="next-button"
        style={{ cursor: 'pointer' }}
        onClick={handleNext}
      >
        &gt;
      </div> */}
          </Carousel.Item>
        ))}
        {/* {images.length > 1 && (
        <div>
          <div
            className="carousel-control-prev"
            style={{ cursor: 'pointer' }}
            onClick={handlePrev}
          >
            &lt;
          </div>
          <div
            className="carousel-control-next"
            style={{ cursor: 'pointer' }}
            onClick={handleNext}
          >
            &gt;
          </div>
        </div>
      )} */}
        {/* Custom circular prev and next buttons */}
        {/* <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '5px',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handlePrev}
        >
          &lt;
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '5px',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleNext}
        >
          &gt;
        </div> */}
      </Carousel>
        {/* Custom styles for positioning the indicators at the bottom */}
        <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: activeIndex === index ? '#007bff' : '#ccc',
              margin: '0 5px',
              cursor: 'pointer',
            }}
            onClick={() => setActiveIndex(index)}
          ></div>
        ))}
      </div>
    </div>
      
    );
  }


  if (portfolio.length === 0) {
    return null; // Return null or a loading indicator if there's no portfolio data
  }

  return (
    <div>
      <h5 style={{ marginTop: "35px", color: '#678983', fontFamily: 'sans-serif' }}>Portfolio</h5>

      {portfolio.map((portfolioItem, index) => (
        <div key={portfolioItem.id} className="mb-2">
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            
                 <p style={{ textTransform: 'capitalize' }}>{portfolioItem.event}</p>
                {/* <p>{portfolioItem.eventdate}</p> */}
                {source === "managePortfolio" ? <div style={{
                color: 'blue' , // Change color to your preference '#678983'
                textDecoration: 'underline', // Add underline
                fontWeight:'bolder',
                cursor: 'pointer',
              }}  onClick={() =>handleClick(portfolioItem.id)}>View More</div> : <p>{portfolioItem.eventdate}</p>}
          </div>
          {/* <div> {portfolioItem.images.length}</div> */}
         { portfolioItem.images.length>0 && 
         <div className="text-center mt-3">
          {portfolioItem.images.length > 1 ? (
            <div style={{ marginBottom: '40px' }}>
              <CustomCarousel images={portfolioItem.images} />
            </div>
            ) : ( 
              <div style={{ marginBottom: '20px' }}>
                <img
                  className="d-block mx-auto"
                  // src={"https://pvthenextlevelphotography.com/wp-content/uploads/2023/03/2.jpg"}
                  src={BACKEND_URL + "/assets/images/" + portfolioItem.images[0].file_name}
                  alt="Single Image"
                  onClick={() => openModal(BACKEND_URL + "/assets/images/" + portfolioItem.images[0].file_name)}
                  style={{ cursor: 'pointer', width:'100%', maxHeight: '150px' }}
                />
              </div>
            )}
          </div> 
          }

          <div className="text-center mt-1">
          {portfolioItem.Youtube_urls && (
            <iframe
              title={`YouTube Video ${portfolioItem.id}`}
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${portfolioItem.Youtube_urls}`}
              frameBorder="0"
              allowFullScreen
              
            ></iframe>
            )}
          </div>
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
         
        </div>
      ))}
      <div style={{ height: '60px' }}></div>
    </div>
  );
};

export default Portfolio;
