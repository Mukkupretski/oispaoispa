import React, {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactElement,
} from "react";

const SettingsContext = React.createContext<
  [Settings, Dispatch<SetStateAction<Settings>>] | null
>(null);

export function SettingsContextProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [settings, setSettings] = useState<Settings>({
    theme: "DARK",
    animationSpeed: 0.2,
  });

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext)![0];
}
export function useSetSettings() {
  return useContext(SettingsContext)![1];
}
