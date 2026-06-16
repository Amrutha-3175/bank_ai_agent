import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>BankAI</h2>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/profile-kyc">Profile & KYC</Link>

      <Link to="/loan-recommendation">
        Loan Recommendation
      </Link>

      <Link to="/emi-calculator">
        EMI Calculator
      </Link>

      <Link to="/emi-reminder">
        EMI Reminder
      </Link>

      <Link to="/chatbot">
        Chatbot
      </Link>

    </div>
  );
}

export default Sidebar;