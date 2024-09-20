import React, {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactElement,
  ReactNode,
  useReducer,
} from "react";

type Actions = { type: "MERGE" | "COMPRESS" | "RESTART" | "CLEAR"; game: Game };

const GameContext = React.createContext<
  [CurrentGame, Dispatch<Actions>] | null
>(null);

function gameReducer(state: CurrentGame, action: Actions) {
  switch (action.type) {
    case "RESTART":
      const i1: number = Math.floor(Math.random() * 4);
      const j1: number = Math.floor(Math.random() * 4);
      var i2: number | undefined = undefined;
      var j2: number | undefined = undefined;
      while (!i2 || !j2 || (i1 == i2 && j1 == j2)) {
        i2 = Math.floor(Math.random() * 4);
        j2 = Math.floor(Math.random() * 4);
      }
      const newState: CurrentGame = Array(4).fill(Array(4).fill(undefined));
      newState[i1][j1] =
        Math.random() > 0.75
          ? { ...action.game.tiles[1], status: "NEW" }
          : { ...action.game.tiles[0], status: "NEW" };
      newState[i2][j2] =
        Math.random() > 0.75
          ? { ...action.game.tiles[1], status: "NEW" }
          : { ...action.game.tiles[0], status: "NEW" };
      return newState;
  }
  return state;
}

export function GameContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [game, dispatch] = useReducer(gameReducer, []);

  return (
    <GameContext.Provider value={[game, dispatch]}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext)![0];
}
export function useSetGame() {
  return useContext(GameContext)![1];
}
