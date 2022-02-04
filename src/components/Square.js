import React from "react";

export default function Square(props) {
  let resolveStyles = () => {
    return props.isWinningSquare
      ? "square-bold winning-square"
      : props.isFontBold
      ? "square-bold"
      : "";
  };

  return (
    <button
      className={`square ${resolveStyles()}`}
      onClick={() => props.onClick()}
    >
      <b>{props.value}</b>
    </button>
  );
}
