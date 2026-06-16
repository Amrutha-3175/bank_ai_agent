import { useState } from "react";
import "./EMICalculator.css";

function EMICalculator() {

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState("");

  const calculateEMI = () => {

    const P = Number(loanAmount);

    const R =
      Number(interestRate) / 12 / 100;

    const N =
      Number(tenure) * 12;

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    setEmi(EMI.toFixed(2));
  };

  return (
    <div className="emi-container">

      <div className="emi-card">

        <h1>EMI Calculator</h1>

        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) =>
            setLoanAmount(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) =>
            setInterestRate(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Loan Tenure (Years)"
          value={tenure}
          onChange={(e) =>
            setTenure(e.target.value)
          }
        />

        <button onClick={calculateEMI}>
          Calculate EMI
        </button>

        {emi && (
          <div className="emi-result">
            Monthly EMI: ₹{emi}
          </div>
        )}

      </div>

    </div>
  );
}

export default EMICalculator;