import { useState } from "react";
import "./ProfileKYC.css";

function ProfileKYC() {

 const [profile, setProfile] = useState({
  name: localStorage.getItem("userName") || "",
  email: localStorage.getItem("userEmail") || "",
  phone: localStorage.getItem("userPhone") || "",
  aadhaar: "",
  pan: ""
});

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const [status, setStatus] = useState("");

const handleSubmit = () => {

  if (
    !profile.aadhaar ||
    !profile.pan
  ) {
    setStatus(
      "Please fill all KYC details."
    );
    return;
  }

  if (
    !/^\d{12}$/.test(profile.aadhaar)
  ) {
    setStatus(
      "Aadhaar must contain 12 digits."
    );
    return;
  }

  if (
    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
      profile.pan
    )
  ) {
    setStatus(
      "Invalid PAN format."
    );
    return;
  }

  localStorage.setItem(
    "kycStatus",
    "Verified"
  );

  setStatus(
    "KYC Submitted Successfully"
  );
};

  return (
    <div className="kyc-container">

      <div className="kyc-card">

        <h1>Profile & KYC Verification</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
       
        <input
  type="text"
  value={profile.phone}
  readOnly
/> 
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          onChange={handleChange}
        />

        <input
          type="text"
          name="pan"
          placeholder="PAN Number"
          onChange={handleChange}
        />

        <label>Upload Aadhaar</label>
        <input type="file" />

        <label>Upload PAN</label>
        <input type="file" />
       {status && (
  <p className="kyc-status">
    {status}
  </p>
)}
        <button onClick={handleSubmit}>
          Submit KYC
        </button>

      </div>

    </div>
  );
}

export default ProfileKYC;