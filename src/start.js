import "./App.css";
import { clear } from "./App";
import React from "react";

export default function StartGame(props) {
  //check must taken jumps
  const checkJumps = (kings, mainPlayer, secondPlayer, color) => {
    const array = kings ? kings : mainPlayer;

    for (let i = 0; i < array.length; i++) {
      if (
        (secondPlayer.includes(array[i] + (color === "red" ? 9 : -9)) &&
          !secondPlayer.includes(array[i] + (color === "red" ? 18 : -18)) &&
          !mainPlayer.includes(array[i] + (color === "red" ? 18 : -18)) &&
          document.getElementById(array[i] + (color === "red" ? 18 : -18)) !==
            null) ||
        (secondPlayer.includes(array[i] + (color === "red" ? 7 : -7)) &&
          !secondPlayer.includes(array[i] + (color === "red" ? 14 : -14)) &&
          !mainPlayer.includes(array[i] + (color === "red" ? 14 : -14)) &&
          document.getElementById(array[i] + (color === "red" ? 14 : -14)) !==
            null)
      ) {
        return true;
      }
    }
  };

  //check if there's a king in the game
  const checkKings = (king, kingCount, className) => {
    for (let i = 1; i < 65; i++) {
      if (
        document.getElementById(i) !== null &&
        document.getElementById(i).className === className
      ) {
        king = true;
        kingCount.push(i);
      }
    }

    return [king, kingCount];
  };

  const jumps = (data, mainPlayer, secondPlayer, color, direction) => {
    const jump =
      (direction ? (color === "red" ? 14 : -14) : color === "red" ? 18 : -18) +
      data;
    const move =
      (direction ? (color === "red" ? 7 : -7) : color === "red" ? 9 : -9) +
      data;

    if (
      !mainPlayer.includes(move) &&
      !mainPlayer.includes(jump) &&
      document.getElementById(jump) !== null &&
      secondPlayer.includes(move) &&
      !secondPlayer.includes(jump)
    ) {
      if ((jump > 57 && color === "red") || (jump < 8 && color === "green")) {
        document.getElementById(jump).className =
          color === "red" ? "kingRed" : "kingGreen";
      } else {
        document.getElementById(jump).className =
          document.getElementById(data).className;
      }

      document.getElementById(jump).style.backgroundColor = "black";
    }
  };

  const moves = (jump, data, mainPlayer, secondPlayer, color, direction) => {
    const move =
      (direction ? (color === "red" ? 7 : -7) : color === "red" ? 9 : -9) +
      data;

    if (
      !jump &&
      !mainPlayer.includes(move) &&
      document.getElementById(move) !== null &&
      !secondPlayer.includes(move)
    ) {
      if ((move > 57 && color === "red") || (move < 8 && color === "green")) {
        document.getElementById(move).className =
          color === "red" ? "kingRed" : "kingGreen";
      } else {
        document.getElementById(move).className =
          document.getElementById(data).className;
      }

      document.getElementById(move).style.backgroundColor = "black";
    }
  };

  const kingMaker = (className) => {
    if (
      document.getElementById(props.location).className === className ||
      (props.data[2] > 57 && props.turn === "red") ||
      (props.data[2] < 8 && props.turn === "green")
    ) {
      props.king([props.data[2], props.turn]);
    }
  };

  // add move to moves array
  const addMove = (className, check) => {
    if (document.getElementById(props.location).className === className) {
      props.undo([props.location, props.data[2], check, props.turn]);
    } else {
      props.undo([props.location, props.data[2], check]);
    }
  };

  const jumpCalc = (arr, tile) => {
    document.getElementById(tile).className = "";
    arr = (props.turn === "red" ? props.green : props.red).filter(
      (i) => i !== tile
    );

    if (props.turn === "red") {
      props.updateGreen(arr);
    } else {
      props.updateRed(arr);
    }

    return arr;
  };

  const move = (method) => {
    let jump = false,
      king = false,
      kingCount = [];

    clear(); // reset optional moves

    // red player
    if (method === 1 && props.turn === "red") {
      const resp = checkKings(king, kingCount, "kingRed");
      king = resp[0] || king;
      kingCount = resp[1] || kingCount;

      jump = checkJumps(false, props.red, props.green, props.turn) || jump;

      if (king) {
        jump = checkJumps(kingCount, props.red, props.green, "green") || jump;
      }

      jumps(props.data[2], props.red, props.green, props.turn, true);
      jumps(props.data[2], props.red, props.green, props.turn, false);

      moves(jump, props.data[2], props.red, props.green, props.turn, true);
      moves(jump, props.data[2], props.red, props.green, props.turn, false);

      // if this checker is a king
      if (document.getElementById(props.data[2]).className === "kingRed") {
        jumps(props.data[2], props.red, props.green, "green", true);
        jumps(props.data[2], props.red, props.green, "green", false);

        moves(jump, props.data[2], props.red, props.green, "green", true);
        moves(jump, props.data[2], props.red, props.green, "green", false);
      }

      props.callback(props.data[2]);
    }

    // green player
    if (method === 2 && props.turn === "green") {
      const resp = checkKings(king, kingCount, "kingGreen");
      king = resp[0] || king;
      kingCount = resp[1] || kingCount;

      jump = checkJumps(false, props.green, props.red, props.turn) || jump;

      if (king) {
        jump = checkJumps(kingCount, props.green, props.red, "red") || jump;
      }

      jumps(props.data[2], props.green, props.red, props.turn, true);
      jumps(props.data[2], props.green, props.red, props.turn, false);

      moves(jump, props.data[2], props.green, props.red, props.turn, true);
      moves(jump, props.data[2], props.green, props.red, props.turn, false);

      // if this checker is a king
      if (document.getElementById(props.data[2]).className === "kingGreen") {
        jumps(props.data[2], props.green, props.red, "red", true);
        jumps(props.data[2], props.green, props.red, "red", false);

        moves(jump, props.data[2], props.green, props.red, "red", true);
        moves(jump, props.data[2], props.green, props.red, "red", false);
      }

      props.callback(props.data[2]);
    }

    // moving player
    if (method === 0) {
      let temp = [],
        arr = [],
        check = 0;

      kingMaker(props.turn === "red" ? "kingRed" : "kingGreen");

      temp = (props.turn === "red" ? props.red : props.green).filter(
        (i) => i !== props.location
      );
      temp.push(props.data[2]);

      if (props.data[2] - props.location === 18) {
        arr = jumpCalc(arr, props.data[2] - 9);
        check = props.turn === "red" ? 9 : -9;
      }
      if (props.location - props.data[2] === 18) {
        arr = jumpCalc(arr, props.data[2] + 9);
        check = props.turn === "red" ? -9 : 9;
      }
      if (props.data[2] - props.location === 14) {
        arr = jumpCalc(arr, props.data[2] - 7);
        check = props.turn === "red" ? 7 : -7;
      }
      if (props.location - props.data[2] === 14) {
        arr = jumpCalc(arr, props.data[2] + 7);
        check = props.turn === "red" ? -7 : 7;
      }

      addMove(props.turn === "red" ? "kingRed" : "kingGreen", check);

      if (props.turn === "red") {
        props.updateRed(temp);
      } else {
        props.updateGreen(temp);
      }

      props.callback(0);
      props.updateTurn(props.turn === "red" ? "green" : "red");
    }
  };

  return (
    <>
      {
        props.data[1] === "black" ? ( // black tile
          <>
            <>
              {props.red.includes(props.data[2]) ? (
                <Player
                  id={props.data[2]}
                  className={
                    document.getElementById(props.data[2]) !== null &&
                    document.getElementById(props.data[2]).className ===
                      "kingRed"
                      ? "kingRed"
                      : "red"
                  }
                  onClick={() => move(1)}
                />
              ) : null}
            </>

            <>
              {props.green.includes(props.data[2]) ? (
                <Player
                  id={props.data[2]}
                  className={
                    document.getElementById(props.data[2]) !== null &&
                    document.getElementById(props.data[2]).className ===
                      "kingGreen"
                      ? "kingGreen"
                      : "green"
                  }
                  onClick={() => move(2)}
                />
              ) : null}
            </>

            <>
              {!props.green.includes(props.data[2]) &&
              !props.red.includes(props.data[2]) ? (
                <Player
                  id={props.data[2]}
                  style={{ display: "inline-flex", height: "40px" }}
                  onClick={() => move(0)}
                />
              ) : null}
            </>
          </>
        ) : (
          <span style={{ display: "inline-flex", height: "40px" }}></span>
        ) // white tile
      }
    </>
  );
}

function Player(props) {
  return (
    <span
      id={props.id}
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    ></span>
  );
}
