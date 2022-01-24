import React from "react";

export default function Square(props) {

  return (
    <button className={`square ${props.isFontBold ? 'square-bold': ''}`} onClick={() => props.onClick()}>
      <b>{props.value}</b>
    </button>
  );
}
