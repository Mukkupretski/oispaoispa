import { ReactElement } from "react";
import Firebase from "./Firebase/Firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Firestore from "./Firebase/Firestore";
import Storage from "./Firebase/Storage";
import MainPage from "./MainPage";
import Game from "./Game/Game";
import GameBrowser from "./Game/GameBrowser";
import Editor from "./Editor/Editor";
import "./Game/Styles/generalstyle.css";

export default function App(): ReactElement {
  return (
    <>
      <BrowserRouter>
        <Firebase>
          <Firestore>
            <Storage>
              <Routes>
                <Route path="/" element={<MainPage></MainPage>}></Route>
                <Route path="/pelaa/*" element={<Game></Game>}></Route>
                <Route
                  path="/pelaa"
                  element={<GameBrowser></GameBrowser>}
                ></Route>
                <Route path="/luo" element={<Editor></Editor>}></Route>
              </Routes>
            </Storage>
          </Firestore>
        </Firebase>
      </BrowserRouter>
    </>
  );
}
