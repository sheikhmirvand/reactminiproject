import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);

  const previousHandler = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const nextHnadler = () => {
    if (step < 3) setStep((s) => s + 1);
  };
  return (
    <>
      <button className="close" onClick={() => setOpen(!open)}>
        &times;
      </button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">
            step {step} : {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ background: "#7950f2", color: "#fff" }}
              onClick={previousHandler}
            >
              previous
            </button>
            <button
              style={{ background: "#7950f2", color: "#fff" }}
              onClick={nextHnadler}
            >
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
