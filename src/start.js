import "./App.css";
import { clear } from "./App";
import React from "react";

export default function StartGame(props) {
  //check must taken jumps
  const checkJumps = (mainPlayer, secondPlayer, color) => {
    for (let i = 0; i < mainPlayer.length; i++) {
      if (
        (secondPlayer.includes(mainPlayer[i] + (color === "red" ? 9 : -9)) &&
          !secondPlayer.includes(
            mainPlayer[i] + (color === "red" ? 18 : -18)
          ) &&
          !mainPlayer.includes(mainPlayer[i] + (color === "red" ? 18 : -18)) &&
          document.getElementById(
            mainPlayer[i] + (color === "red" ? 18 : -18)
          ) !== null) ||
        (secondPlayer.includes(mainPlayer[i] + (color === "red" ? 7 : -7)) &&
          !secondPlayer.includes(
            mainPlayer[i] + (color === "red" ? 14 : -14)
          ) &&
          !mainPlayer.includes(mainPlayer[i] + (color === "red" ? 14 : -14)) &&
          document.getElementById(
            mainPlayer[i] + (color === "red" ? 14 : -14)
          ) !== null)
      ) {
        return true;
      }
    }

    return false;
  };

  const move = (x) => {
    let jump = false,
      king = false,
      kingCount = [];

    clear(); // reset optional moves

    // red player
    if (x === 1 && props.turn === "red") {
      //check kings
      for (let i = 1; i < 65; i++) {
        if (
          document.getElementById(i) !== null &&
          document.getElementById(i).className === "kingRed"
        ) {
          king = true;
          kingCount.push(i);
        }
      }

      jump = checkJumps(props.red, props.green, props.turn);

      //check must taken jumps if there's king
      if (king) {
        for (let i = 0; i < kingCount.length; i++) {
          if (
            (props.green.includes(kingCount[i] - 9) &&
              !props.green.includes(kingCount[i] - 18) &&
              !props.red.includes(kingCount[i] - 18) &&
              document.getElementById(kingCount[i] - 18) !== null) ||
            (props.green.includes(kingCount[i] - 7) &&
              !props.green.includes(kingCount[i] - 14) &&
              !props.red.includes(kingCount[i] - 14) &&
              document.getElementById(kingCount[i] - 14) !== null)
          ) {
            jump = true;
          }
        }
      }

      // jump to right
      if (
        !props.red.includes(props.data[2] + 9) &&
        !props.red.includes(props.data[2] + 18) &&
        document.getElementById(props.data[2] + 18) !== null &&
        props.green.includes(props.data[2] + 9) &&
        !props.green.includes(props.data[2] + 18)
      ) {
        if (props.data[2] + 18 > 57) {
          document.getElementById(props.data[2] + 18).className = "kingRed";
        } else {
          document.getElementById(props.data[2] + 18).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] + 18).style.backgroundColor =
          "black";
      }

      // jump to left
      if (
        !props.red.includes(props.data[2] + 7) &&
        !props.red.includes(props.data[2] + 14) &&
        document.getElementById(props.data[2] + 14) !== null &&
        props.green.includes(props.data[2] + 7) &&
        !props.green.includes(props.data[2] + 14)
      ) {
        if (props.data[2] + 14 > 57) {
          document.getElementById(props.data[2] + 14).className = "kingRed";
        } else {
          document.getElementById(props.data[2] + 14).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] + 14).style.backgroundColor =
          "black";
      }

      // move to right
      if (
        !jump &&
        !props.red.includes(props.data[2] + 9) &&
        document.getElementById(props.data[2] + 9) !== null &&
        !props.green.includes(props.data[2] + 9)
      ) {
        if (props.data[2] + 9 > 57) {
          document.getElementById(props.data[2] + 9).className = "kingRed";
        } else {
          document.getElementById(props.data[2] + 9).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] + 9).style.backgroundColor =
          "black";
      }

      // move to left
      if (
        !jump &&
        !props.red.includes(props.data[2] + 7) &&
        document.getElementById(props.data[2] + 7) !== null &&
        !props.green.includes(props.data[2] + 7)
      ) {
        if (props.data[2] + 7 > 57) {
          document.getElementById(props.data[2] + 7).className = "kingRed";
        } else {
          document.getElementById(props.data[2] + 7).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] + 7).style.backgroundColor =
          "black";
      }

      // if this checker is king
      if (document.getElementById(props.data[2]).className === "kingRed") {
        // jump to up-right
        if (
          !props.red.includes(props.data[2] - 7) &&
          !props.red.includes(props.data[2] - 14) &&
          document.getElementById(props.data[2] - 14) !== null &&
          props.green.includes(props.data[2] - 7) &&
          !props.green.includes(props.data[2] - 14)
        ) {
          document.getElementById(props.data[2] - 14).className = "kingRed";
          document.getElementById(props.data[2] - 14).style.backgroundColor =
            "black";
        }

        // jump to up-left
        if (
          !props.red.includes(props.data[2] - 9) &&
          !props.red.includes(props.data[2] - 18) &&
          document.getElementById(props.data[2] - 18) !== null &&
          props.green.includes(props.data[2] - 9) &&
          !props.green.includes(props.data[2] - 18)
        ) {
          document.getElementById(props.data[2] - 18).className = "kingRed";
          document.getElementById(props.data[2] - 18).style.backgroundColor =
            "black";
        }

        // move to up-right
        if (
          !jump &&
          !props.red.includes(props.data[2] - 7) &&
          document.getElementById(props.data[2] - 7) !== null &&
          !props.green.includes(props.data[2] - 7)
        ) {
          document.getElementById(props.data[2] - 7).className = "kingRed";
          document.getElementById(props.data[2] - 7).style.backgroundColor =
            "black";
        }

        // move to up-left
        if (
          !jump &&
          !props.red.includes(props.data[2] - 9) &&
          document.getElementById(props.data[2] - 9) !== null &&
          !props.green.includes(props.data[2] - 9)
        ) {
          document.getElementById(props.data[2] - 9).className = "kingRed";
          document.getElementById(props.data[2] - 9).style.backgroundColor =
            "black";
        }
      }

      props.callback(props.data[2]);
    }

    // green player
    if (x === 2 && props.turn === "green") {
      //check kings
      for (let i = 1; i < 65; i++) {
        if (
          document.getElementById(i) !== null &&
          document.getElementById(i).className === "kingGreen"
        ) {
          king = true;
          kingCount.push(i);
        }
      }

      jump = checkJumps(props.green, props.red, props.turn);

      //check must taken jumps if there's king
      if (king) {
        for (let i = 0; i < kingCount.length; i++) {
          if (
            (props.red.includes(kingCount[i] + 9) &&
              !props.red.includes(kingCount[i] + 18) &&
              !props.green.includes(kingCount[i] + 18) &&
              document.getElementById(kingCount[i] + 18) !== null) ||
            (props.red.includes(kingCount[i] + 7) &&
              !props.red.includes(kingCount[i] + 14) &&
              !props.green.includes(kingCount[i] + 14) &&
              document.getElementById(kingCount[i] + 14) !== null)
          ) {
            jump = true;
          }
        }
      }

      // jump to right
      if (
        !props.green.includes(props.data[2] - 7) &&
        !props.green.includes(props.data[2] - 14) &&
        document.getElementById(props.data[2] - 14) !== null &&
        props.red.includes(props.data[2] - 7) &&
        !props.red.includes(props.data[2] - 14)
      ) {
        if (props.data[2] - 14 < 8) {
          document.getElementById(props.data[2] - 14).className = "kingGreen";
        } else {
          document.getElementById(props.data[2] - 14).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] - 14).style.backgroundColor =
          "black";
      }

      // jump to left
      if (
        !props.green.includes(props.data[2] - 9) &&
        !props.green.includes(props.data[2] - 18) &&
        document.getElementById(props.data[2] - 18) !== null &&
        props.red.includes(props.data[2] - 9) &&
        !props.red.includes(props.data[2] - 18)
      ) {
        if (props.data[2] - 18 < 8) {
          document.getElementById(props.data[2] - 18).className = "kingGreen";
        } else {
          document.getElementById(props.data[2] - 18).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] - 18).style.backgroundColor =
          "black";
      }

      // move to right
      if (
        !jump &&
        !props.green.includes(props.data[2] - 7) &&
        document.getElementById(props.data[2] - 7) !== null &&
        !props.red.includes(props.data[2] - 7)
      ) {
        if (props.data[2] - 7 < 8) {
          document.getElementById(props.data[2] - 7).className = "kingGreen";
        } else {
          document.getElementById(props.data[2] - 7).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] - 7).style.backgroundColor =
          "black";
      }

      // move to left
      if (
        !jump &&
        !props.green.includes(props.data[2] - 9) &&
        document.getElementById(props.data[2] - 9) !== null &&
        !props.red.includes(props.data[2] - 9)
      ) {
        if (props.data[2] - 9 < 8) {
          document.getElementById(props.data[2] - 9).className = "kingGreen";
        } else {
          document.getElementById(props.data[2] - 9).className =
            document.getElementById(props.data[2]).className;
        }

        document.getElementById(props.data[2] - 9).style.backgroundColor =
          "black";
      }

      // if this checker is king
      if (document.getElementById(props.data[2]).className === "kingGreen") {
        // jump to down-right
        if (
          !props.green.includes(props.data[2] + 9) &&
          !props.green.includes(props.data[2] + 18) &&
          document.getElementById(props.data[2] + 18) !== null &&
          props.red.includes(props.data[2] + 9) &&
          !props.red.includes(props.data[2] + 18)
        ) {
          document.getElementById(props.data[2] + 18).className = "kingGreen";
          document.getElementById(props.data[2] + 18).style.backgroundColor =
            "black";
        }

        // jump to down-left
        if (
          !props.green.includes(props.data[2] + 7) &&
          !props.green.includes(props.data[2] + 14) &&
          document.getElementById(props.data[2] + 14) !== null &&
          props.red.includes(props.data[2] + 7) &&
          !props.red.includes(props.data[2] + 14)
        ) {
          document.getElementById(props.data[2] + 14).className = "kingGreen";
          document.getElementById(props.data[2] + 14).style.backgroundColor =
            "black";
        }

        // move to down-right
        if (
          !jump &&
          !props.green.includes(props.data[2] + 9) &&
          document.getElementById(props.data[2] + 9) !== null &&
          !props.red.includes(props.data[2] + 9)
        ) {
          document.getElementById(props.data[2] + 9).className = "kingGreen";
          document.getElementById(props.data[2] + 9).style.backgroundColor =
            "black";
        }

        // move to down-left
        if (
          !jump &&
          !props.green.includes(props.data[2] + 7) &&
          document.getElementById(props.data[2] + 7) !== null &&
          !props.red.includes(props.data[2] + 7)
        ) {
          document.getElementById(props.data[2] + 7).className = "kingGreen";
          document.getElementById(props.data[2] + 7).style.backgroundColor =
            "black";
        }
      }

      props.callback(props.data[2]);
    }

    // moving player
    if (x === 0) {
      let temp = [],
        arr = [],
        check = 0;

      //red player
      if (props.red.includes(props.location)) {
        if (
          document.getElementById(props.location).className === "kingRed" ||
          props.data[2] > 57
        ) {
          props.king([props.data[2], "red"]);
        }

        temp = props.red.filter((i) => i !== props.location);
        temp.push(props.data[2]);

        // jump to right
        if (props.data[2] - props.location === 18) {
          document.getElementById(props.data[2] - 9).className = "";

          arr = props.green.filter((i) => i !== props.data[2] - 9);
          props.updateGreen(arr);

          check = 9;
        }

        // jump to left
        if (props.data[2] - props.location === 14) {
          document.getElementById(props.data[2] - 7).className = "";

          arr = props.green.filter((i) => i !== props.data[2] - 7);
          props.updateGreen(arr);

          check = 7;
        }

        // jump to right if king
        if (props.location - props.data[2] === 14) {
          document.getElementById(props.data[2] + 7).className = "";

          arr = props.green.filter((i) => i !== props.data[2] + 7);
          props.updateGreen(arr);

          check = -7;
        }

        // jump to left if king
        if (props.location - props.data[2] === 18) {
          document.getElementById(props.data[2] + 9).className = "";

          arr = props.green.filter((i) => i !== props.data[2] + 9);
          props.updateGreen(arr);

          check = -9;
        }

        // if this checker is king
        if (document.getElementById(props.location).className === "kingRed") {
          props.undo([props.location, props.data[2], check, "red"]);
        } else {
          props.undo([props.location, props.data[2], check]);
        }

        props.updateRed(temp);
        props.callback(0);
        props.updateTurn("green");
      }

      //green player
      if (props.green.includes(props.location)) {
        if (
          document.getElementById(props.location).className === "kingGreen" ||
          props.data[2] < 8
        ) {
          props.king([props.data[2], "green"]);
        }

        temp = props.green.filter((i) => i !== props.location);
        temp.push(props.data[2]);

        // jump to left
        if (props.location - props.data[2] === 18) {
          document.getElementById(props.data[2] + 9).className = "";

          arr = props.red.filter((i) => i !== props.data[2] + 9);
          props.updateRed(arr);

          check = 9;
        }

        // jump to right
        if (props.location - props.data[2] === 14) {
          document.getElementById(props.data[2] + 7).className = "";

          arr = props.red.filter((i) => i !== props.data[2] + 7);
          props.updateRed(arr);

          check = 7;
        }

        // jump to left if king
        if (props.data[2] - props.location === 14) {
          document.getElementById(props.data[2] - 7).className = "";

          arr = props.red.filter((i) => i !== props.data[2] - 7);
          props.updateRed(arr);

          check = -7;
        }

        // jump to right if king
        if (props.data[2] - props.location === 18) {
          document.getElementById(props.data[2] - 9).className = "";

          arr = props.red.filter((i) => i !== props.data[2] - 9);
          props.updateRed(arr);

          check = -9;
        }

        // if this checker is king
        if (document.getElementById(props.location).className === "kingGreen") {
          props.undo([props.location, props.data[2], check, "green"]);
        } else {
          props.undo([props.location, props.data[2], check]);
        }

        props.updateGreen(temp);
        props.callback(0);
        props.updateTurn("red");
      }
    }
  };

  return (
    <>
      {
        props.data[1] === "black" ? ( // black tile
          <>
            <>
              {props.red.includes(props.data[2]) ? (
                <>
                  {document.getElementById(props.data[2]) !== null &&
                  document.getElementById(props.data[2]).className ===
                    "kingRed" ? (
                    <span
                      id={props.data[2]}
                      className="kingRed"
                      onClick={() => move(1)}
                    ></span>
                  ) : (
                    <span
                      id={props.data[2]}
                      className="red"
                      onClick={() => move(1)}
                    ></span>
                  )}
                </>
              ) : null}
            </>

            <>
              {props.green.includes(props.data[2]) ? (
                <>
                  {document.getElementById(props.data[2]) !== null &&
                  document.getElementById(props.data[2]).className ===
                    "kingGreen" ? (
                    <span
                      id={props.data[2]}
                      className="kingGreen"
                      onClick={() => move(2)}
                    ></span>
                  ) : (
                    <span
                      id={props.data[2]}
                      className="green"
                      onClick={() => move(2)}
                    ></span>
                  )}
                </>
              ) : null}
            </>

            <>
              {!props.green.includes(props.data[2]) &&
              !props.red.includes(props.data[2]) ? (
                <span
                  id={props.data[2]}
                  onClick={() => move(0)}
                  style={{ display: "inline-flex", height: "40px" }}
                ></span>
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
