import React from "react";
import "./App.css";
import StartGame from "./start";
import emailjs from "emailjs-com";

export default function App() {
  const [table, setTable] = React.useState([]); // game table
  const [red, setRed] = React.useState([]); // all red checkers
  const [green, setGreen] = React.useState([]); // all green checkers
  const [tile, setTile] = React.useState(0); // flag for player moves
  const [turn, setTurn] = React.useState("green"); // green player start the game
  const [moves, setMoves] = React.useState([]); // all undo moves

  // only when game starts
  React.useEffect(() => {
    const templateParams = {
      message: `checkers:\n${navigator.userAgent};\nresolution: ${window.screen.width} X ${window.screen.height}`,
    };
    // emailjs.send(
    //   process.env.REACT_APP_EMAIL_JS_SERVICE,
    //   process.env.REACT_APP_EMAIL_JS_TEMPLATE,
    //   templateParams,
    //   process.env.REACT_APP_EMAIL_JS_USER
    // );

    let arr = [],
      temp,
      check1 = [],
      check2 = [];

    for (let i = 0; i < 8; i++) {
      temp = [];

      for (let j = 0; j < 8; j++) {
        //even tiles
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            temp.push("black");
          } else {
            temp.push("white");
          }
        } else {
          if (j % 2 === 0) {
            temp.push("white");
          } else {
            temp.push("black");
          }
        }

        if (i < 3 && temp[temp.length - 1] === "black") {
          check1.push(8 * i + (j + 1));
        }
        if (i > 4 && temp[temp.length - 1] === "black") {
          check2.push(8 * i + (j + 1));
        }
      }

      arr.push([i, temp]);
    }

    setTable(arr);
    setRed(check1);
    setGreen(check2);
  }, []);

  const undo = () => {
    clear(); // reset optional moves

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

      if (moves.length % 2 === 0) {
        checkUndo("red");
      } else {
        checkUndo("green");
      }
    }
  };

  const checkUndo = (color) => {
    let arr = [];

    arr = (color === "red" ? red : green).filter(
      (x) => x !== moves[moves.length - 1][1]
    );
    arr.push(moves[moves.length - 1][0]);

    if (color === "red") {
      setRed(arr);
    } else {
      setGreen(arr);
    }

    // if was a jump move
    if (moves[moves.length - 1][2] !== 0) {
      arr = color === "red" ? green : red;
      arr.push(moves[moves.length - 1][1] - moves[moves.length - 1][2]);

      if (color === "red") {
        setGreen(arr);
      } else {
        setRed(arr);
      }
    }

    setMoves(moves.slice(0, moves.length - 1));
    setTurn(color);
  };

  const king = (x) => {
    if (x[1] === "red") {
      document.getElementById(x[0]).className = "kingRed";
    } else {
      document.getElementById(x[0]).className = "kingGreen";
    }
  };

  // every move
  React.useEffect(() => {
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
      <table className="table">
        {table.map((row, temp) => {
          return (
            <tbody key={temp}>
              <tr>
                {row[1].map((i, index) => {
                  return (
                    <td key={index} className={i}>
                      <StartGame
                        location={tile}
                        callback={(data) => setTile(data)}
                        red={red}
                        green={green}
                        updateRed={(data) => setRed(data)}
                        updateGreen={(data) => setGreen(data)}
                        undo={(data) => setMoves([...moves, data])}
                        turn={turn}
                        king={(data) => king(data)}
                        updateTurn={(data) => setTurn(data)}
                        data={[row[0], i, 8 * row[0] + (index + 1)]}
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
        <input
          className="button"
          type="button"
          value="New Game"
          onClick={() => window.location.reload()}
        />
        <input className="button" type="button" value="Undo" onClick={undo} />
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
