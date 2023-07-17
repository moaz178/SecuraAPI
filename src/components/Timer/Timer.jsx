import React, { useState, useEffect } from "react";

const Timer = ({ delayResend = "120", setResendOTPBtn, resendOTPBtn }) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  var secFormat = seconds > 0 ? (seconds < 10 ? "0" + seconds : seconds) : "00";
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      setResendOTPBtn(!resendOTPBtn);
    }

    return () => {
      clearInterval(timer);
    };
  }, [delay]);

  return (
    <>
      <span className="text-danger">
        0{minutes} : {secFormat}
      </span>
    </>
  );
};

export default Timer;
