import { ReactElement } from "react";
import "./Styles/gamestyle.css";
import Board from "./Board/Board";
import { GameContextProvider } from "./Contexts/GameContext";

export default function Game(): ReactElement {
  const game: Game = {
    endless: false,
    author: "Me",
    name: "d",
    id: "1",
    tiles: [
      {
        text: "SKILL ISSUE",
        color: "yellow",
        order: 0,
        textColor: "black",
        fontSize: 32,
      },
      { icon: "/NewImage-1.png", order: 1 },
      { text: "2", color: "red", order: 2, textColor: "white", fontSize: 55 },

      { text: "8", color: "green", order: 3, textColor: "white", fontSize: 55 },
      { text: "16", color: "red", order: 4, textColor: "white", fontSize: 55 },
    ],
    bkgImage: "",
    gameTheme: undefined,
  };
  return (
    <div id="game">
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <GameContextProvider>
        <Board game={game}></Board>
      </GameContextProvider>
    </div>
  );
}
