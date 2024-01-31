import { useEffect, useState } from "react";
import Topbar from "./Topbar/Topbar";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import { useParams } from "react-router-dom";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};
const Services = (props) => {
  const [services, setServices] = useState([]);
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

  return (
    <div className="v-95">
      <Topbar prevPage={"/" + username} pageTitle={"Services"} />
      <div className="col-12">
        {services.map((service) => (
          <div key={service.id} className="row mb-3 border-bottom">
            <div className="col-8">
              <strong>{service.title}</strong>
              <p className="fs-12">{service.description}</p>
            </div>
            <div className="col-4">
              {service.images.map((image) => (
                <img
                  key={image.id}
                  src={BACKEND_URL + "/assets/images/" + image.file_name}
                  className="w-100 mb-2"
                  height="80"
                  alt=""
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
