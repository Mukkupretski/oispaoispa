import { ReactElement } from "react";
import "./Styles/gamestyle.css";
import Board from "./Board/Board";
import { GameContextProvider } from "./Contexts/GameContext";
import { useSetSettings, useSettings } from "./Contexts/SettingsContext";

export default function Game(): ReactElement {
  const setSettings = useSetSettings();
  const settings = useSettings();
  const game: Game = {
    id: "1",
    maxPower: 10,
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
      <input
        aria-label="theme"
        type="checkbox"
        value={settings.theme}
        onChange={(e) => {
          setSettings((s) => {
            return { ...s, theme: e.target.checked ? "LIGHT" : "DARK" };
          });
        }}
      ></input>
      <input
        aria-label="skill issue"
        type="range"
        min={0}
        max={100}
        value={settings.animationSpeed * 10}
        onChange={(e) => {
          setSettings((s) => {
            return {
              ...s,
              animationSpeed: (e.target.value as unknown as number) / 10,
            };
          });
        }}
      ></input>
      <GameContextProvider>
        <Board game={game}></Board>
      </GameContextProvider>
    </div>
  );
}
