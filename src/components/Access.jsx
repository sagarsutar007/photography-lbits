import { useState } from "react";
import Phone from "./Phone/Phone";
import Verify from "./Verify/Verify";

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
        <Phone type={type} onOtpReceived={handlePhoneVerification} />
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
