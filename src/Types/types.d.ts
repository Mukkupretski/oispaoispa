interface Tile {
  icon?: string;
  imageData?: ImageContent;
  text?: string;
  color?: string;
  fontSize?: number;
  textColor?: string;
  imageTile?: boolean;
  id?: string;
  order: number;
}
type ImageContent = {
  file?: Blob;
  image?: string;
};

type Settings = {
  theme: "LIGHT" | "DARK";
  lastClick?: number;
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
  tiles: Tile[];
  author: string;
  name: string;
  bkgImage?: string;
  endless: boolean;
  gameTheme?: "DARK" | "LIGHT";
};
type CurrentGame = GameTile[];
