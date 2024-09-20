import { ReactElement } from "react";
import "./Styles/gamestyle.css";
import Board from "./Board/Board";

export default function Game(): ReactElement {
  const game: Game = {
    id: "1",
    maxPower: 10,
    tiles: [
      { text: "2", color: "red" },
      { text: "skill issue", color: "yellow" },
      { text: "8", color: "green" },
      { text: "16", color: "red" },
    ],
    bkgImage: "",
  };
  return (
    <div id="game">
      <Board game={game}></Board>
    </div>
  );
}
