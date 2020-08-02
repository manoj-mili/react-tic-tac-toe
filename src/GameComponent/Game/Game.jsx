import React, { useState } from "react";
import styles from "./Game.module.css";
import Board from "../Board/Board";

function Game() {
  const [start, setStart] = useState(false);
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(false);

  function checkIfValidStart(start) {
    if (!start && player && player.length >= 2) {
      setError(false);
      setStart(!start);
    } else if (start) {
      setStart(!start);
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.game}>
      <p>
        <strong>
          Simple Tic Tac Toe Game Built Using React Hooks, <br />
          Enter Your Name And Click Start
        </strong>
      </p>
      <div className={styles.gameBoard}>
        <Board start={start} playerName={player} />
      </div>
      <div className={styles.setupContainer}>
        <input
          type="text"
          placeholder="Name"
          maxLength={10}
          minLength={2}
          onChange={(e) => setPlayer(e.target.value)}
        />
        {start ? (
          <button onClick={() => checkIfValidStart(start)}>RESTART</button>
        ) : (
          <button onClick={() => checkIfValidStart(start)}>START</button>
        )}
      </div>
      {error && (
        <p style={{ color: "#ff0000" }}>
          Please Enter Valid Name And Then Click Start
        </p>
      )}
    </div>
  );
}

export default Game;
