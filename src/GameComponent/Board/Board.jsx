import React, { useState, useEffect } from "react";
import Square from "../Square/Square";
import styles from "./Board.module.css";

let counter = 0;
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function Board({ start, playerName }) {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [error, setError] = useState(false);

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleSquareClick(i)} />;
  }

  useEffect(() => {
    if (!start) {
      setXIsNext(true);
      setsquares(Array(9).fill(null));
    }
  }, [start]);

  useEffect(() => {
    if (start && xIsNext) {
      if (counter === 0) {
        counter = counter++;
        handleSquareClick(0);
      }
    }
  }, [start, xIsNext]);

  useEffect(() => {
    if (start && xIsNext) {
      const winningPosition = calculateCorrectPosition();
      const position = isOtherPlayerWinning();
      if (winningPosition != null) {
        handleSquareClick(winningPosition);
      } else if (position === null) {
        if (squares[2] === null) {
          handleSquareClick(2);
        } else if (squares[6] === null) {
          handleSquareClick(6);
        } else if (squares[8] === null) {
          handleSquareClick(8);
        } else {
          //if none of the above works then return positon from any available block as there is no winning position or losing position
          handleSquareClick(squares.indexOf(null));
        }
      } else {
        handleSquareClick(position);
      }
    }
  }, [xIsNext]);

  function handleSquareClick(i) {
    if (!start) {
      setError(true);
      return;
    }
    setError(false);
    const newsquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    newsquares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setsquares(newsquares);
  }

  function isOtherPlayerWinning() {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === "O" &&
        squares[a] === squares[b] &&
        squares[c] === null
      ) {
        return c;
      } else if (
        squares[a] &&
        squares[a] === "O" &&
        squares[a] === squares[c] &&
        squares[b] === null
      ) {
        return b;
      } else if (
        squares[b] &&
        squares[b] === "O" &&
        squares[b] === squares[c] &&
        squares[a] === null
      ) {
        return a;
      }
    }
    return null;
  }

  function calculateCorrectPosition() {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === "X" &&
        squares[a] === squares[b] &&
        squares[c] === null
      ) {
        return c;
      } else if (
        squares[a] &&
        squares[a] === "X" &&
        squares[a] === squares[c] &&
        squares[b] === null
      ) {
        return b;
      } else if (
        squares[b] &&
        squares[b] === "X" &&
        squares[b] === squares[c] &&
        squares[a] === null
      ) {
        return a;
      }
    }

    return null;
  }
  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function getCurrentStatus() {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (squares.includes(null)) {
      status = "Next player: " + playerName;
    } else {
      status = "Match Drawn Restart To Reset The Game.";
    }

    return status;
  }

  return (
    <div className={styles.container}>
      {error && (
        <p style={{ color: "#ff0000" }}>
          Please Enter Valid Name And Click Start
        </p>
      )}
      {start && (
        <div>
          <strong>{getCurrentStatus()}</strong>
        </div>
      )}
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;
