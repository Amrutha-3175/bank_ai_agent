import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOTP = () => {

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.age
  ) {
    setError("Please fill all fields.");
    return;
  }

  if (formData.fullName.length < 3) {
    setError(
      "Name should contain at least 3 characters."
    );
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    setError("Enter a valid email address.");
    return;
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    setError(
      "Phone number must contain 10 digits."
    );
    return;
  }

  if (Number(formData.age) < 18) {
    setError(
      "You must be at least 18 years old."
    );
    return;
  }

  setError("");
  
  const generatedOtp =
  Math.floor(
    1000 + Math.random() * 9000
  ).toString();

localStorage.setItem(
  "generatedOtp",
  generatedOtp
);

localStorage.setItem(
  "userName",
  formData.fullName
);

localStorage.setItem(
  "userEmail",
  formData.email
);

localStorage.setItem(
  "userPhone",
  formData.phone
);

  navigate("/otp");
};

  return (
    <div className="login-container">

      <div className="left-panel">
        <h1>Welcome Back</h1>

        <p>
          Access your AI-powered banking assistant and
          discover smarter loan recommendations.
        </p>
      </div>

      <div className="right-panel">

        <div className="login-card">

          <h2>Login</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />
           
          <input
  type="email"
  name="email"
  placeholder="Email Address"
  onChange={handleChange}
/> 

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />
         {error && (
  <p className="error-message">
    {error}
  </p>
)}
          <button onClick={handleOTP}>
            Send OTP
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;