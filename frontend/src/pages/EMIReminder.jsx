import { useState } from "react";
import "./EMIReminder.css";

function EMIReminder() {

  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const setReminder = () => {

    if(date === ""){
      alert("Please select a date");
      return;
    }

    setMessage(
      `EMI Reminder set successfully for ${date}`
    );
  };

  return (
    <div className="reminder-container">

      <div className="reminder-card">

        <h1>EMI Reminder</h1>

        <p>
          Set a reminder for your upcoming EMI payment.
        </p>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button onClick={setReminder}>
          Set Reminder
        </button>

        {message && (
          <div className="reminder-result">
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default EMIReminder;