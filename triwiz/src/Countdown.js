import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./styles/Pathfinder.css";

const Countdown = () => {
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Done</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  return (
    <div style={{ paddingLeft: "10px" }}>
      {/* https://reactjsexample.com/countdown-timer-component-with-color-and-progress-animation-based-on-svg/ */}
      <CountdownCircleTimer
        isPlaying
        size={55}
        strokeWidth={6}
        duration={10}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => [false, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Countdown;
