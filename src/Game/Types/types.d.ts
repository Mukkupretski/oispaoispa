interface Tile {
  icon?: string;
  text?: string;
  color?: string;
}

interface GameTile extends Tile {
  status?: "NEW" | "MERGED";
}

type Game = {
  id: string;
  clear?: {
    text: string;
    icon: string;
    message: string;
  };
  maxPower: number;
  tiles: tile[];
  bkgImage: string;
};
type CurrentGame = (GameTile | undefined)[][];
