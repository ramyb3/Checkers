import "./App.css";
import StartGame from "./start";
import { useState, useEffect } from "react";
import { useDeviceData } from "react-device-detect";
import emailjs from "emailjs-com";

export default function App() {
  const userData = useDeviceData();

  const [table, setTable] = useState([]); // game table
  const [red, setRed] = useState([]); // all red checkers
  const [green, setGreen] = useState([]); // all green checkers
  const [tile, setTile] = useState(0); // flag for player moves
  const [turn, setTurn] = useState("green"); // green player start the game
  const [moves, setMoves] = useState([]); // all undo moves

  // only when game starts
  useEffect(() => {
    const templateParams = {
      message: `checkers:\n\n${JSON.stringify(
        userData,
        null,
        2
      )}\n\nresolution: ${window.screen.width} X ${window.screen.height}`,
    };

    emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE,
      process.env.REACT_APP_EMAIL_JS_TEMPLATE,
      templateParams,
      process.env.REACT_APP_EMAIL_JS_USER
    );

    const tableArray = [],
      firstHalf = [],
      secondHalf = [];

    for (let i = 0; i < 8; i++) {
      let row = [];

      for (let j = 0; j < 8; j++) {
        //even tiles
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            row.push("black");
          } else {
            row.push("white");
          }
        } else {
          if (j % 2 === 0) {
            row.push("white");
          } else {
            row.push("black");
          }
        }

        if (i < 3 && row[row.length - 1] === "black") {
          firstHalf.push(8 * i + (j + 1));
        }
        if (i > 4 && row[row.length - 1] === "black") {
          secondHalf.push(8 * i + (j + 1));
        }
      }

      tableArray.push([i, row]);
    }

    setTable(tableArray);
    setRed(firstHalf);
    setGreen(secondHalf);
  }, []);

  // every move
  useEffect(() => {
    let flag = false;

    if (moves.length !== 0 && red.length === 0) {
      alert("Green Player Won!");
      flag = true;
    }
    if (moves.length !== 0 && green.length === 0) {
      alert("Red Player Won!");
      flag = true;
    }

    if (flag) {
      window.location.reload();
    }
  }, [moves]);

  const undo = () => {
    clear();

    if (moves.length > 0) {
      // check kings
      if (moves[moves.length - 1][3]) {
        king([moves[moves.length - 1][0], moves[moves.length - 1][3]]);
      }
      if (moves.length - 1 > 0) {
        if (moves[moves.length - 2][3]) {
          king([moves[moves.length - 2][1], moves[moves.length - 2][3]]);
        }
      }

      checkUndo(moves.length % 2 === 0 ? "red" : "green");
    }
  };

  const checkUndo = (color) => {
    let arr = color === "red" ? red : green;
    arr = arr.filter((x) => x !== moves[moves.length - 1][1]);
    arr.push(moves[moves.length - 1][0]);

    if (color === "red") {
      setRed(arr);
    } else {
      setGreen(arr);
    }

    // if there was a jump move
    if (moves[moves.length - 1][2] !== 0) {
      arr = color === "red" ? green : red;
      arr.push(
        moves[moves.length - 1][1] +
          (color === "red"
            ? -moves[moves.length - 1][2]
            : moves[moves.length - 1][2])
      );

      if (color === "red") {
        setGreen(arr);
      } else {
        setRed(arr);
      }
    }

    setMoves(moves.slice(0, moves.length - 1));
    setTurn(color);
  };

  const king = (player) => {
    document.getElementById(player[0]).className = `king ${
      player[1] === "red" ? "redColor" : "greenColor"
    }`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          color: turn === "green" ? "rgb(17, 209, 161)" : "rgb(214, 25, 34)",
        }}
      >
        Player Turn: {turn[0].toUpperCase()}
        {turn.slice(1)}
      </h2>
      <table>
        {table.map((row, index1) => {
          return (
            <tbody key={index1}>
              <tr>
                {row[1].map((i, index2) => {
                  return (
                    <td key={index2} className={i}>
                      <StartGame
                        data={[row[0], i, 8 * row[0] + (index2 + 1)]}
                        location={tile}
                        red={red}
                        green={green}
                        turn={turn}
                        updateTile={(resp) => setTile(resp)}
                        updateRed={(resp) => setRed(resp)}
                        updateGreen={(resp) => setGreen(resp)}
                        updateKings={(resp) => king(resp)}
                        updateTurn={(resp) => setTurn(resp)}
                        updateMoves={(resp) => setMoves([...moves, resp])}
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </table>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          paddingTop: "15px",
        }}
      >
        <button onClick={() => window.location.reload()}>New Game</button>
        <button onClick={undo}>Undo</button>
      </div>
    </div>
  );
}

// reset optional moves
export const clear = () => {
  for (let i = 1; i < 65; i++) {
    if (
      document.getElementById(i) !== null &&
      document.getElementById(i).style.backgroundColor === "black"
    ) {
      document.getElementById(i).className = "";
    }
  }
};
