import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useId,
  useRef,
  useState,
} from "react";
import "../Styles/editorstyles.css";
import { useSettings } from "../../Game/Contexts/SettingsContext";
import { numRegex } from "../Editor";
import Input from "./Input";
import ColorPicker from "./ColorPicker";

export default function Tilemaker({
  data,
  setNewGame,
}: {
  data: Tile;
  setNewGame: Dispatch<SetStateAction<Game>>;
}): ReactElement {
  const id = useId();
  const settings = useSettings();
  const imgPath = `/img/${settings.theme === "DARK" ? "Dark" : "Light"}`;
  const fileInput = useRef<HTMLInputElement>(null);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const onChange = () => {
    console.log("d");
    const files = fileInput.current!.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setNewGame((g) => {
      return {
        ...g,
        tiles: g.tiles.map((t) => {
          if (t.id !== data.id) {
            return t;
          }
          return {
            ...t,
            imageData: {
              file: file,
            },
          };
        }),
      };
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewGame((g) => {
        return {
          ...g,
          tiles: g.tiles.map((t) => {
            if (t.id !== data.id) {
              return t;
            }
            return {
              ...t,
              imageData: {
                image: e.target!.result as string,
              },
            };
          }),
        };
      });
    };
    reader.readAsDataURL(file);
    fileInput.current!.value = "";
  };
  return (
    <div
      style={{
        backgroundColor: mouseOver ? "var(--med-color)" : "var(--dark-color)",
      }}
      className="tilemaker"
      onDrop={(e) => {
        setMouseOver(false);
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.startsWith("image")) {
            const dT = new DataTransfer();
            dT.items.add(files[i]);
            fileInput.current!.files = dT.files;
            break;
          }
        }
        onChange();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        setMouseOver(true);
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        setMouseOver(true);
        e.preventDefault();
      }}
      onDragExit={(e) => {
        setMouseOver(false);
        e.preventDefault();
      }}
      onDragEnd={(e) => {
        setMouseOver(false);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setMouseOver(false);
        e.preventDefault();
      }}
    >
      <div
        className="toggler"
        onClick={() => {
          setNewGame((g) => {
            return {
              ...g,
              tiles: g.tiles.map((t) => {
                if (t.id !== data.id) return t;
                return { ...t, imageTile: !t.imageTile, imageData: undefined };
              }),
            };
          });
        }}
      >
        <div
          style={{
            left: data.imageTile ? "50%" : "0px",
          }}
          className="mover"
        ></div>
        <img alt="text" src={`${imgPath}/Text.svg`}></img>
        <img alt="img" src={`${imgPath}/Image.svg`}></img>
      </div>
      {data.imageTile ? (
        <>
          {data.imageData?.image ? (
            <div className="imgContainer">
              <div
                onClick={() => {
                  setNewGame((g) => {
                    return {
                      ...g,
                      tiles: g.tiles.map((t) => {
                        if (t.id !== data.id) {
                          return t;
                        }
                        return { ...t, imageData: undefined };
                      }),
                    };
                  });
                }}
              >
                <img src={`${imgPath}/Delete.svg`} alt="sulje"></img>
              </div>
              <img
                className="tileImg"
                alt="tile"
                src={data.imageData?.image}
              ></img>
            </div>
          ) : (
            <button
              className="addImg btn"
              type="button"
              onClick={() => {
                fileInput.current!.click();
              }}
            >
              Lisää kuva
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onChange}
            aria-label="Lataa kuva"
          ></input>
        </>
      ) : (
        <>
          <div
            className="preview"
            style={{
              backgroundColor: data.color,
            }}
          >
            <label
              style={{
                color: data.textColor,
                fontSize: `${data.fontSize}px`,
              }}
            >
              {data.text}
            </label>
          </div>
          <div className="tileform">
            <Input
              label="Sisältö"
              onChange={(e) => {
                setNewGame((g) => {
                  return {
                    ...g,
                    tiles: g.tiles.map((t) => {
                      if (t.id !== data.id) return t;
                      return { ...t, text: e.target.value };
                    }),
                  };
                });
              }}
              value={data.text}
              id={`${id}txt`}
            ></Input>

            <ColorPicker
              label="Tausta"
              value={data.color}
              onChange={(e) => {
                setNewGame((g) => {
                  return {
                    ...g,
                    tiles: g.tiles.map((t) => {
                      if (t.id !== data.id) return t;
                      return { ...t, color: e.target.value };
                    }),
                  };
                });
              }}
              id={`${id}c1`}
            ></ColorPicker>

            <ColorPicker
              label="Väri"
              value={data.textColor}
              onChange={(e) => {
                setNewGame((g) => {
                  return {
                    ...g,
                    tiles: g.tiles.map((t) => {
                      if (t.id !== data.id) return t;
                      return { ...t, textColor: e.target.value };
                    }),
                  };
                });
              }}
              id={`${id}c2`}
            ></ColorPicker>

            <Input
              label="Koko"
              onChange={(e) => {
                setNewGame((g) => {
                  return {
                    ...g,
                    tiles: g.tiles.map((t) => {
                      if (t.id !== data.id) return t;
                      return {
                        ...t,
                        fontSize: parseInt(
                          e.target.value.replace(numRegex, "") || "16"
                        ),
                      };
                    }),
                  };
                });
              }}
              value={data.fontSize}
              id={`${id}px`}
            ></Input>
          </div>
        </>
      )}
    </div>
  );
}
