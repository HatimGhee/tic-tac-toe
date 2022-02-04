import React from "react";
import Square from "./Square";

export default function Board(props) {
  let counter = 0;

  let renderSquare = (i) => {
    let isWinningSquare = props.winningMoves.includes(i);
    let isFontBold = props.lastMove === i && props.stepNumber > 0;

    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isFontBold={isFontBold}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  let renderRow = (i) => {
    let row = [...Array(3).keys()].map((a) => renderSquare(counter++));

    return (
      <div className="board-row" key={i}>
        {row}
      </div>
    );
  };

  let rows = [...Array(3).keys()].map(renderRow);

  return <div>{rows}</div>;
}
