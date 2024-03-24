import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
const getUser = () => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};
const ShareProfile = () => {
  const imagePath = process.env.PUBLIC_URL + "/assets/images/";
  
  const [logUser, setLogUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = getUser();
    setLogUser(userFromStorage);

    const fetchData = async () => {
      try {
        const response = await axios.post(BACKEND_URL + "/get-user", {
          userid: userFromStorage.id,
        });
        setUserData(response.data.user);
        setLoading(false);
        document.title = `Share Profile of ${response.data.user.name}`;
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const copyToClipboard = () => {
    const copyText = document.getElementById('profileLink');
    copyText.select();
    document.execCommand('copy');
  };


  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={""} />
      <div className="col-5 mx-auto">
        <div className="text-center my-2">
          <span className="fw-bold fs-12">Scan to get my profile</span>
          <img
            src={loading ? "" : userData.qrcode || ""}
            alt=""
            className="w-100"
          />
        </div>
      </div>
      <div className="col-10 mx-auto">
      <div className="form-group mb-5 input-group">
          <input
            type="text"
            id="profileLink"
            value={loading ? "" : "https://chromagz.com/" + userData.username || ""}
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
          {/* <button
            className="btn btn-link fs-60 text-blue position-absolute end-0 translate-middle-y" style={{marginTop:'-18px'}}
            onClick={copyToClipboard}
          >
           COPY
          </button> */}
        </div>
        {/* <div className="form-group mb-5">
          <input
            type="text"
            value={loading ? "" : "https://chromagz.com/" + userData.username || ""}
            className="form-control fs-12 text-center"
            readOnly
          />
        </div> */}
        <div className="fs-12">Share via:-</div>
        <div className="d-flex justify-content-around gap-3">
       
          <a
            className="btn btn-link fs-12 text-dark"
            href={
              `whatsapp://send?text=` +
              encodeURIComponent(
                `Hi, I am ${userData.name}. You can find me on Chromagz App: https://chromagz.com/${userData.username}`
              )
            }
            target="_WhatsUpPage"
          >
            <img
              src={imagePath + "whatsapp.png"}
              width="40"
              height="40"
              alt="whatsapp"
              className="d-flex flex-column align-items-center"
            />
            <span style={{ margin:'8px' }}>WhatsApp</span>
          </a>
          
        
          <a
            className="btn btn-link fs-12 text-dark"
            href={`mailto:?subject=See%20me%20on%20chromagz&body=${encodeURIComponent(
              `Hi, I am ${userData.name}. You can find me on CHROMAGZ App: https://chromagz.com/${userData.username}`
            )}`}
            target="_Gmail"
          >
            <img
              src={imagePath + "gmail.png"}
              width="40"
              height="40"
              alt="email"
              className="d-flex flex-column align-items-center"
            />
           <span style={{ margin:'8px' }}>Gmail</span> 
          </a>
         
        </div>
      </div>
    </div>
  );
};

export default ShareProfile;
