import { useState } from "react";
import "./LoanRecommendation.css";
import jsPDF from "jspdf";
function LoanRecommendation() {

  const [income, setIncome] = useState("");
const [creditScore, setCreditScore] = useState("");
const [employmentType, setEmploymentType] = useState("");
const [existingLoan, setExistingLoan] = useState("");

const [recommendation, setRecommendation] = useState("");
const handleRecommendation = async () => {

  const prompt = `
  Monthly Income: ₹${income}

  Credit Score: ${creditScore}

  Employment Type: ${employmentType}

  Existing Loan Amount: ₹${existingLoan}

  Suggest the most suitable loan type.
  Mention eligibility and reason.
  Keep response under 4 lines.
  `;

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/chat",
      {
        method: "POST",
        headers: {
          "Content-Type":
          "application/json"
        },
        body: JSON.stringify({
          message: prompt
        })
      }
    );

    const data = await response.json();
console.log(data);
console.log(creditScore);
    setRecommendation(data.response);

let shortRecommendation = "Personal Loan";

if(data.response.includes("Home Loan")){
  shortRecommendation = "Home Loan";
}
else if(data.response.includes("Personal Loan")){
  shortRecommendation = "Personal Loan";
}
else if(data.response.includes("Education Loan")){
  shortRecommendation = "Education Loan";
}
else if(data.response.includes("Vehicle Loan")){
  shortRecommendation = "Vehicle Loan";
}
let score = "Low";

if (Number(creditScore) > 750) {
  score = "High";
}
else if (Number(creditScore) > 650) {
  score = "Medium";
}
let riskLevel = "High";

if (Number(creditScore) > 750) {
  riskLevel = "Low";
}
else if (Number(creditScore) > 650) {
  riskLevel = "Medium";
}
localStorage.setItem(
  "riskLevel",
  riskLevel
);
console.log("Saved Successfully");
localStorage.setItem(
  "loanRecommendation",
  shortRecommendation
);

const userPhone =
  localStorage.getItem("userPhone");

const historyKey =
  `loanHistory_${userPhone}`;

const history =
  JSON.parse(
    localStorage.getItem(historyKey)
  ) || [];

history.unshift({
  date: new Date().toLocaleDateString(),
  loanType: shortRecommendation,
  score: score
});

localStorage.setItem(
  historyKey,
  JSON.stringify(history)
);

localStorage.setItem(
  "eligibilityScore",
  score
);
localStorage.setItem(
  "creditScore",
  creditScore
);
  } catch (error) {

    setRecommendation(
      "Unable to generate recommendation."
    );

  }
};
const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("AI-Powered Loan Eligibility Assessment Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Monthly Income: Rs.${income}`, 20, 50);
  doc.text(`Credit Score: ${creditScore}`, 20, 65);
  doc.text(`Employment Type: ${employmentType}`, 20, 80);
  doc.text(`Existing Loan Amount: ${existingLoan}`, 20, 95);

  doc.text("Recommendation:", 20, 120);
  const today = new Date().toLocaleDateString();

doc.text(`Generated On: ${today}`, 20, 35);
const eligibilityScore =
  localStorage.getItem("eligibilityScore");

doc.text(
  `Eligibility Score: ${eligibilityScore}`,
  20,
  110
);
const riskLevel =
  localStorage.getItem("riskLevel");

doc.text(
  `Risk Level: ${riskLevel}`,
  20,
  125
);
  const lines =
    doc.splitTextToSize(
      recommendation,
      160
    );

  doc.text(lines, 20, 135);
  doc.save("Loan_Report.pdf");
};

  return (
    <div className="loan-container">

      <div className="loan-card">

        <h1>AI Loan Recommendation</h1>

        <input
  type="number"
  placeholder="Monthly Income"
  value={income}
  onChange={(e) => setIncome(e.target.value)}
/>

       <input
  type="number"
  placeholder="Credit Score"
  value={creditScore}
  onChange={(e) => setCreditScore(e.target.value)}
/>

       <select
  value={employmentType}
  onChange={(e) =>
    setEmploymentType(e.target.value)
  }
>
  <option value="">
    Select Employment Type
  </option>

  <option value="Salaried">
    Salaried
  </option>

  <option value="Self Employed">
    Self Employed
  </option>

  <option value="Business Owner">
    Business Owner
  </option>

</select>
       <input
  type="number"
  placeholder="Existing Loan Amount"
  value={existingLoan}
  onChange={(e) =>
    setExistingLoan(e.target.value)
  }
/>

        <button onClick={handleRecommendation}>
          Generate Recommendation
        </button>

      {recommendation && (
  <>
    <div className="result-box">
      {recommendation}
    </div>

    <button
      className="download-btn"
      onClick={downloadReport}
    >
      Download PDF Report
    </button>
  </>
)}

      </div>

    </div>
  );
}

export default LoanRecommendation;