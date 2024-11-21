interface Tile {
  icon?: string;
  text?: string;
  color?: string;
  fontSize?: number;
  textColor?: string;
  order: number;
}

type Settings = {
  theme: "LIGHT" | "DARK";
  lastClick: number | undefined;
  animationSpeed: number;
};

interface GameTile extends Tile {
  status?: "NEW" | "MERGED" | "MERGING" | "NONE";
  id: string;
  x: number;
  y: number;
}

type Game = {
  id: string;
  clear?: {
    text: string;
    icon: string;
    message: string;
  };
  maxPower: number;
  tiles: Tile[];
  bkgImage: string;
  gameTheme?: "DARK" | "LIGHT";
};
type CurrentGame = GameTile[];
