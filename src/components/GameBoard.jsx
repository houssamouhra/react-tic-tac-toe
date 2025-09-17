const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectCell, turns }) {
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { cell, player } = turn;
    const { row, col } = cell;

    gameBoard[row][col] = player;
  }
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectCells(rowIndex, cellIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map((innerArr) => [...innerArr])];
  //     updatedBoard[rowIndex][cellIndex] = activePlayerSymbole;
  //     return updatedBoard;
  //   });

  //   onSelectCell();
  // }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbole, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => onSelectCell(rowIndex, cellIndex)}
                  disabled={playerSymbole !== null}
                >
                  {playerSymbole}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
