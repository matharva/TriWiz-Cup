import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./styles/Pathfinder.css";
import Modal from "react-modal";

const Countdown = () => {
  const [showModal, setShowModal] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      console.log("no time left");
      //   return <div className="timer">Done</div>;
      setShowModal(true);
      return;

      //   );
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
        duration={100}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => [false, 200]}
      >
        {renderTime}
      </CountdownCircleTimer>
      <Modal isOpen={showModal}>
        <h1>Time is up</h1>
        <button onClick={refreshPage}>Click to reload!</button>
      </Modal>
    </div>
  );
};

export default Countdown;
