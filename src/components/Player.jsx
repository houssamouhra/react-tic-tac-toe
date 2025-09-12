import { useState } from "react";

export default function Player({ initName, symbole, isActive }) {
  const [playerName, setPlayerName] = useState(initName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((prev) => !prev);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editPlayerName = <span className='player-name'>{playerName}</span>;
  if (isEditing) {
    editPlayerName = (
      <input type='text' required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className='player'>
        {editPlayerName}
        <span className='player-symbol'>{symbole}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
