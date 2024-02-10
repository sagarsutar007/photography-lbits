import { useState } from "react";
import Phone from "./SignIn/SignIn";
import Verify from "./Verify/Verify";
import SignIn from "./SignIn/SignIn";

function Access({ type }) {
  const [verificationData, setVerificationData] = useState({
    userCode: "",
    userId: "",
  });

  const handlePhoneVerification = (userCodeReceived, userIdReceived) => {
    setVerificationData({
      userCode: userCodeReceived,
      userId: userIdReceived,
    });
  };

  return (
    <div>
      {type === "sign-in" && (
        <SignIn type={type} onOtpReceived={handlePhoneVerification} />
      )}
      {type === "sign-up" && (
        <Phone type={type} onOtpReceived={handlePhoneVerification} />
      )}
      {type === "verify" && (
        <Verify
          userCode={verificationData.userCode}
          userId={verificationData.userId}
        />
      )}
    </div>
  );
}

export default Access;
