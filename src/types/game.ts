export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
};

export type GameDetails = Game & {
  minimum_system_requirements?: {
    memory?: string;
  };
  game_url: string;
};