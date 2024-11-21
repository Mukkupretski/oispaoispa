import { ReactElement, useRef } from "react";
import { useSettings } from "../Contexts/SettingsContext";
import { useSetGame } from "../Contexts/GameContext";

export default function Box({
  data,
  game,
}: {
  data: GameTile;
  game: Game;
}): ReactElement {
  const textEl = useRef<HTMLLabelElement>(null);
  const settings = useSettings();
  const setGame = useSetGame();

  return (
    <div
      className={`tile ${settings.animationSpeed > 0 ? "ANIMATED " : " "}${
        data.status
      }`}
      onAnimationEnd={(e) => {
        switch (e.animationName) {
          case "NEW":
            setGame({
              type: "CHANGETILE",
              id: data.id,
              newType: "NONE",
              game: game,
            });
            break;
          case "MERGING":
            setGame({
              type: "REMOVESELF",
              id: data.id,
              game: game,
            });
            break;
          case "MERGED":
            setGame({
              type: "INCREMENTORDER",
              id: data.id,
              game: game,
            });
            break;
        }
      }}
      style={{
        animationDuration: `${settings.animationSpeed}s`,
        transitionDuration: `${settings.animationSpeed / 2}s`,
        top: `${10 + data.y * 110}px`,
        left: `${10 + data.x * 110}px`,
      }}
    >
      {data.icon ? (
        <img
          alt={`Game tile ${data.order} at ${data.x}, ${data.y}`}
          src={data.icon}
        ></img>
      ) : (
        <div
          style={{
            backgroundColor: data.color,
            color: data.textColor,
            fontSize: data.fontSize,
          }}
        >
          <label ref={textEl}>{data.text}</label>
        </div>
      )}
    </div>
  );
}
