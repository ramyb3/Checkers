import "./App.css";
import { clear } from "./App";
import React from "react";

function Start(props) {
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

      //check must taken jumps
      for (let i = 0; i < props.red.length; i++) {
        if (
          (props.green.includes(props.red[i] + 9) &&
            !props.green.includes(props.red[i] + 18) &&
            !props.red.includes(props.red[i] + 18) &&
            document.getElementById(props.red[i] + 18) !== null) ||
          (props.green.includes(props.red[i] + 7) &&
            !props.green.includes(props.red[i] + 14) &&
            !props.red.includes(props.red[i] + 14) &&
            document.getElementById(props.red[i] + 14) !== null)
        ) {
          jump = true;
        }
      }

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
        !props.red.includes(props.props[2] + 9) &&
        !props.red.includes(props.props[2] + 18) &&
        document.getElementById(props.props[2] + 18) !== null &&
        props.green.includes(props.props[2] + 9) &&
        !props.green.includes(props.props[2] + 18)
      ) {
        if (props.props[2] + 18 > 57) {
          document.getElementById(props.props[2] + 18).className = "kingRed";
        } else {
          document.getElementById(props.props[2] + 18).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] + 18).style.backgroundColor =
          "black";
      }

      // jump to left
      if (
        !props.red.includes(props.props[2] + 7) &&
        !props.red.includes(props.props[2] + 14) &&
        document.getElementById(props.props[2] + 14) !== null &&
        props.green.includes(props.props[2] + 7) &&
        !props.green.includes(props.props[2] + 14)
      ) {
        if (props.props[2] + 14 > 57) {
          document.getElementById(props.props[2] + 14).className = "kingRed";
        } else {
          document.getElementById(props.props[2] + 14).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] + 14).style.backgroundColor =
          "black";
      }

      // move to right
      if (
        !jump &&
        !props.red.includes(props.props[2] + 9) &&
        document.getElementById(props.props[2] + 9) !== null &&
        !props.green.includes(props.props[2] + 9)
      ) {
        if (props.props[2] + 9 > 57) {
          document.getElementById(props.props[2] + 9).className = "kingRed";
        } else {
          document.getElementById(props.props[2] + 9).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] + 9).style.backgroundColor =
          "black";
      }

      // move to left
      if (
        !jump &&
        !props.red.includes(props.props[2] + 7) &&
        document.getElementById(props.props[2] + 7) !== null &&
        !props.green.includes(props.props[2] + 7)
      ) {
        if (props.props[2] + 7 > 57) {
          document.getElementById(props.props[2] + 7).className = "kingRed";
        } else {
          document.getElementById(props.props[2] + 7).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] + 7).style.backgroundColor =
          "black";
      }

      // if this checker is king
      if (document.getElementById(props.props[2]).className === "kingRed") {
        // jump to up-right
        if (
          !props.red.includes(props.props[2] - 7) &&
          !props.red.includes(props.props[2] - 14) &&
          document.getElementById(props.props[2] - 14) !== null &&
          props.green.includes(props.props[2] - 7) &&
          !props.green.includes(props.props[2] - 14)
        ) {
          document.getElementById(props.props[2] - 14).className = "kingRed";
          document.getElementById(props.props[2] - 14).style.backgroundColor =
            "black";
        }

        // jump to up-left
        if (
          !props.red.includes(props.props[2] - 9) &&
          !props.red.includes(props.props[2] - 18) &&
          document.getElementById(props.props[2] - 18) !== null &&
          props.green.includes(props.props[2] - 9) &&
          !props.green.includes(props.props[2] - 18)
        ) {
          document.getElementById(props.props[2] - 18).className = "kingRed";
          document.getElementById(props.props[2] - 18).style.backgroundColor =
            "black";
        }

        // move to up-right
        if (
          !jump &&
          !props.red.includes(props.props[2] - 7) &&
          document.getElementById(props.props[2] - 7) !== null &&
          !props.green.includes(props.props[2] - 7)
        ) {
          document.getElementById(props.props[2] - 7).className = "kingRed";
          document.getElementById(props.props[2] - 7).style.backgroundColor =
            "black";
        }

        // move to up-left
        if (
          !jump &&
          !props.red.includes(props.props[2] - 9) &&
          document.getElementById(props.props[2] - 9) !== null &&
          !props.green.includes(props.props[2] - 9)
        ) {
          document.getElementById(props.props[2] - 9).className = "kingRed";
          document.getElementById(props.props[2] - 9).style.backgroundColor =
            "black";
        }
      }

      props.callback(props.props[2]);
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

      //check must taken jumps
      for (let i = 0; i < props.green.length; i++) {
        if (
          (props.red.includes(props.green[i] - 9) &&
            !props.red.includes(props.green[i] - 18) &&
            !props.green.includes(props.green[i] - 18) &&
            document.getElementById(props.green[i] - 18) !== null) ||
          (props.red.includes(props.green[i] - 7) &&
            !props.red.includes(props.green[i] - 14) &&
            !props.green.includes(props.green[i] - 14) &&
            document.getElementById(props.green[i] - 14) !== null)
        ) {
          jump = true;
        }
      }

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
        !props.green.includes(props.props[2] - 7) &&
        !props.green.includes(props.props[2] - 14) &&
        document.getElementById(props.props[2] - 14) !== null &&
        props.red.includes(props.props[2] - 7) &&
        !props.red.includes(props.props[2] - 14)
      ) {
        if (props.props[2] - 14 < 8) {
          document.getElementById(props.props[2] - 14).className = "kingGreen";
        } else {
          document.getElementById(props.props[2] - 14).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] - 14).style.backgroundColor =
          "black";
      }

      // jump to left
      if (
        !props.green.includes(props.props[2] - 9) &&
        !props.green.includes(props.props[2] - 18) &&
        document.getElementById(props.props[2] - 18) !== null &&
        props.red.includes(props.props[2] - 9) &&
        !props.red.includes(props.props[2] - 18)
      ) {
        if (props.props[2] - 18 < 8) {
          document.getElementById(props.props[2] - 18).className = "kingGreen";
        } else {
          document.getElementById(props.props[2] - 18).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] - 18).style.backgroundColor =
          "black";
      }

      // move to right
      if (
        !jump &&
        !props.green.includes(props.props[2] - 7) &&
        document.getElementById(props.props[2] - 7) !== null &&
        !props.red.includes(props.props[2] - 7)
      ) {
        if (props.props[2] - 7 < 8) {
          document.getElementById(props.props[2] - 7).className = "kingGreen";
        } else {
          document.getElementById(props.props[2] - 7).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] - 7).style.backgroundColor =
          "black";
      }

      // move to left
      if (
        !jump &&
        !props.green.includes(props.props[2] - 9) &&
        document.getElementById(props.props[2] - 9) !== null &&
        !props.red.includes(props.props[2] - 9)
      ) {
        if (props.props[2] - 9 < 8) {
          document.getElementById(props.props[2] - 9).className = "kingGreen";
        } else {
          document.getElementById(props.props[2] - 9).className =
            document.getElementById(props.props[2]).className;
        }

        document.getElementById(props.props[2] - 9).style.backgroundColor =
          "black";
      }

      // if this checker is king
      if (document.getElementById(props.props[2]).className === "kingGreen") {
        // jump to down-right
        if (
          !props.green.includes(props.props[2] + 9) &&
          !props.green.includes(props.props[2] + 18) &&
          document.getElementById(props.props[2] + 18) !== null &&
          props.red.includes(props.props[2] + 9) &&
          !props.red.includes(props.props[2] + 18)
        ) {
          document.getElementById(props.props[2] + 18).className = "kingGreen";
          document.getElementById(props.props[2] + 18).style.backgroundColor =
            "black";
        }

        // jump to down-left
        if (
          !props.green.includes(props.props[2] + 7) &&
          !props.green.includes(props.props[2] + 14) &&
          document.getElementById(props.props[2] + 14) !== null &&
          props.red.includes(props.props[2] + 7) &&
          !props.red.includes(props.props[2] + 14)
        ) {
          document.getElementById(props.props[2] + 14).className = "kingGreen";
          document.getElementById(props.props[2] + 14).style.backgroundColor =
            "black";
        }

        // move to down-right
        if (
          !jump &&
          !props.green.includes(props.props[2] + 9) &&
          document.getElementById(props.props[2] + 9) !== null &&
          !props.red.includes(props.props[2] + 9)
        ) {
          document.getElementById(props.props[2] + 9).className = "kingGreen";
          document.getElementById(props.props[2] + 9).style.backgroundColor =
            "black";
        }

        // move to down-left
        if (
          !jump &&
          !props.green.includes(props.props[2] + 7) &&
          document.getElementById(props.props[2] + 7) !== null &&
          !props.red.includes(props.props[2] + 7)
        ) {
          document.getElementById(props.props[2] + 7).className = "kingGreen";
          document.getElementById(props.props[2] + 7).style.backgroundColor =
            "black";
        }
      }

      props.callback(props.props[2]);
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
          props.props[2] > 57
        ) {
          props.king([props.props[2], "red"]);
        }

        temp = props.red.filter((i) => i !== props.location);
        temp.push(props.props[2]);

        // jump to right
        if (props.props[2] - props.location === 18) {
          document.getElementById(props.props[2] - 9).className = "";

          arr = props.green.filter((i) => i !== props.props[2] - 9);
          props.updateGreen(arr);

          check = 9;
        }

        // jump to left
        if (props.props[2] - props.location === 14) {
          document.getElementById(props.props[2] - 7).className = "";

          arr = props.green.filter((i) => i !== props.props[2] - 7);
          props.updateGreen(arr);

          check = 7;
        }

        // jump to right if king
        if (props.location - props.props[2] === 14) {
          document.getElementById(props.props[2] + 7).className = "";

          arr = props.green.filter((i) => i !== props.props[2] + 7);
          props.updateGreen(arr);

          check = -7;
        }

        // jump to left if king
        if (props.location - props.props[2] === 18) {
          document.getElementById(props.props[2] + 9).className = "";

          arr = props.green.filter((i) => i !== props.props[2] + 9);
          props.updateGreen(arr);

          check = -9;
        }

        // if this checker is king
        if (document.getElementById(props.location).className === "kingRed") {
          props.undo([props.location, props.props[2], check, "red"]);
        } else {
          props.undo([props.location, props.props[2], check]);
        }

        props.updateRed(temp);
        props.callback(0);
        props.updateTurn("green");
      }

      //green player
      if (props.green.includes(props.location)) {
        if (
          document.getElementById(props.location).className === "kingGreen" ||
          props.props[2] < 8
        ) {
          props.king([props.props[2], "green"]);
        }

        temp = props.green.filter((i) => i !== props.location);
        temp.push(props.props[2]);

        // jump to left
        if (props.location - props.props[2] === 18) {
          document.getElementById(props.props[2] + 9).className = "";

          arr = props.red.filter((i) => i !== props.props[2] + 9);
          props.updateRed(arr);

          check = 9;
        }

        // jump to right
        if (props.location - props.props[2] === 14) {
          document.getElementById(props.props[2] + 7).className = "";

          arr = props.red.filter((i) => i !== props.props[2] + 7);
          props.updateRed(arr);

          check = 7;
        }

        // jump to left if king
        if (props.props[2] - props.location === 14) {
          document.getElementById(props.props[2] - 7).className = "";

          arr = props.red.filter((i) => i !== props.props[2] - 7);
          props.updateRed(arr);

          check = -7;
        }

        // jump to right if king
        if (props.props[2] - props.location === 18) {
          document.getElementById(props.props[2] - 9).className = "";

          arr = props.red.filter((i) => i !== props.props[2] - 9);
          props.updateRed(arr);

          check = -9;
        }

        // if this checker is king
        if (document.getElementById(props.location).className === "kingGreen") {
          props.undo([props.location, props.props[2], check, "green"]);
        } else {
          props.undo([props.location, props.props[2], check]);
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
        props.props[1] === "black" ? ( // black tile
          <>
            <>
              {props.red.includes(props.props[2]) ? (
                <>
                  {document.getElementById(props.props[2]) !== null &&
                  document.getElementById(props.props[2]).className ===
                    "kingRed" ? (
                    <span
                      id={props.props[2]}
                      className="kingRed"
                      onClick={() => move(1)}
                    ></span>
                  ) : (
                    <span
                      id={props.props[2]}
                      className="red"
                      onClick={() => move(1)}
                    ></span>
                  )}
                </>
              ) : null}
            </>

            <>
              {props.green.includes(props.props[2]) ? (
                <>
                  {document.getElementById(props.props[2]) !== null &&
                  document.getElementById(props.props[2]).className ===
                    "kingGreen" ? (
                    <span
                      id={props.props[2]}
                      className="kingGreen"
                      onClick={() => move(2)}
                    ></span>
                  ) : (
                    <span
                      id={props.props[2]}
                      className="green"
                      onClick={() => move(2)}
                    ></span>
                  )}
                </>
              ) : null}
            </>

            <>
              {!props.green.includes(props.props[2]) &&
              !props.red.includes(props.props[2]) ? (
                <span
                  id={props.props[2]}
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

export default Start;
