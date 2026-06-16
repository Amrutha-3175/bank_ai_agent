import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">

      <nav className="navbar">
        <h2>BankAI Agent</h2>

        <button
  className="login-btn"
  onClick={() => navigate("/login")}
>
  Login
      </button>
      </nav>

      <section className="hero-section">
        <div className="hero-badge">
  AI Powered Smart Banking
        </div>
        <h1>AI Loan Recommendation Agent</h1>

        <p>
          Smart Banking. Smarter Loans.
          Powered by Artificial Intelligence.
        </p>
<button
  className="hero-btn"
  onClick={() => navigate("/login")}
>
  Get Started →
</button>
      </section>
<section className="stats-section">

  <div className="stat-card">
    <h2>10K+</h2>
    <p>Users</p>
  </div>

  <div className="stat-card">
    <h2>5000+</h2>
    <p>Loans Approved</p>
  </div>

  <div className="stat-card">
    <h2>98%</h2>
    <p>AI Accuracy</p>
  </div>

</section>
      <section className="features-section">

        <div className="feature-card">
          <h3>AI Loan Advisor</h3>
          <p>
            Get personalized loan recommendations instantly.
          </p>
        </div>

        <div className="feature-card">
          <h3>EMI Calculator</h3>
          <p>
            Calculate monthly payments with accuracy.
          </p>
        </div>

        <div className="feature-card">
          <h3>KYC Verification</h3>
          <p>
            Secure and fast profile verification.
          </p>
        </div>

        <div className="feature-card">
          <h3>AI Banking Assistant</h3>
          <p>
            Chat with our AI for banking guidance.
          </p>
        </div>

      </section>

    </div>
  );
}

export default LandingPage;