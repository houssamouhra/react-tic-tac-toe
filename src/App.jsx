import { useState } from "react";
import Header from "@/components/Header";
import Player from "@/components/Player";
import GameBoard from "@/components/GameBoard";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectCell(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { cell: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <>
      <Header />
      <main>
        <div id='game-container'>
          <ol id='players' className='highlight-player'>
            <Player
              initName='Player 1'
              symbole='X'
              isActive={activePlayer === "X"}
            />
            <Player
              initName='Player 2'
              symbole='O'
              isActive={activePlayer === "O"}
            />
          </ol>
          <GameBoard onSelectCell={handleSelectCell} turns={gameTurns} />
        </div>
      </main>
    </>
  );
}

export default App;
