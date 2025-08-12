import { ReactElement, useEffect } from "react";
import Firebase from "./Firebase/Firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Firestore from "./Firebase/Firestore";
import Storage from "./Firebase/Storage";
import MainPage from "./MainPage";
import Game from "./Game/Game";
import GameBrowser from "./Game/GameBrowser";
import { NewEditor, EditEditor } from "./Editor/Editor";
import "./Game/Styles/generalstyle.css";
import { useSetSettings, useSettings } from "./Game/Contexts/SettingsContext";
import NotFound from "./Components/NotFound";
import "./Game/Styles/appstyle.css";

export default function App(): ReactElement {
  const settings = useSettings();
  const setSettings = useSetSettings();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);
  return (
    <>
      <BrowserRouter>
        <Firebase>
          <Firestore>
            <Storage>
              <div id="appcontainer">
                <input
                  aria-label="theme"
                  type="checkbox"
                  value={settings.theme}
                  onChange={(e) => {
                    setSettings((s) => {
                      return {
                        ...s,
                        theme: e.target.checked ? "LIGHT" : "DARK",
                      };
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
                        animationSpeed:
                          (e.target.value as unknown as number) / 10,
                      };
                    });
                  }}
                ></input>
                <Routes>
                  <Route path="/" element={<MainPage></MainPage>}></Route>
                  <Route path="/pelaa/*" element={<Game></Game>}></Route>
                  <Route
                    path="/pelaa"
                    element={<GameBrowser></GameBrowser>}
                  ></Route>
                  <Route
                    path="/luo/*"
                    element={<EditEditor></EditEditor>}
                  ></Route>
                  <Route path="/luo" element={<NewEditor></NewEditor>}></Route>
                  <Route
                    path="*"
                    element={<NotFound width={0}></NotFound>}
                  ></Route>
                </Routes>
              </div>
            </Storage>
          </Firestore>
        </Firebase>
      </BrowserRouter>
    </>
  );
}
