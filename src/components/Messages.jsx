import { useEffect, useState } from "react";
import Topbar from "./Topbar/Topbar";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
  return user;
};

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUser();
        const response = await axios.post(BACKEND_URL + "/messages", {
          userid: user.id,
        });
        setMessages(response.data.result);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={"Messages"} />
      <div className="col-11">
        {messages.map((message) => (
          <div key={message.id} className="row">
            <div className="col-12">
              <strong>{message.name}</strong>
              <p className="fs-12">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
