import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import LoanRecommendation from "./pages/LoanRecommendation";
import EMICalculator from "./pages/EMICalculator";
import EMIReminder from "./pages/EMIReminder";
import ChatbotInterface from "./pages/ChatbotInterface";
import ProfileKYC from "./pages/ProfileKYC";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/loan-recommendation"
          element={<LoanRecommendation />}
        />
        <Route
          path="/emi-calculator"
          element={<EMICalculator />}
        />
        <Route
          path="/emi-reminder"
          element={<EMIReminder />}
        />
        <Route
          path="/chatbot"
          element={<ChatbotInterface />}
        />
        <Route
          path="/profile-kyc"
          element={<ProfileKYC />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;