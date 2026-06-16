import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import CreditScoreChart
from "../components/CreditScoreChart";
function Dashboard() {
   const navigate = useNavigate();
   const [loanData, setLoanData] = useState(
  "Not Generated Yet"
);

const userName =
  localStorage.getItem("userName") ||
  "User";

const [creditScoreData, setCreditScoreData] =
  useState("Not Available");

const [riskLevel, setRiskLevel] =
  useState("Not Available");

const [eligibilityScore, setEligibilityScore] =
  useState("Not Available");

  const kycStatus =
  localStorage.getItem("kycStatus") ||
  "Pending";

  const [history, setHistory] =
  useState([]);
 useEffect(() => {

  const savedRecommendation =
    localStorage.getItem("loanRecommendation");

  if(savedRecommendation){
    setLoanData(savedRecommendation);
  }

  const savedCreditScore =
    localStorage.getItem("creditScore");

  if(savedCreditScore){
    setCreditScoreData(savedCreditScore);
  }

  const savedRiskLevel =
    localStorage.getItem("riskLevel");

  if(savedRiskLevel){
    setRiskLevel(savedRiskLevel);
  }

  const savedScore =
    localStorage.getItem("eligibilityScore");

  if(savedScore){
    setEligibilityScore(savedScore);
  }

  const userPhone =
  localStorage.getItem("userPhone");

const historyKey =
  `loanHistory_${userPhone}`;

const savedHistory =
  JSON.parse(
    localStorage.getItem(historyKey)
  ) || [];

  const kycStatus =
  localStorage.getItem("kycStatus") ||
  "Pending";

setHistory(savedHistory);
}, []);

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <h1>Welcome Back, {userName}</h1>

        <p className="dashboard-subtitle">
          Here's your banking overview.
        </p>
         <div className="summary-strip">

  <div>
    <h4>Account Status</h4>
    <p>Active</p>
  </div>

  <div>
    <h4>Last Login</h4>
    <p>Today</p>
  </div>

  <div>
    <h4>AI Score</h4>
    <p>98%</p>
  </div>

</div>
        <div className="cards-grid">

         <DashboardCard
  title="Credit Score"
  value={creditScoreData}
/>

<DashboardCard
  title="Loan Eligibility"
  value={loanData}
/>
<DashboardCard
  title="Risk Level"
  value={riskLevel}
/>
<DashboardCard
  title="💳 EMI Due"
  value="₹8,500"
/>
<DashboardCard
  title="Eligibility Score"
  value={eligibilityScore}
/>
<DashboardCard
  title="🛡️ KYC Status"
  value={kycStatus}
/>

        </div>

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-buttons">

            <button onClick={() => navigate("/loan-recommendation")}>
  Loan Recommendation
</button>

<button onClick={() => navigate("/emi-calculator")}>
  EMI Calculator
</button>

<button onClick={() => navigate("/emi-reminder")}>
  EMI Reminder
</button>

<button onClick={() => navigate("/chatbot")}>
  AI Chatbot
</button>
          </div>

        </div>
        <CreditScoreChart />
        <div className="activity-section">

          <h2>Recent Activity</h2>

          <ul>

  {history.map((item, index) => (

    <li key={index}>

      {item.date} —
      {item.loanType}
      (Score: {item.score})

    </li>

  ))}

</ul>

        </div>

      </div>

    </div>
    
  );
}

export default Dashboard;