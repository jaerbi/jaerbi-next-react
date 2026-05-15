export interface Game {
  id: number;
  title: string;
  genre: string;
  isFavorite: boolean;
  image: string;
}

export const INITIAL_GAMES: Game[] = [
  { id: 1, title: 'Civilization VII', genre: 'Strategy', isFavorite: true, image: '/img/civ7.jpg' },
  { id: 2, title: 'Factorio', genre: 'Sandbox', isFavorite: false, image: '/img/factorio.jpg' },
  { id: 3, title: 'Stalker 2', genre: 'Action', isFavorite: false, image: '/img/STALKER-2.jpg' },
  { id: 4, title: 'Chess', genre: 'Board Game', isFavorite: false, image: '/img/chess.jpg' },
  { id: 5, title: 'Subnautica 2', genre: 'Adventures', isFavorite: false, image: '/img/subnautica2.jpg' },
];
