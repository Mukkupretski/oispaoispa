import { ReactElement, useEffect } from "react";
import { useGame, useSetGame } from "../Contexts/GameContext";
import Box from "./Box";
import { useSetSettings, useSettings } from "../Contexts/SettingsContext";

const dummyArray = Array.apply(null, Array(16));

const directions = new Map<string, "LEFT" | "RIGHT" | "DOWN" | "UP">([
  ["s", "DOWN"],
  ["ArrowDown", "DOWN"],
  ["a", "LEFT"],
  ["ArrowLeft", "LEFT"],
  ["ArrowRight", "RIGHT"],
  ["d", "RIGHT"],
  ["w", "UP"],
  ["ArrowUp", "UP"],
]);

export default function Board({ game }: { game: Game }): ReactElement {
  const currentGame = useGame();
  const gameReducer = useSetGame();
  const settings = useSettings();
  const setSettings = useSetSettings();
  console.log(currentGame);

  const handleKeyDown = (e: KeyboardEvent) => {
    const direction: "DOWN" | "RIGHT" | "LEFT" | "UP" | undefined =
      directions.get(e.key);

    if (
      direction &&
      (!settings.lastClick ||
        Date.now() - settings.lastClick >= settings.animationSpeed * 1000)
    ) {
      setSettings((s) => {
        return { ...s, lastClick: Date.now() };
      });
      gameReducer({
        type: "MAKEMOVE",
        game: game,
        direction: direction,
        noAnimation: settings.animationSpeed === 0,
      });
    }
  };
  useEffect(() => {
    gameReducer({ type: "RESTART", game: game });
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div id="board">
      {dummyArray.map((_d, i) => {
        return <div key={i} className="empty"></div>;
      })}
      {currentGame.map((cell) => {
        return <Box key={cell.id} game={game} data={cell}></Box>;
      })}
    </div>
  );
}
