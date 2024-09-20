import { ReactElement, useEffect, useState } from "react";
import { useGame, useSetGame } from "./GameContext";

export default function Board({ game }: { game: Game }): ReactElement {
  const currentGame = useGame();
  const gameReducer = useSetGame();
  useEffect(() => {
    gameReducer({ type: "RESTART", game: game });
  }, []);
  return <div id="board"></div>;
}
