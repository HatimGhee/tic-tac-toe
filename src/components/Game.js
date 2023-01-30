import React from "react";
import Board from "./Board";
import getWinningMoves from "../helper/UtilService";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          rowColumn: {},
          move: 0,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const rowColumn = this.getBoardMatrix(i);
    if (getWinningMoves(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares, ...rowColumn, move: i }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  getBoardMatrix(index, width = 3) {
    let row = Math.floor(index / width) + 1;
    let column = Math.floor(index % width) + 1;

    return { row: row, col: column };
  }

  buildMoveMsg(step, move) {
    return (
      "Go to move #" + move + " (row: " + step.row + ", col: " + step.col + ")"
    );
  }

  sortMoves() {
    const historyReversed = this.state.history.reverse();
    this.setState({
      history: historyReversed,
    });
  }

  resolveStatus(winningMoves, currentSquares) {
    if (winningMoves) {
      return "Winner: " + currentSquares[winningMoves[0]];
    } else if (!currentSquares.includes(null)) {
      return "Game Drawn";
    } else {
      return "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winningMoves = getWinningMoves(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? this.buildMoveMsg(step, move) : "Go to game start";
      return (
        <li key={move}>
          <button className="btn btn-primary" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            lastMove={current.move}
            stepNumber={this.state.stepNumber}
            winningMoves={winningMoves ?? []}
          />
        </div>
        <div className="game-info">
          <button
            onClick={() => {
              this.sortMoves();
            }}
          >
            Sort
          </button>
          <div className="status">
            {this.resolveStatus(winningMoves, current.squares)}
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
