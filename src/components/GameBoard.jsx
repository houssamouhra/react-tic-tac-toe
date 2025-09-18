export default function GameBoard({ onSelectCell, board }) {
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
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
