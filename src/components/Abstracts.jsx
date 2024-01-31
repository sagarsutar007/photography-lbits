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
const Abstracts = () => {
  const [abstracts, setAbstracts] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUser();
        const response = await axios.post(BACKEND_URL + "/abstracts", {
          userid: user?.id ?? "",
          username: username,
        });
        setAbstracts(response.data.result);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="v-95">
      <Topbar prevPage={"/" + username} pageTitle={"Abstracts"} />
      <div className="col-12">
        {abstracts.map((abstract) => (
          <div key={abstract.id} className="row mb-3  border-bottom">
            <div className="col-8">
              <strong className="fs-12">{abstract.title}</strong>
              <p className="fs-10 mb-0">
                <strong>Abstract Type:</strong> ePoster
              </p>
              <p className="fs-10 mb-0">
                <strong>Authors:</strong> {abstract.author}
              </p>
              <p className="fs-10 mb-0">
                <strong>Published:</strong> {abstract.published_at} ,{" "}
                {abstract.published_year}
              </p>
            </div>
            <div className="col-4">
              {abstract.images.map((image) => (
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

export default Abstracts;
