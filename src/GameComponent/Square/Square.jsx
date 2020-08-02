import React, { useState } from "react";
import styles from "./Square.module.css";

function Square({ value, onClick }) {
  return (
    <button className={styles.square} onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default Square;
