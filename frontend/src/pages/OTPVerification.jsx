import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./OTPVerification.css";

function OTPVerification() {
  const navigate = useNavigate();
  const [otp1, setOtp1] = useState("");
const [otp2, setOtp2] = useState("");
const [otp3, setOtp3] = useState("");
const [otp4, setOtp4] = useState("");
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");
 const handleVerify = () => {

  const otp =
    otp1 + otp2 + otp3 + otp4;
if (
  !otp1 ||
  !otp2 ||
  !otp3 ||
  !otp4
) {
  setMessage(
    "Please enter the complete OTP."
  );

  setMessageType("error");

  return;
}
  const generatedOtp =
  localStorage.getItem(
    "generatedOtp"
  );

if (otp === generatedOtp) {

    setMessage(
      "OTP Verified Successfully"
    );

    setMessageType("success");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } else {

    setMessage(
      "Invalid OTP. Please try again."
    );

    setMessageType("error");

  }
};

  return (
    <div className="otp-container">

      <div className="otp-card">

        <h1>OTP Verification</h1>

        <p>
         Enter the 4-digit OTP sent to your registered mobile number
        </p>

        <div className="otp-boxes">

          <input
  maxLength="1"
  value={otp1}
  onChange={(e) => setOtp1(e.target.value)}
/>

<input
  maxLength="1"
  value={otp2}
  onChange={(e) => setOtp2(e.target.value)}
/>

<input
  maxLength="1"
  value={otp3}
  onChange={(e) => setOtp3(e.target.value)}
/>

<input
  maxLength="1"
  value={otp4}
  onChange={(e) => setOtp4(e.target.value)}
/>

        </div>
       {message && (

  <p
    className={
      messageType === "success"
        ? "success-message"
        : "error-message"
    }
  >
    {message}
  </p>

)}
        <button
          className="verify-btn"
          onClick={handleVerify}
        >
          Verify OTP
        </button>

        <span className="resend-link">
          Resend OTP
        </span>
     
      </div>

    </div>
  );
}

export default OTPVerification;