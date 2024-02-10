import {jwtDecode} from "jwt-decode";
import { useEffect,useState } from 'react';


function App(){
  const [user,setUser]=useState({});
function handleCallbackResponse(response){
  console.log("Encoded JWT ID token :" +response.credential);
  var userObject =jwtDecode(response.credential);
  console.log(userObject);
  setUser(userObject);
  document.getElementById("signInDiv").hidden=true;
}

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:"1092675111046-94ceokf7pr4mkkc4674345hgfna2p5en.apps.googleusercontent.com",
      callback:handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme : "outline",size:"large"}
    );

  },[]);

  return (
    <div className="App">
      <div id="signInDiv"></div>

    </div>

  );
}
export default App;

