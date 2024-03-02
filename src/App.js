import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Splash from "./components/Splash";
import Home from "./components/Home";
import Access from "./components/Access";
import Protected from "./components/Protected";
import ProfileSetup from "./components/ProfileSetup/ProfileSetup";
import CredentialsSetup from "./components/ProfileSetup/CredentialsSetup";
import SetProfileLinks from "./components/SetProfileLinks/SetProfileLinks";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SetLink from "./components/SetProfileLinks/SetLink";
import EditProfile from "./components/EditProfile/EditProfile";
import ShareProfile from "./components/ShareProfile";
import ResetPin from "./components/ResetPin";
import Services from "./components/Services";

import Messages from "./components/Messages";
import ManageService from "./components/ManageService";

import ViewProfile from "./components/Dashboard/ViewProfile";
import SendMessage from "./components/SendMessage";
import QrScanner from "./components/QrScanner";
import Portfolio from "./components/Portfolio";
import ManagePortfolio from "./components/ManagePortfolio";
import ForgotPin from "./components/ForgotPin";
import CreatePortfolio from "./components/CreatePortfolio";
import EditProtfolio from "./components/EditProtfolio";

import ShareEvent from "./components/CustomerEvent/ShareEvent";
import ShareCustomerEvent from "./components/CustomerEvent/ShareCustomerEvent";
import ManageCustomerEvent from "./components/CustomerEvent/ManageCustomerEvent";
function App() {
  return (
    <Provider store={store}>
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-md-3 mx-auto bg-white">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/home" element={<Home logout={false} />} />
                <Route path="/sign-in" element={<Access type="sign-in" />} />
                <Route path="/sign-up" element={<Access type="sign-up" />} />
                <Route path="/verify" element={<Access type="verify" />} />
                <Route
                  path="/share-customer-event"
                  element={<ShareCustomerEvent />}
                />

                <Route
                  path="/manage-customer-event"
                  element={<ManageCustomerEvent />}
                />
                <Route path="/share-event" 
                element={<ShareEvent />} 
                />
                <Route
                  path="/setup-profile"
                  element={<Protected Component={ProfileSetup} />}
                />

                 <Route
                  path="/forgot-pin"
                  element={<Protected Component={ForgotPin} />}
                />
                <Route
                  path="/set-credentials"
                  element={<Protected Component={CredentialsSetup} />}
                />
                <Route
                  path="/set-profile-links"
                  element={<Protected Component={SetProfileLinks} />}
                />
                <Route
                  path="/set-link/:type"
                  element={<Protected Component={SetLink} />}
                />
                <Route
                  path="/welcome"
                  element={<Protected Component={Welcome} />}
                />
            
                <Route
                  path="/dashboard"
                  element={<Protected Component={Dashboard} />}
                />
                <Route
                  path="/edit-profile"
                  element={<Protected Component={EditProfile} />}
                />
                <Route
                  path="/share-profile"
                  element={<Protected Component={ShareProfile} />}
                />
                <Route
                  path="/reset-pin"
                  element={<Protected Component={ResetPin} />}
                />
                <Route path=":username/services" element={<Services />} />
                <Route
                  path="/messages"
                  element={<Protected Component={Messages} />}
                />
                <Route path="/:username/portfolio" element={<Portfolio />} />
                <Route
                  path="/manage-portfolio/create-portfolio"
                  element={<Protected Component={CreatePortfolio} />}
                />
                 <Route
                  path="/manage-portfolio/edit-portfolio"
                  element={<Protected Component={EditProtfolio} />}
                />
                <Route
                  path="/manage-portfolio"
                  element={<Protected Component={ManagePortfolio} />}
                />
                <Route
                  path="/manage-service"
                  element={<Protected Component={ManageService} />}
                />
                {/* <Route path="/:username/abstracts" element={<Abstracts />} />
                <Route
                  path="/manage-abstract"
                  element={<Protected Component={ManageAbstract} />}
                /> */}
                <Route
                  path="/view-profile"
                  element={<Protected Component={ViewProfile} />}
                />
                <Route
                  path="/scan-qr"
                  element={<Protected Component={QrScanner} />}
                />
                <Route
                  path="/:username/send-message/"
                  element={<Protected Component={SendMessage} />}
                />

                <Route path="/logout" element={<Home logout={true} />} />
                <Route path="/:username" element={<ViewProfile />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
