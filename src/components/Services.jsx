import { useEffect, useState } from "react";
import Topbar from "./Topbar/Topbar";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; 

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};
const Services = (props) => {
  const [services, setServices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUser();
        const response = await axios.post(BACKEND_URL + "/services", {
          userid: user?.id ?? "",
          username: username,
        });
        setServices(response.data.result);
      } catch (error) {
        console.error("Error fetching messages:", error);
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
      <Topbar prevPage={"/" + username} pageTitle={"Services"} />
      <div className="col-12">
      <table className="table">
      <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
        {services.map((service) => (
          <tr key={service.id}>
          <td>{service.title}</td>
          <td>{service.description}</td>
          <td>
              {service.images.map((image,index) => (
                <img
                  key={image.id}
                  src={BACKEND_URL + "/assets/images/" + image.file_name}
                  className="w-100 mb-2"
                  height="80"
                  onClick={() => openModal(BACKEND_URL + "/assets/images/" + image.file_name)}
                  alt=""
                />
      
      ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              top: "-5px",
              right: "10px",
            }}
          >
            <FaTimes size={30} style={{ color: "#333" }} />
          </button>
          <img src={modalImage} alt="Zoomed In" style={{ width: "450px" }} />
        </Modal>
    </div>
  );
};

export default Services;
