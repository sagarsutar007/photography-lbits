import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import Topbar from "./Topbar/Topbar";

const QrScanner = () => {
  const [showQR, setShowQR] = useState(true);
  const [result, setResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleQRScanner = () => {
    setShowQR((prevShowQR) => !prevShowQR);
  };

  return (
    <div className="v-95">
      <Topbar prevPage={"/dashboard"} pageTitle={"View Profile"} />
      <div
        className="text-center fs-12 fw-bold"
        style={{ fontFamily: "Inter" }}
      >
        Scan a Vitl QR
      </div>
      <div>
        {showQR ? (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        ) : null}
        <div className="text-center">
          <button className="btn btn-primary" onClick={toggleQRScanner}>
            {showQR ? "Hide QR Scanner" : "Show QR Scanner"}
          </button>
        </div>

        {result && <p>Scanned QR Code: {result}</p>}
      </div>
    </div>
  );
};

export default QrScanner;
