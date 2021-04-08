import React from "react";
import "./styles/Node.css";
const Node = (props) => {
  const { row, col, isHarry, isCup, isWall } = props;

  const extraClassName = isCup
    ? "node-finish"
    : isHarry
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return (
    <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
  );
};

export default Node;
