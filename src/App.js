import { useState,useEffect } from "react";
import "./App.css";

function App() {
  const [matrixSize, setMatrixSize] = useState("");
  const [boxArr, setBoxArr] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isNextPlayer, setIsNextPlayer] = useState(true);
  const [winnerSquares, setWinnerSquares] = useState([]);
  const [status, setStatus] = useState("Current player: X");

  const handleClick = (num) => {
    if (boxArr[num] || calculateWinner(boxArr, Number(matrixSize))) {
      return true;
    }
    const copyArray = boxArr.slice();
    isNextPlayer ? (copyArray[num] = "X") : (copyArray[num] = "O");
    setBoxArr(copyArray);
    setIsNextPlayer(!isNextPlayer);
  };
  const handlePlay = () => {
    setMatrixSize("");
    setFlag(!flag);
    setWinnerSquares([]);
    setBoxArr([]);
  };
  const handleMatrixSize = (event)=>{
    setMatrixSize(event.target.value);
  }
  const submitMatrixSize = ()=>{
    if(!matrixSize || matrixSize<3 || matrixSize>10){
      alert("Please enter correct matrix size.");
      return false;
    }
    setFlag(!flag);
    setBoxArr(Array(Number(matrixSize) * Number(matrixSize)).fill(null))
  }
  useEffect(() => {
    const winner = calculateWinner(boxArr, Number(matrixSize));
    if (winner) {
      setStatus("Winner: " + winner[0] + " Player");
      setWinnerSquares(winner[1]);
    } else {
      setStatus("Current player: " + (isNextPlayer ? "X" : "O"));
    }
  }, [boxArr, isNextPlayer, matrixSize]);
  return (
    <div>
      <h1 className="text-center">Tic Tac Toe</h1>
      {!flag && (
        <div className="input-container">
          <input
            placeholder="Enter your matrix size"
            className="input"
            maxLength={2}
            value={matrixSize}
            onChange={(event)=>handleMatrixSize(event)}
          ></input>
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={submitMatrixSize}
          >
            Play
          </button>
        </div>
      )}
      {flag && (
        <div>
          <div className="status text-center">{status}</div>
          <div className="box-container">
            <div className="box-row">
              {boxArr.map((value, index) => (
                <Square
                  key={index}
                  value={value}
                  handleClick={() => handleClick(index)}
                  matrixSize={matrixSize}
                  isWinner={winnerSquares.includes(index)}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary mt-5"
              onClick={handlePlay}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Square(props) {
  return (
    <button className={`button square ${props.isWinner ? "winner" : ""}`} onClick={props.handleClick} style={{flex:`1 0 calc(100% /${props.matrixSize} - 10px)`}}>
      {props.value}
    </button>
  );
}
function calculateWinner(squares, size) {
  const lines = [];

  // Generate rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  console.log("rows", lines);

  // Generate columns
  for (let i = 0; i < size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(j * size + i);
    }
    lines.push(column);
  }
  console.log("cols", lines);
  // Generate diagonal (top-left to bottom-right)
  const diagonal1 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push(i * size + i);
  }
  lines.push(diagonal1);
  console.log("diagonal1", lines);
  // Generate diagonal (top-right to bottom-left)
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal2.push(i * size + (size - 1 - i));
  }
  lines.push(diagonal2);
  console.log("diagonal2", lines);
  // Check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [first, ...rest] = lines[i];
    if (
      squares[first] &&
      rest.every((index) => squares[index] === squares[first])
    ) {
      return [squares[first],lines[i]];
    }
  }

  return null;
}

export default App;
