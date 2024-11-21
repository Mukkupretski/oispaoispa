import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SettingsContextProvider } from "./Game/Contexts/SettingsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </>
  </StrictMode>
);
