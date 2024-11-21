import React, {
  useContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useReducer,
} from "react";
import { v4 as uuid } from "uuid";

type Actions = {
  type:
    | "RESTART"
    | "CLEAR"
    | "MAKEMOVE"
    | "ASPIRIN"
    | "CHANGETILE"
    | "REMOVESELF"
    | "INCREMENTORDER";
  game: Game;
  id?: string;
  newType?: "NEW" | "MERGED" | "MERGING" | "NONE";
  direction?: "UP" | "DOWN" | "LEFT" | "RIGHT";
  noAnimation?: boolean;
};

const rotateTimes = {
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3,
};

const GameContext = React.createContext<
  [CurrentGame, Dispatch<Actions>] | null
>(null);

//Rotates 90 degrees clockwise
function rotate(state: CurrentGame, times: number): CurrentGame {
  for (let i = 0; i < times; i++) {
    state = state.map((box) => {
      return { ...box, x: 3 - box.y, y: box.x };
    });
  }
  return [...state];
}

function merge(state: CurrentGame, action: Actions): CurrentGame {
  state = rotate(state, rotateTimes[action.direction!]);
  const cloneState = [...state];
  cloneState.sort((a, b) => {
    //Lower y goes first
    return a.y - b.y;
  });
  for (let i = 0; i < state.length; i++) {
    const box = cloneState[i];

    //FIXME: box ei spawnaa aina (eka siirto) (tarkista spawnBox())
    //FIXME: double merge in a column/row incorrect
    if (state.find((b) => b.id === box.id)?.status == "MERGING") {
      continue;
    }
    const toMerge = state.find(
      (box2) =>
        box2.y === box.y + 1 && box.x == box2.x && box.order === box2.order
    );

    if (toMerge) {
      if (action.noAnimation) {
        state = state.filter((b) => b.id !== toMerge.id);
        state = state.map((b) => {
          if (b.id === box.id) {
            return {
              ...action.game.tiles[box.order + 1],
              x: box.x,
              y: box.y,
              id: box.id,
              status: "MERGED",
            };
          }
          return b;
        });
      } else {
        state = state.map((b) => {
          if (b.id === box.id) {
            return {
              ...box,
              status: "MERGED",
            };
          } else if (b.id === toMerge.id) {
            return {
              ...toMerge,
              status: "MERGING",
              y: box.y,
            };
          }
          return b;
        });
      }
    }
  }

  state = rotate(state, 4 - rotateTimes[action.direction!]);

  return state;
}

function compress(state: CurrentGame, action: Actions): CurrentGame {
  state = rotate(state, rotateTimes[action.direction!]);
  const cloneState = [...state];
  cloneState.sort((a, b) => {
    return a.y - b.y;
  });
  const tops = [-1, -1, -1, -1];
  cloneState.forEach((box) => {
    if (
      !action.noAnimation &&
      (box.status === "MERGING" || box.status === "MERGED")
    ) {
      if (tops[box.x] < box.y - 1) {
        tops[box.x] = box.y - 1;
        state = state.map((b) => {
          if (b.x != box.x || b.y != box.y) {
            return b;
          }
          return { ...b, y: b.y - 1 };
        });
        return;
      }

      tops[box.x] = box.y;
      return;
    }
    let coord = box.y;
    while (0 < coord) {
      if (tops[box.x] == --coord) {
        coord++;
        break;
      }
    }
    tops[box.x] = coord;
    state[state.findIndex((el) => el.id === box.id)] = {
      ...box,
      x: box.x,
      y: coord,
    };
  });
  state = rotate(state, 4 - rotateTimes[action.direction!]);
  return state;
}

function isValidAction(state: CurrentGame, action: Actions): boolean {
  const cloneState = rotate(state, rotateTimes[action.direction!]);
  for (let i = 0; i < 4; i++) {
    const colNums = cloneState.filter((box) => box.x === i);
    colNums.sort((a, b) => a.y - b.y);
    const len = colNums.length;
    if (len != 0 && colNums[len - 1].y >= len) {
      return true;
    }
    for (let j = 1; j < len; j++) {
      if (colNums[j].order === colNums[j - 1].order) {
        return true;
      }
    }
  }
  return false;
}

export function isGameLost(state: CurrentGame): boolean {
  if (state.length < 16) {
    return false;
  }
  const cloneState = state.sort((a, b) => {
    if (a.y - b.y != 0) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        i > 0 &&
        cloneState[i * 4 + j].order == cloneState[i * 4 + j - 4].order
      ) {
        return false;
      }
      if (
        j > 0 &&
        cloneState[i * 4 + j].order == cloneState[i * 4 + j - 1].order
      ) {
        return false;
      }
    }
  }
  return true;
}

function spawnBox(state: CurrentGame, action: Actions): CurrentGame {
  state = rotate(state, rotateTimes[action.direction!]);
  const candidates: number[] = [];
  for (let i = 0; i < 4; i++) {
    if (!state.find((box) => box.y === 3 && box.x === i)) {
      candidates.push(i);
    }
  }
  const newBox: GameTile = {
    ...(Math.random() < 0.75 ? action.game.tiles[0] : action.game.tiles[1]),
    id: uuid(),
    y: 3,
    x: candidates[Math.floor(Math.random() * candidates.length)],
    status: "NEW",
  };
  return rotate([...state, newBox], 4 - rotateTimes[action.direction!]);
}

function gameReducer(state: CurrentGame, action: Actions): CurrentGame {
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
      const order1 = Math.random() < 0.75 ? 0 : 1;
      const order2 = Math.random() < 0.75 ? 0 : 1;

      return [
        {
          ...action.game.tiles[order1],
          status: "NEW",
          x: i1,
          y: j1,
          id: uuid(),
        },
        {
          ...action.game.tiles[order2],
          status: "NEW",
          x: i2,
          y: j2,
          id: uuid(),
        },
      ];
    case "CLEAR":
      return [];
    case "MAKEMOVE":
      if (!isValidAction(state, action)) {
        return state;
      }
      // console.log(state);
      // state = compress(state, action);
      // state = merge(state, action);
      // state = compress(state, action);
      // console.log("ddd");
      return spawnBox(
        compress(merge(compress([...state], action), action), action),
        action
      );

    case "CHANGETILE":
      state = state.map((tl) => {
        if (tl.id !== action.id) {
          return tl;
        }
        return {
          ...tl,
          status: action.newType,
        };
      });
      break;
    case "REMOVESELF":
      state = state.filter((tl) => tl.id !== action.id);
      break;
    case "INCREMENTORDER":
      state = state.map((b) => {
        if (b.id !== action.id) {
          return b;
        }
        return {
          ...action.game.tiles[b.order + 1],
          x: b.x,
          y: b.y,
          id: b.id,
        };
      });
      break;
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
