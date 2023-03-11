import "./App.css";
import { clear } from "./App";
import React from "react";

export default function StartGame(props) {
  const kingMaker = (className) => {
    if (
      document.getElementById(props.location).className === className ||
      (props.data[2] > 57 && props.turn === "red") ||
      (props.data[2] < 8 && props.turn === "green")
    ) {
      props.updateKings([props.data[2], props.turn]);
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

  const checkTiles = (index, data, color) => {
    if ((index > 57 && color === "red") || (index < 8 && color === "green")) {
      document.getElementById(index).className = `king ${
        color === "red" ? "redColor" : "greenColor"
      }`;
    } else {
      document.getElementById(index).className =
        document.getElementById(data).className;
    }

    document.getElementById(index).style.backgroundColor = "black";
  };

  const player = () => {
    const resp = checkKings(
      false,
      [],
      `king ${props.turn === "red" ? "redColor" : "greenColor"}`
    );
    const mainPlayer = props.turn === "red" ? props.red : props.green;
    const secondPlayer = props.turn === "red" ? props.green : props.red;
    const oppositeTurn = props.turn === "red" ? "green" : "red";
    let jump = checkJumps(false, false, mainPlayer, secondPlayer, props.turn);

    if (resp[0]) {
      jump = checkJumps(jump, resp[1], mainPlayer, secondPlayer, oppositeTurn);
    }

    jumps(props.data[2], mainPlayer, secondPlayer, props.turn, true);
    jumps(props.data[2], mainPlayer, secondPlayer, props.turn, false);
    moves(jump, props.data[2], mainPlayer, secondPlayer, props.turn, true);
    moves(jump, props.data[2], mainPlayer, secondPlayer, props.turn, false);

    // if this checker is a king
    if (
      (document.getElementById(props.data[2]).className === "king redColor" &&
        props.turn === "red") ||
      (document.getElementById(props.data[2]).className === "king greenColor" &&
        props.turn === "green")
    ) {
      jumps(props.data[2], mainPlayer, secondPlayer, oppositeTurn, true);
      jumps(props.data[2], mainPlayer, secondPlayer, oppositeTurn, false);
      moves(jump, props.data[2], mainPlayer, secondPlayer, oppositeTurn, true);
      moves(jump, props.data[2], mainPlayer, secondPlayer, oppositeTurn, false);
    }

    props.updateTile(props.data[2]);
  };

  //check must taken jumps
  const checkJumps = (jump, kings, mainPlayer, secondPlayer, color) => {
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
        jump = true;
      }
    }

    return jump;
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

  //check optional jumps
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
      checkTiles(jump, data, color);
    }
  };

  //check optional moves
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
      checkTiles(move, data, color);
    }
  };

  // add move to moves array
  const addMove = (className, steps) => {
    if (document.getElementById(props.location).className === className) {
      props.updateMoves([props.location, props.data[2], steps, props.turn]);
    } else {
      props.updateMoves([props.location, props.data[2], steps]);
    }
  };

  const move = (method) => {
    clear();

    if (method === 1 && props.turn === "red") {
      player();
    }
    if (method === 2 && props.turn === "green") {
      player();
    }
    if (method === 0) {
      // moving player
      let arr = [],
        steps = 0;

      kingMaker(`king ${props.turn === "red" ? "redColor" : "greenColor"}`);

      const newArray = (props.turn === "red" ? props.red : props.green).filter(
        (i) => i !== props.location
      );
      newArray.push(props.data[2]);

      if (props.data[2] - props.location === 18) {
        arr = jumpCalc(arr, props.data[2] - 9);
        steps = props.turn === "red" ? 9 : -9;
      }
      if (props.location - props.data[2] === 18) {
        arr = jumpCalc(arr, props.data[2] + 9);
        steps = props.turn === "red" ? -9 : 9;
      }
      if (props.data[2] - props.location === 14) {
        arr = jumpCalc(arr, props.data[2] - 7);
        steps = props.turn === "red" ? 7 : -7;
      }
      if (props.location - props.data[2] === 14) {
        arr = jumpCalc(arr, props.data[2] + 7);
        steps = props.turn === "red" ? -7 : 7;
      }

      addMove(
        `king ${props.turn === "red" ? "redColor" : "greenColor"}`,
        steps
      );

      if (props.turn === "red") {
        props.updateRed(newArray);
      } else {
        props.updateGreen(newArray);
      }

      props.updateTile(0);
      props.updateTurn(props.turn === "red" ? "green" : "red");
    }
  };

  return props.data[1] === "black" ? ( // black tile
    <>
      {props.red.includes(props.data[2]) ? (
        <Player
          id={props.data[2]}
          className={`${
            document.getElementById(props.data[2]) !== null &&
            document.getElementById(props.data[2]).className === "king redColor"
              ? "king"
              : "checker"
          } redColor`}
          onClick={() => move(1)}
        />
      ) : null}
      {props.green.includes(props.data[2]) ? (
        <Player
          id={props.data[2]}
          className={`${
            document.getElementById(props.data[2]) !== null &&
            document.getElementById(props.data[2]).className ===
              "king greenColor"
              ? "king"
              : "checker"
          } greenColor`}
          onClick={() => move(2)}
        />
      ) : null}
      {!props.green.includes(props.data[2]) &&
      !props.red.includes(props.data[2]) ? (
        <Player
          id={props.data[2]}
          style={{ display: "inline-flex", height: "40px" }}
          onClick={() => move(0)}
        />
      ) : null}
    </>
  ) : (
    // white tile
    <span style={{ display: "inline-flex", height: "40px" }}></span>
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
