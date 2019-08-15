export interface Pokemon {
  id: number;
  pokeIndex: number;
  name: string;
  images?: string[];
  image?: string;
  sprites?: {[key: string]: string};
  weight?: number;
  types?: {type: {name: string}}[];
  abilities?: {ability: {name: string}}[];
  stats?: {base_stat: number, stat: {name: string}}[];
}
