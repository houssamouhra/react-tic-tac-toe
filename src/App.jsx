import { useState } from "react";
import Header from "@/components/Header";
import Player from "@/components/Player";
import GameBoard from "@/components/GameBoard";
import Log from "@/components/Log";
import GameOver from "@/components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { cell, player } = turn;
    const { row, col } = cell;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstCellSymbole =
      gameBoard[combination[0].row][combination[0].column];
    const secondCellSymbole =
      gameBoard[combination[1].row][combination[1].column];
    const thirdCellSymbole =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstCellSymbole &&
      firstCellSymbole === secondCellSymbole &&
      firstCellSymbole === thirdCellSymbole
    ) {
      winner = players[firstCellSymbole];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const [] = useState();
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectCell(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { cell: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbole, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbole]: newName,
      };
    });
  }

  return (
    <>
      <Header />
      <main>
        <div id='game-container'>
          <ol id='players' className='highlight-player'>
            <Player
              initName={PLAYERS.X}
              symbole='X'
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initName={PLAYERS.O}
              symbole='O'
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
          <GameBoard onSelectCell={handleSelectCell} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
