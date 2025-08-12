import { ReactElement, useId, useState } from "react";
import { v4 as uuid } from "uuid";
import Tilemaker from "./Components/Tilemaker";
import Input from "./Components/Input";
import Checkbox from "./Components/Checkbox";

export const numRegex = /[^0-9]/;

export function EditEditor(): ReactElement {
  return <></>;
}
export function NewEditor(): ReactElement {
  return (
    <Editor
      game={{
        id: uuid(),
        tiles: [],
        author: "",
        name: "",
        endless: false,
      }}
    ></Editor>
  );
}

function Editor({ game }: { game: Game }): ReactElement {
  const [newGame, setNewGame] = useState<Game>(game);
  const [addCount, setAddCount] = useState<string>("0");
  const [forceTheme, setForceTheme] = useState<boolean>(false);
  const [aspirin, setAspirin] = useState<boolean>(false);
  const id = useId();
  return (
    <div id="editor">
      <h2 className="title">Luo peli</h2>
      <hr></hr>
      <h3 className="title-2">Yleiset</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 200px",
          rowGap: "25px",
          columnGap: "20px",
          marginBottom: "60px",
        }}
      >
        <div className="inputcontainer">
          <label
            style={{
              marginBottom: "5px",
            }}
            className="text-1"
            htmlFor={`${id}nimi`}
          >
            Nimi
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              color: "var(--light-color)",
              gap: "2px",
            }}
          >
            <p
              style={{
                position: "relative",
                top: "-1px",
              }}
            >
              Oispa
            </p>
            <input
              className="editorinput2"
              type="text"
              id={`${id}nimi`}
            ></input>
          </div>
        </div>
        <Input style2 label="Tekijä" id={`${id}tekijä`}></Input>
        <Checkbox label="Päättyvä" id={`${id}canWin`}></Checkbox>
        <Checkbox
          label="Pakota teema"
          value={forceTheme}
          onChange={(e) => {
            setForceTheme(e.target.checked);
          }}
          id={`${id}forceTheme`}
        ></Checkbox>
        <Checkbox
          label="Aspiriini"
          value={aspirin}
          onChange={(e) => {
            setAspirin(e.target.checked);
          }}
          id={`${id}aspirin`}
        ></Checkbox>
      </div>
      <hr></hr>
      <h3 className="title-2">Laatat</h3>
      <div id="tilelist">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <Input
            label="Määrä"
            id={`${id}addTiles`}
            value={addCount}
            onChange={(e) => {
              setAddCount(e.target.value.replace(numRegex, ""));
            }}
          ></Input>
          <button
            className="btn"
            type="button"
            onClick={() => {
              setNewGame((g) => {
                const newTiles: Tile[] = [...g.tiles];
                console.log();
                console.log(newTiles);
                for (let i = 0; i < parseInt(addCount); i++) {
                  newTiles.push({
                    order: g.tiles.length + i,
                    id: uuid(),
                    color: "#000000",
                    textColor: "#ffffff",
                    fontSize: 16,
                    text: "",
                    imageTile: false,
                  });
                }
                return { ...game, tiles: [...newTiles] };
              });
              setAddCount("0");
            }}
          >
            Lisää laattoja
          </button>
        </div>

        {/* Tiles */}
        {newGame.tiles.map((t) => {
          return <Tilemaker data={t} setNewGame={setNewGame}></Tilemaker>;
        })}
      </div>
    </div>
  );
}
